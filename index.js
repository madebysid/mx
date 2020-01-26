const smtp = require('smtp-server').SMTPServer
const { PrismaClient } = require('@prisma/client')

const PORT = process.env.PORT || 25;
const DEBUG = process.env.DEBUG || false;

const prisma = new PrismaClient();

const server = new smtp({
	secure: false,
	name: 'mail.dietcode.io',
	disabledCommands: ['AUTH'],
	onConnect: (session, cb) => {
		console.log('Recieved new mail')
		DEBUG && console.log('[onConnect]', session)
		return cb();
	},
	onAuth: (auth, session, cb) => {
		DEBUG && console.log('[onAuth]', auth, session)
		return cb();
	},
	onClose: (session) => {
		DEBUG && console.log('[onClose]', session)
	},
	onMailFrom: (address, session, cb) => {
		DEBUG && console.log('[onMailFrom]', address, session);
		return cb();
	},
	onRcptTo: (address, session, cb) => {
		DEBUG && console.log('[onRcptTo]', address, session)
		return cb();
	},
	onData: (stream, session, cb) => {
		let body = ''
		DEBUG && console.log('[onData]', session)
		DEBUG && console.log('[onData] [Stream start]')
		DEBUG && stream.pipe(process.stdout)
		stream.on('data', data => body += data)
		stream.on('end', async () => {
			await prisma.inboxes.create({
				data: {
					sender: session.envelope.mailFrom.address,
					recipient: session.envelope.rcptTo[0].address,
					body
				}
			}); 
			DEBUG && console.log('[onData] [Stream end]')
			return cb()
		})
	}
})

server.listen(PORT, () => {
	console.log('Server started at port', PORT)
})

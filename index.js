const smtp = require('smtp-server').SMTPServer
const { PrismaClient } = require('@prisma/client')
const winston = require('winston')

const PORT = process.env.PORT || 25;

const prisma = new PrismaClient();
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'mx' },
	transports: [
		new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
		new winston.transports.File({ filename: 'logs/combined.log' })
	]
});

if (process.env.NODE_ENV !== 'production') {
	  logger.add(
		new winston.transports.Console({
			format: winston.format.simple()
		})
	  );
}

const server = new smtp({
	secure: false,
	name: 'mail.dietcode.io',
	disabledCommands: ['AUTH'],
	onConnect: (session, cb) => {
		logger.info('Recieved new mail')
		logger.info('[onConnect]', session)
		return cb();
	},
	onAuth: (auth, session, cb) => {
		logger.info('[onAuth]', auth, session)
		return cb();
	},
	onClose: (session) => {
		logger.info('[onClose]', session)
	},
	onMailFrom: (address, session, cb) => {
		logger.info('[onMailFrom]', address, session);
		return cb();
	},
	onRcptTo: (address, session, cb) => {
		logger.info('[onRcptTo]', address, session)
		return cb();
	},
	onData: (stream, session, cb) => {
		let body = ''
		logger.info('[onData]', session)
		logger.info('[onData] [Stream start]')
		// stream.pipe(process.stdout)
		stream.on('data', data => body += data)
		stream.on('end', async () => {
			await prisma.inboxes.create({
				data: {
					sender: session.envelope.mailFrom.address,
					recipient: session.envelope.rcptTo[0].address,
					body
				}
			}); 
			logger.info('[onData] [Stream end]')
			return cb()
		})
	}
})

server.listen(PORT, () => {
	logger.info(`Server started at port ${PORT}`)
})

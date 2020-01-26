# Migration `20200126173054-initial`

This migration has been generated at 1/26/2020, 5:30:54 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "quaint"."Inbox" (
    "id" TEXT NOT NULL  ,
    PRIMARY KEY ("id")
) 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200126173054-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,18 @@
+datasource db {
+  provider = "sqlite" 
+  url      = "sqlite:./mail.db"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Inbox {
+	id String @id
+}
+
+// Next steps:
+// 1. Add your DB connection string as the `url` of the `datasource` block
+// 2. Run `prisma2 introspect` to get your data model into the schema (this will override this file and delete all comments!)
+// 3. Run `prisma2 generate` to generate Prisma Client JS
+// 4. Start using Prisma Client JS in your application
```



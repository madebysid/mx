# Migration `20200126173820-inbox-model`

This migration has been generated at 1/26/2020, 5:38:20 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_Inbox" (
    "body" TEXT NOT NULL DEFAULT '' ,
    "id" TEXT NOT NULL  ,
    "recipient" TEXT NOT NULL DEFAULT '' ,
    "sender" TEXT NOT NULL DEFAULT '' ,
    PRIMARY KEY ("id")
) 

INSERT INTO "quaint"."new_Inbox" ("id") SELECT "id" FROM "quaint"."Inbox"

DROP TABLE "quaint"."Inbox";

ALTER TABLE "quaint"."new_Inbox" RENAME TO "Inbox";

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200126173054-initial..20200126173820-inbox-model
--- datamodel.dml
+++ datamodel.dml
@@ -1,18 +1,16 @@
 datasource db {
   provider = "sqlite" 
-  url = "***"
+  url      = "file:./mail.db"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Inbox {
-	id String @id
+	id         String  @id
+	sender     String
+	recipient  String
+	body       String
 }
-// Next steps:
-// 1. Add your DB connection string as the `url` of the `datasource` block
-// 2. Run `prisma2 introspect` to get your data model into the schema (this will override this file and delete all comments!)
-// 3. Run `prisma2 generate` to generate Prisma Client JS
-// 4. Start using Prisma Client JS in your application
```



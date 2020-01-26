# Migration `20200126175113-default-ids`

This migration has been generated at 1/26/2020, 5:51:13 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200126173820-inbox-model..20200126175113-default-ids
--- datamodel.dml
+++ datamodel.dml
@@ -1,15 +1,15 @@
 datasource db {
   provider = "sqlite" 
-  url = "***"
+  url      = "file:./mail.db"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Inbox {
-	id         String  @id
+	id         String  @id  @default(uuid())
 	sender     String
 	recipient  String
 	body       String
 }
```



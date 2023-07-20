/*
  Warnings:

  - You are about to drop the column `ip` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "code" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "country" TEXT,
    "banned" DATETIME
);
INSERT INTO "new_User" ("banned", "code", "country", "email", "emailVerified", "id", "image", "name", "role") SELECT "banned", "code", "country", "email", "emailVerified", "id", "image", "name", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_email_role_idx" ON "User"("email", "role");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

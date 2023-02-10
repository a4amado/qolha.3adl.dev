/*
  Warnings:

  - You are about to drop the column `en` on the `Word` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Word" (
    "id" TEXT NOT NULL,
    "ar" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Word_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Word" ("ar", "id", "userId") SELECT "ar", "id", "userId" FROM "Word";
DROP TABLE "Word";
ALTER TABLE "new_Word" RENAME TO "Word";
CREATE UNIQUE INDEX "Word_id_key" ON "Word"("id");
CREATE UNIQUE INDEX "Word_ar_key" ON "Word"("ar");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

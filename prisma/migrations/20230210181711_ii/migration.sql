/*
  Warnings:

  - Added the required column `path` to the `Clip` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clip" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "wordID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    CONSTRAINT "Clip_wordID_fkey" FOREIGN KEY ("wordID") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Clip_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Clip" ("id", "userID", "wordID") SELECT "id", "userID", "wordID" FROM "Clip";
DROP TABLE "Clip";
ALTER TABLE "new_Clip" RENAME TO "Clip";
CREATE UNIQUE INDEX "Clip_id_key" ON "Clip"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

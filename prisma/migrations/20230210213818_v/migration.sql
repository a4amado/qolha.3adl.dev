-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Word" (
    "id" TEXT NOT NULL,
    "ar" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Word_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Word" ("ar", "id", "userId") SELECT "ar", "id", "userId" FROM "Word";
DROP TABLE "Word";
ALTER TABLE "new_Word" RENAME TO "Word";
CREATE UNIQUE INDEX "Word_id_key" ON "Word"("id");
CREATE UNIQUE INDEX "Word_ar_key" ON "Word"("ar");
CREATE TABLE "new_Clip" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "wordID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    CONSTRAINT "Clip_wordID_fkey" FOREIGN KEY ("wordID") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Clip_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Clip" ("id", "path", "userID", "wordID") SELECT "id", "path", "userID", "wordID" FROM "Clip";
DROP TABLE "Clip";
ALTER TABLE "new_Clip" RENAME TO "Clip";
CREATE UNIQUE INDEX "Clip_id_key" ON "Clip"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

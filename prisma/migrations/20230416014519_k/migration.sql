-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "code" TEXT,
    "role" TEXT NOT NULL DEFAULT 'none'
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    CONSTRAINT "Account_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Word" (
    "ar" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT true,
    "skipped" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Clip" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "rejected" BOOLEAN NOT NULL DEFAULT false,
    "wordID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    CONSTRAINT "Clip_wordID_fkey" FOREIGN KEY ("wordID") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Clip_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rate" (
    "id" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "clipID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    CONSTRAINT "Rate_clipID_fkey" FOREIGN KEY ("clipID") REFERENCES "Clip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rate_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WordReport" (
    "id" TEXT NOT NULL,
    "wordID" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    CONSTRAINT "WordReport_wordID_fkey" FOREIGN KEY ("wordID") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClipReport" (
    "id" TEXT NOT NULL,
    "clipID" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    CONSTRAINT "ClipReport_clipID_fkey" FOREIGN KEY ("clipID") REFERENCES "Clip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userID_key" ON "Account"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Word_ar_key" ON "Word"("ar");

-- CreateIndex
CREATE UNIQUE INDEX "Word_id_key" ON "Word"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Clip_id_key" ON "Clip"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rate_id_key" ON "Rate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WordReport_id_key" ON "WordReport"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClipReport_id_key" ON "ClipReport"("id");

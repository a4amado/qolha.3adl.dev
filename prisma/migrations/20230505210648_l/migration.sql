-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "code" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user'
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Word" (
    "ar" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Word_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Clip" (
    "id" TEXT NOT NULL,
    "clipName" TEXT NOT NULL,
    "accept" BOOLEAN NOT NULL DEFAULT false,
    "reject" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "wordId" TEXT NOT NULL,
    CONSTRAINT "Clip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Clip_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rate" (
    "id" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "clipId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Rate_clipId_fkey" FOREIGN KEY ("clipId") REFERENCES "Clip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WordReport" (
    "id" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "WordReport_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WordReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClipReport" (
    "id" TEXT NOT NULL,
    "clipId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "userId" TEXT,
    "wordId" TEXT,
    CONSTRAINT "ClipReport_clipId_fkey" FOREIGN KEY ("clipId") REFERENCES "Clip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClipReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ClipReport_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Word_id_key" ON "Word"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Clip_id_key" ON "Clip"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rate_id_key" ON "Rate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rate_clipId_userId_key" ON "Rate"("clipId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "WordReport_id_key" ON "WordReport"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClipReport_id_key" ON "ClipReport"("id");
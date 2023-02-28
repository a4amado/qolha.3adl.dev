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
CREATE UNIQUE INDEX "WordReport_id_key" ON "WordReport"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClipReport_id_key" ON "ClipReport"("id");

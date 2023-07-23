-- CreateTable
CREATE TABLE "wordPopularity" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "wordId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "wordPopularity_id_key" ON "wordPopularity"("id");

-- AddForeignKey
ALTER TABLE "wordPopularity" ADD CONSTRAINT "wordPopularity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wordPopularity" ADD CONSTRAINT "wordPopularity_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

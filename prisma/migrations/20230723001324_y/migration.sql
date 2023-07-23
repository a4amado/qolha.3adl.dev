/*
  Warnings:

  - You are about to drop the column `accepted` on the `Word` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Business_information" TEXT,
ADD COLUMN     "Contact_information" TEXT,
ADD COLUMN     "Language_skills" TEXT,
ADD COLUMN     "Personal_information" TEXT,
ADD COLUMN     "Real_name" TEXT,
ADD COLUMN     "Region" TEXT,
ADD COLUMN     "Website" TEXT,
ADD COLUMN     "last_login" TEXT;

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "accepted";

-- CreateTable
CREATE TABLE "WordApproval" (
    "id" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WordApproval_id_key" ON "WordApproval"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WordApproval_wordId_key" ON "WordApproval"("wordId");

-- AddForeignKey
ALTER TABLE "WordApproval" ADD CONSTRAINT "WordApproval_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordApproval" ADD CONSTRAINT "WordApproval_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

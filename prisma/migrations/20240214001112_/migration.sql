/*
  Warnings:

  - Made the column `word_id` on table `Clip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Clip" ALTER COLUMN "word_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

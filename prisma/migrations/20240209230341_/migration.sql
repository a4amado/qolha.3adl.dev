-- DropForeignKey
ALTER TABLE "Clip" DROP CONSTRAINT "Clip_word_id_fkey";

-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "create_at" SET DEFAULT now()::date;

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

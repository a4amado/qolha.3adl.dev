-- DropForeignKey
ALTER TABLE "Clip" DROP CONSTRAINT "Clip_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Clip" DROP CONSTRAINT "Clip_word_id_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_user_id_fkey";

-- AlterTable
ALTER TABLE "Clip" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "word_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "create_at" SET DEFAULT now()::date;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "Word"("id") ON DELETE SET NULL ON UPDATE CASCADE;

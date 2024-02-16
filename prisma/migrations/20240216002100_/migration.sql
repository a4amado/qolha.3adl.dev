-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('SUPREME_LEADER', 'MODRATOR', 'PEASANT');

-- CreateTable
CREATE TABLE "Clip" (
    "supabase_path" TEXT NOT NULL,
    "supabase_public_url" TEXT NOT NULL,
    "user_id" UUID,
    "approved" TIMESTAMP(3),
    "id" SERIAL NOT NULL,
    "word_id" UUID NOT NULL,

    CONSTRAINT "Clip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "text" TEXT NOT NULL,
    "number_of_clips" INTEGER NOT NULL DEFAULT 0,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clip_supabase_path_key" ON "Clip"("supabase_path");

-- CreateIndex
CREATE UNIQUE INDEX "Clip_supabase_public_url_key" ON "Clip"("supabase_public_url");

-- CreateIndex
CREATE UNIQUE INDEX "Clip_id_key" ON "Clip"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Word_id_key" ON "Word"("id");

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

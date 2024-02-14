-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "hstore" WITH SCHEMA "public";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('SUPREME_LEADER', 'MODRATOR', 'PEASANT');

-- CreateTable
CREATE TABLE "Clip" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "supabase_path" TEXT NOT NULL,
    "supabase_public_url" TEXT NOT NULL,
    "user_id" UUID,
    "word_id" UUID NOT NULL,
    "approved" TIMESTAMP(3),

    CONSTRAINT "Clip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "text" TEXT NOT NULL,
    "number_of_clips" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clip_supabase_path_key" ON "Clip"("supabase_path");

-- CreateIndex
CREATE UNIQUE INDEX "Clip_supabase_public_url_key" ON "Clip"("supabase_public_url");

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

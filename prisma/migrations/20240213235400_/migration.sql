-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('SUPREME_LEADER', 'MODRATOR', 'PEASANT');

-- CreateTable
CREATE TABLE "Clip" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "supabase_path" TEXT NOT NULL,
    "supabase_public_url" TEXT NOT NULL,
    "user_id" UUID,
    "word_id" UUID,
    "approved" TIMESTAMP(3),

    CONSTRAINT "Clip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "text" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clip_supabase_path_key" ON "Clip"("supabase_path");

-- CreateIndex
CREATE UNIQUE INDEX "Clip_supabase_public_url_key" ON "Clip"("supabase_public_url");

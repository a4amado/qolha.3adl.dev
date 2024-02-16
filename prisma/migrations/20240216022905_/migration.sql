/*
  Warnings:

  - The primary key for the `Clip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Clip` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Clip" DROP CONSTRAINT "Clip_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Clip_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Clip_id_key" ON "Clip"("id");

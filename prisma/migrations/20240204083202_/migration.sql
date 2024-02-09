/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Clip` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Clip_text_key" ON "Clip"("text");

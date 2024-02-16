/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Word_text_key" ON "Word"("text");

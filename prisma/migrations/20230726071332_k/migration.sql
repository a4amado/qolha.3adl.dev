/*
  Warnings:

  - A unique constraint covering the columns `[ar]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Word_ar_key" ON "Word"("ar");

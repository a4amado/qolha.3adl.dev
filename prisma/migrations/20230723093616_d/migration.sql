/*
  Warnings:

  - The `last_login` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "last_login",
ADD COLUMN     "last_login" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

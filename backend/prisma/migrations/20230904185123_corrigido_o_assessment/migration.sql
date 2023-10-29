/*
  Warnings:

  - You are about to drop the column `assesment` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "assesment",
ADD COLUMN     "assessment" INTEGER;

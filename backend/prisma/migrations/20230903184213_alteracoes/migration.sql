/*
  Warnings:

  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Real` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "price" SET DEFAULT 0.0,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

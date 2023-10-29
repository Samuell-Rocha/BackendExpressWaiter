/*
  Warnings:

  - You are about to alter the column `total` on the `OrderItens` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.

*/
-- AlterTable
ALTER TABLE "OrderItens" ALTER COLUMN "total" SET DATA TYPE DECIMAL(6,2);

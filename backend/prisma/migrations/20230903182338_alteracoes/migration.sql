/*
  Warnings:

  - You are about to alter the column `price` on the `OrderItens` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - Changed the type of `price` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "OrderItens" ALTER COLUMN "price" SET DATA TYPE REAL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "price",
ADD COLUMN     "price" REAL NOT NULL,
ALTER COLUMN "estimated_time" SET DATA TYPE TIME;

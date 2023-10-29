/*
  Warnings:

  - You are about to alter the column `price` on the `OrderItens` table. The data in that column could be lost. The data in that column will be cast from `Real` to `Decimal(65,30)`.
  - The `estimated_time` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "OrderItens" ALTER COLUMN "price" SET DEFAULT 0.0,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "products" DROP COLUMN "estimated_time",
ADD COLUMN     "estimated_time" TIMESTAMP(3);

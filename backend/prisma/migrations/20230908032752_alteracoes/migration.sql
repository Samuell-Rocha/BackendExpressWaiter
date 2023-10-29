/*
  Warnings:

  - You are about to drop the column `price` on the `OrderItens` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItens" DROP COLUMN "price",
ADD COLUMN     "total" DECIMAL(65,30) NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "update_at";

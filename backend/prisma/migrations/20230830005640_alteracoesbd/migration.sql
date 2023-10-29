/*
  Warnings:

  - Added the required column `estimated_time` to the `products` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "estimated_time" TIMESTAMP(3) NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

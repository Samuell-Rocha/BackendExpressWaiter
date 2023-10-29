/*
  Warnings:

  - Made the column `estimated_time` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "estimated_time" SET NOT NULL,
ALTER COLUMN "estimated_time" SET DATA TYPE TEXT;

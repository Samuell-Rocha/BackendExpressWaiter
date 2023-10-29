/*
  Warnings:

  - You are about to drop the column `order_id` on the `Table` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_order_id_fkey";

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "order_id";

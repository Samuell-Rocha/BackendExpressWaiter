/*
  Warnings:

  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_order_id_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "Status";

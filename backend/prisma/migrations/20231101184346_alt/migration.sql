/*
  Warnings:

  - You are about to drop the column `qrcode_id` on the `table` table. All the data in the column will be lost.
  - Added the required column `qrcode` to the `table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "table" DROP COLUMN "qrcode_id",
ADD COLUMN     "qrcode" TEXT NOT NULL;

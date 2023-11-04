/*
  Warnings:

  - You are about to drop the `qrcode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "table" DROP CONSTRAINT "table_qrcode_id_fkey";

-- DropTable
DROP TABLE "qrcode";

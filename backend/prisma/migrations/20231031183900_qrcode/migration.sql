/*
  Warnings:

  - Added the required column `qrcode_id` to the `table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "table" ADD COLUMN     "qrcode_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "qrcode" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "qrcode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_qrcode_id_fkey" FOREIGN KEY ("qrcode_id") REFERENCES "qrcode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

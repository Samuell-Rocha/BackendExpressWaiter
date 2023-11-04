/*
  Warnings:

  - Added the required column `qrcode` to the `qrcode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "qrcode" ADD COLUMN     "qrcode" TEXT NOT NULL;

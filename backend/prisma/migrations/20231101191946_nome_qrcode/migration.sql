/*
  Warnings:

  - Added the required column `nameqrcode` to the `table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "table" ADD COLUMN     "nameqrcode" TEXT NOT NULL;

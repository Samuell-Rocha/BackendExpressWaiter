/*
  Warnings:

  - You are about to alter the column `table_number` on the `Table` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.

*/
-- AlterTable
ALTER TABLE "Table" ALTER COLUMN "table_number" SET DATA TYPE SMALLINT;

/*
  Warnings:

  - The primary key for the `Table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `table_number` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Made the column `qrcode` on table `Table` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_table_id_fkey";

-- AlterTable
ALTER TABLE "Table" DROP CONSTRAINT "Table_pkey",
ADD COLUMN     "table_number" INTEGER NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "qrcode" SET NOT NULL,
ADD CONSTRAINT "Table_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "table_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

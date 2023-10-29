/*
  Warnings:

  - You are about to drop the column `table` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "table";

-- CreateTable
CREATE TABLE "Table" (
    "id" INTEGER NOT NULL,
    "qrcode" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

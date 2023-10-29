/*
  Warnings:

  - You are about to drop the column `closure` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `draft` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `orders` table. All the data in the column will be lost.
  - Added the required column `canceled` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Status" ADD COLUMN     "canceled" TEXT NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "closure",
DROP COLUMN "draft",
DROP COLUMN "status";

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

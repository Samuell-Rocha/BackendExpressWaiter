-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "assesment" INTEGER,
ADD COLUMN     "closure" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "concluded_at" DROP DEFAULT;

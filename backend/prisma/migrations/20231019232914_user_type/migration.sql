/*
  Warnings:

  - Added the required column `type_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserType" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

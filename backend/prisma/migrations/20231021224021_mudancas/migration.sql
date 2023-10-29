/*
  Warnings:

  - You are about to drop the column `accessId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_accessId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "accessId";

-- CreateTable
CREATE TABLE "UserAccess" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "accessId" TEXT,

    CONSTRAINT "UserAccess_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAccess" ADD CONSTRAINT "UserAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccess" ADD CONSTRAINT "UserAccess_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

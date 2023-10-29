/*
  Warnings:

  - You are about to drop the `UserAccess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAccess" DROP CONSTRAINT "UserAccess_accessId_fkey";

-- DropForeignKey
ALTER TABLE "UserAccess" DROP CONSTRAINT "UserAccess_userId_fkey";

-- DropTable
DROP TABLE "UserAccess";

-- CreateTable
CREATE TABLE "useraccess" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "accessId" TEXT,

    CONSTRAINT "useraccess_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "useraccess" ADD CONSTRAINT "useraccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "useraccess" ADD CONSTRAINT "useraccess_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

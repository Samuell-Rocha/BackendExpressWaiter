/*
  Warnings:

  - You are about to drop the column `description` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the `permissions_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "permissions_roles" DROP CONSTRAINT "permissions_roles_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "permissions_roles" DROP CONSTRAINT "permissions_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "users_permissions" DROP CONSTRAINT "users_permissions_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "users_permissions" DROP CONSTRAINT "users_permissions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_roles_id_fkey";

-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_user_id_fkey";

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "accessId" TEXT;

-- DropTable
DROP TABLE "permissions_roles";

-- DropTable
DROP TABLE "roles";

-- DropTable
DROP TABLE "users_permissions";

-- DropTable
DROP TABLE "users_roles";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

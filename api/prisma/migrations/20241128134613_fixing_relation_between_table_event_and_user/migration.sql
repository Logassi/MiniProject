/*
  Warnings:

  - You are about to drop the column `userId` on the `event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_userId_fkey`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `userId`;

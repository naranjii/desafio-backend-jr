/*
  Warnings:

  - You are about to drop the column `approvedById` on the `ApprovalHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ApprovalHistory` DROP FOREIGN KEY `ApprovalHistory_approvedById_fkey`;

-- DropIndex
DROP INDEX `ApprovalHistory_approvedById_fkey` ON `ApprovalHistory`;

-- AlterTable
ALTER TABLE `ApprovalHistory` DROP COLUMN `approvedById`,
    ADD COLUMN `performedById` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ApprovalHistory` ADD CONSTRAINT `ApprovalHistory_performedById_fkey` FOREIGN KEY (`performedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

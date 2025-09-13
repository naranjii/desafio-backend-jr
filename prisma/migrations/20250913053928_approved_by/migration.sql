/*
  Warnings:

  - You are about to drop the column `approvedBy` on the `ApprovalHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ApprovalHistory` DROP COLUMN `approvedBy`,
    ADD COLUMN `approvedById` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ApprovalHistory` ADD CONSTRAINT `ApprovalHistory_approvedById_fkey` FOREIGN KEY (`approvedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

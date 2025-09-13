-- AlterTable
ALTER TABLE `ApprovalHistory` MODIFY `fromStatus` ENUM('draft', 'submitted', 'approved', 'rejected') NULL;

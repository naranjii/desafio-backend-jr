/*
  Warnings:

  - You are about to alter the column `fromStatus` on the `ApprovalHistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to alter the column `toStatus` on the `ApprovalHistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to alter the column `status` on the `PurchaseRequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `ApprovalHistory` MODIFY `fromStatus` ENUM('draft', 'submitted', 'approved', 'rejected') NOT NULL,
    MODIFY `toStatus` ENUM('draft', 'submitted', 'approved', 'rejected') NOT NULL;

-- AlterTable
ALTER TABLE `PurchaseRequest` MODIFY `status` ENUM('draft', 'submitted', 'approved', 'rejected') NOT NULL DEFAULT 'draft';

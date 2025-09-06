/*
  Warnings:

  - You are about to alter the column `type` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `transaction` MODIFY `type` ENUM('INCOME', 'EXPENSE') NOT NULL,
    MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `amount` DECIMAL(12, 2) NOT NULL,
    MODIFY `spendDate` DATE NOT NULL,
    MODIFY `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updatedAt` TIMESTAMP(6) NOT NULL;

-- CreateIndex
CREATE INDEX `Transaction_spendDate_idx` ON `Transaction`(`spendDate`);

-- CreateIndex
CREATE INDEX `Transaction_type_idx` ON `Transaction`(`type`);

/*
  Warnings:

  - You are about to drop the column `solicitanteId` on the `consumocombustible` table. All the data in the column will be lost.
  - You are about to drop the `solicitante` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `consumocombustible` DROP FOREIGN KEY `ConsumoCombustible_solicitanteId_fkey`;

-- DropIndex
DROP INDEX `ConsumoCombustible_solicitanteId_fkey` ON `consumocombustible`;

-- AlterTable
ALTER TABLE `consumocombustible` DROP COLUMN `solicitanteId`,
    ADD COLUMN `conductorId` INTEGER NULL;

-- DropTable
DROP TABLE `solicitante`;

-- CreateTable
CREATE TABLE `Conductor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConsumoCombustible` ADD CONSTRAINT `ConsumoCombustible_conductorId_fkey` FOREIGN KEY (`conductorId`) REFERENCES `Conductor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

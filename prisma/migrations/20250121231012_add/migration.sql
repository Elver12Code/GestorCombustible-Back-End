/*
  Warnings:

  - Made the column `cantidad` on table `consumocombustible` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clasificador` on table `consumocombustible` required. This step will fail if there are existing NULL values in that column.
  - Made the column `combustible` on table `consumocombustible` required. This step will fail if there are existing NULL values in that column.
  - Made the column `meta` on table `consumocombustible` required. This step will fail if there are existing NULL values in that column.
  - Made the column `observacion` on table `consumocombustible` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ordenConsumo` on table `consumocombustible` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unidad` on table `consumocombustible` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `consumocombustible` ADD COLUMN `solicitanteId` INTEGER NULL,
    MODIFY `cantidad` DOUBLE NOT NULL,
    MODIFY `clasificador` VARCHAR(191) NOT NULL,
    MODIFY `combustible` VARCHAR(191) NOT NULL,
    MODIFY `meta` VARCHAR(191) NOT NULL,
    MODIFY `observacion` VARCHAR(191) NOT NULL,
    MODIFY `ordenConsumo` VARCHAR(191) NOT NULL,
    MODIFY `unidad` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Solicitante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConsumoCombustible` ADD CONSTRAINT `ConsumoCombustible_solicitanteId_fkey` FOREIGN KEY (`solicitanteId`) REFERENCES `Solicitante`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

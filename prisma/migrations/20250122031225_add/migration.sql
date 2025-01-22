-- AlterTable
ALTER TABLE `consumocombustible` ADD COLUMN `solicitanteId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Solicitante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConsumoCombustible` ADD CONSTRAINT `ConsumoCombustible_solicitanteId_fkey` FOREIGN KEY (`solicitanteId`) REFERENCES `Solicitante`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

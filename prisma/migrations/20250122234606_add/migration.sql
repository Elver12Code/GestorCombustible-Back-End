-- AlterTable
ALTER TABLE `consumocombustible` ADD COLUMN `autorizadoId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Autorizado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConsumoCombustible` ADD CONSTRAINT `ConsumoCombustible_autorizadoId_fkey` FOREIGN KEY (`autorizadoId`) REFERENCES `Autorizado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

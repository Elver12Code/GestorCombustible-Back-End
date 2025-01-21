-- CreateTable
CREATE TABLE `ConsumoCombustible` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unidadOperativaId` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `formNumber` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConsumoCombustible` ADD CONSTRAINT `ConsumoCombustible_unidadOperativaId_fkey` FOREIGN KEY (`unidadOperativaId`) REFERENCES `UnidadOperativa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

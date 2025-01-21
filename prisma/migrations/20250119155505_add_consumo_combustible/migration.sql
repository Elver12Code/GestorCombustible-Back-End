-- CreateTable
CREATE TABLE `ConsumoCombustible` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ordenConsumo` VARCHAR(191) NOT NULL,
    `clasificador` VARCHAR(191) NOT NULL,
    `meta` VARCHAR(191) NOT NULL,
    `solicitanteApellidoPaterno` VARCHAR(191) NOT NULL,
    `solicitanteApellidoMaterno` VARCHAR(191) NOT NULL,
    `solicitanteNombres` VARCHAR(191) NOT NULL,
    `autorizadoApellidoPaterno` VARCHAR(191) NOT NULL,
    `autorizadoApellidoMaterno` VARCHAR(191) NOT NULL,
    `autorizadoNombres` VARCHAR(191) NOT NULL,
    `vehiculoMaquina` VARCHAR(191) NOT NULL,
    `vehiculoPlaca` VARCHAR(191) NOT NULL,
    `vehiculoTipo` VARCHAR(191) NOT NULL,
    `conductorApellidoPaterno` VARCHAR(191) NOT NULL,
    `conductorApellidoMaterno` VARCHAR(191) NOT NULL,
    `conductorNombres` VARCHAR(191) NOT NULL,
    `combustible` VARCHAR(191) NOT NULL,
    `cantidad` DECIMAL(65, 30) NOT NULL,
    `unidad` VARCHAR(191) NOT NULL,
    `observacion` VARCHAR(191) NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `unidadOperativaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConsumoCombustible` ADD CONSTRAINT `ConsumoCombustible_unidadOperativaId_fkey` FOREIGN KEY (`unidadOperativaId`) REFERENCES `UnidadOperativa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

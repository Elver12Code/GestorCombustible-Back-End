/*
  Warnings:

  - You are about to drop the column `autorizadoApellidoMaterno` on the `consumocombustible` table. All the data in the column will be lost.
  - You are about to drop the column `autorizadoApellidoPaterno` on the `consumocombustible` table. All the data in the column will be lost.
  - You are about to drop the column `autorizadoNombres` on the `consumocombustible` table. All the data in the column will be lost.
  - You are about to drop the column `conductorApellidoMaterno` on the `consumocombustible` table. All the data in the column will be lost.
  - You are about to drop the column `conductorApellidoPaterno` on the `consumocombustible` table. All the data in the column will be lost.
  - You are about to drop the column `conductorNombres` on the `consumocombustible` table. All the data in the column will be lost.
  - You are about to drop the column `solicitanteApellidoMaterno` on the `consumocombustible` table. All the data in the column will be lost.
  - You are about to drop the column `solicitanteApellidoPaterno` on the `consumocombustible` table. All the data in the column will be lost.
  - You are about to drop the column `solicitanteNombres` on the `consumocombustible` table. All the data in the column will be lost.
  - You are about to drop the column `vehiculoMaquina` on the `consumocombustible` table. All the data in the column will be lost.
  - You are about to drop the column `vehiculoPlaca` on the `consumocombustible` table. All the data in the column will be lost.
  - You are about to drop the column `vehiculoTipo` on the `consumocombustible` table. All the data in the column will be lost.
  - Added the required column `autorizadoId` to the `ConsumoCombustible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conductorId` to the `ConsumoCombustible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solicitanteId` to the `ConsumoCombustible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehiculoId` to the `ConsumoCombustible` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `consumocombustible` DROP COLUMN `autorizadoApellidoMaterno`,
    DROP COLUMN `autorizadoApellidoPaterno`,
    DROP COLUMN `autorizadoNombres`,
    DROP COLUMN `conductorApellidoMaterno`,
    DROP COLUMN `conductorApellidoPaterno`,
    DROP COLUMN `conductorNombres`,
    DROP COLUMN `solicitanteApellidoMaterno`,
    DROP COLUMN `solicitanteApellidoPaterno`,
    DROP COLUMN `solicitanteNombres`,
    DROP COLUMN `vehiculoMaquina`,
    DROP COLUMN `vehiculoPlaca`,
    DROP COLUMN `vehiculoTipo`,
    ADD COLUMN `autorizadoId` INTEGER NOT NULL,
    ADD COLUMN `conductorId` INTEGER NOT NULL,
    ADD COLUMN `solicitanteId` INTEGER NOT NULL,
    ADD COLUMN `vehiculoId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Solicitante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paterno` VARCHAR(191) NOT NULL,
    `materno` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Autorizado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paterno` VARCHAR(191) NOT NULL,
    `materno` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `maquina` VARCHAR(191) NOT NULL,
    `placa` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conductor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paterno` VARCHAR(191) NOT NULL,
    `materno` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConsumoCombustible` ADD CONSTRAINT `ConsumoCombustible_solicitanteId_fkey` FOREIGN KEY (`solicitanteId`) REFERENCES `Solicitante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumoCombustible` ADD CONSTRAINT `ConsumoCombustible_autorizadoId_fkey` FOREIGN KEY (`autorizadoId`) REFERENCES `Autorizado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumoCombustible` ADD CONSTRAINT `ConsumoCombustible_vehiculoId_fkey` FOREIGN KEY (`vehiculoId`) REFERENCES `Vehiculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumoCombustible` ADD CONSTRAINT `ConsumoCombustible_conductorId_fkey` FOREIGN KEY (`conductorId`) REFERENCES `Conductor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

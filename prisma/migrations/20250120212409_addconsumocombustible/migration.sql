/*
  Warnings:

  - You are about to drop the `autorizado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `conductor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `consumocombustible` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `solicitante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehiculo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `consumocombustible` DROP FOREIGN KEY `ConsumoCombustible_autorizadoId_fkey`;

-- DropForeignKey
ALTER TABLE `consumocombustible` DROP FOREIGN KEY `ConsumoCombustible_conductorId_fkey`;

-- DropForeignKey
ALTER TABLE `consumocombustible` DROP FOREIGN KEY `ConsumoCombustible_solicitanteId_fkey`;

-- DropForeignKey
ALTER TABLE `consumocombustible` DROP FOREIGN KEY `ConsumoCombustible_unidadOperativaId_fkey`;

-- DropForeignKey
ALTER TABLE `consumocombustible` DROP FOREIGN KEY `ConsumoCombustible_vehiculoId_fkey`;

-- DropTable
DROP TABLE `autorizado`;

-- DropTable
DROP TABLE `conductor`;

-- DropTable
DROP TABLE `consumocombustible`;

-- DropTable
DROP TABLE `solicitante`;

-- DropTable
DROP TABLE `vehiculo`;

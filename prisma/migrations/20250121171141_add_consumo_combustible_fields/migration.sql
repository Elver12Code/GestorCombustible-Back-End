/*
  Warnings:

  - Added the required column `cantidad` to the `ConsumoCombustible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clasificador` to the `ConsumoCombustible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combustible` to the `ConsumoCombustible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meta` to the `ConsumoCombustible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observacion` to the `ConsumoCombustible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ordenConsumo` to the `ConsumoCombustible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidad` to the `ConsumoCombustible` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `consumocombustible` ADD COLUMN `cantidad` DOUBLE NOT NULL,
    ADD COLUMN `clasificador` VARCHAR(191) NOT NULL,
    ADD COLUMN `combustible` VARCHAR(191) NOT NULL,
    ADD COLUMN `meta` VARCHAR(191) NOT NULL,
    ADD COLUMN `observacion` VARCHAR(191) NOT NULL,
    ADD COLUMN `ordenConsumo` VARCHAR(191) NOT NULL,
    ADD COLUMN `unidad` VARCHAR(191) NOT NULL;

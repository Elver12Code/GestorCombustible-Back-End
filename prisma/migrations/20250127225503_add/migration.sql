/*
  Warnings:

  - You are about to alter the column `stock` on the `unidadoperativa` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Made the column `stockInicial` on table `unidadoperativa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `unidadoperativa` MODIFY `stock` DOUBLE NOT NULL,
    MODIFY `stockInicial` DOUBLE NOT NULL;

/*
  Warnings:

  - You are about to alter the column `stock` on the `consumocombustible` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `stockActual` on the `consumocombustible` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `stockInicial` on the `consumocombustible` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `consumocombustible` MODIFY `stock` DOUBLE NOT NULL,
    MODIFY `stockActual` DOUBLE NOT NULL,
    MODIFY `stockInicial` DOUBLE NOT NULL;

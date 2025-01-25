/*
  Warnings:

  - Added the required column `stockInicial` to the `UnidadOperativa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `unidadoperativa` ADD COLUMN `stockInicial` INTEGER NOT NULL;

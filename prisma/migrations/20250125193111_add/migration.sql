/*
  Warnings:

  - Added the required column `stockInicial` to the `ConsumoCombustible` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `consumocombustible` ADD COLUMN `stockInicial` INTEGER NOT NULL;

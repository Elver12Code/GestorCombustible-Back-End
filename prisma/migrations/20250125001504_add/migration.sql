/*
  Warnings:

  - Added the required column `stockActual` to the `ConsumoCombustible` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `consumocombustible` ADD COLUMN `stockActual` INTEGER NOT NULL;

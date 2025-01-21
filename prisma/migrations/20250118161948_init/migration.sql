/*
  Warnings:

  - You are about to drop the column `createdAt` on the `unidadoperativa` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `unidadoperativa` table. All the data in the column will be lost.
  - Added the required column `name` to the `UnidadOperativa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `unidadoperativa` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `nombre` VARCHAR(191) NULL;

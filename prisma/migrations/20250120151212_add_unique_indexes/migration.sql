/*
  Warnings:

  - A unique constraint covering the columns `[paterno,materno,nombres]` on the table `Autorizado` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Autorizado_paterno_materno_nombres_key` ON `Autorizado`(`paterno`, `materno`, `nombres`);

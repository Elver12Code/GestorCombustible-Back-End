/*
  Warnings:

  - A unique constraint covering the columns `[paterno,materno,nombres]` on the table `Solicitante` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Solicitante_paterno_materno_nombres_key` ON `Solicitante`(`paterno`, `materno`, `nombres`);

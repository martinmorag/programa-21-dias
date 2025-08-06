/*
  Warnings:

  - A unique constraint covering the columns `[temaId,orden]` on the table `Recurso` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orden` to the `Recurso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recurso" ADD COLUMN     "orden" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recurso_temaId_orden_key" ON "Recurso"("temaId", "orden");

/*
  Warnings:

  - You are about to drop the column `completado` on the `Examen` table. All the data in the column will be lost.
  - You are about to drop the column `fechaExamen` on the `Examen` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `Examen` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Examen` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[planCode]` on the table `Examen` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Examen" DROP CONSTRAINT "Examen_planId_fkey";

-- DropForeignKey
ALTER TABLE "Examen" DROP CONSTRAINT "Examen_usuarioId_fkey";

-- DropIndex
DROP INDEX "Examen_usuarioId_planId_key";

-- AlterTable
ALTER TABLE "Examen" DROP COLUMN "completado",
DROP COLUMN "fechaExamen",
DROP COLUMN "planId",
DROP COLUMN "usuarioId";

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "examenCompletado" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ExamenIntento" (
    "id" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "puntaje" DOUBLE PRECISION,
    "aprobado" BOOLEAN NOT NULL DEFAULT false,
    "fechaIntento" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamenIntento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamenPregunta" (
    "id" UUID NOT NULL,
    "pregunta" VARCHAR(255) NOT NULL,
    "respuestaCorrectaId" UUID NOT NULL,
    "examenId" UUID NOT NULL,

    CONSTRAINT "ExamenPregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamenOpcion" (
    "id" UUID NOT NULL,
    "texto" VARCHAR(255) NOT NULL,
    "preguntaId" UUID NOT NULL,

    CONSTRAINT "ExamenOpcion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExamenIntento_usuarioId_planId_key" ON "ExamenIntento"("usuarioId", "planId");

-- CreateIndex
CREATE UNIQUE INDEX "ExamenPregunta_respuestaCorrectaId_key" ON "ExamenPregunta"("respuestaCorrectaId");

-- CreateIndex
CREATE UNIQUE INDEX "Examen_planCode_key" ON "Examen"("planCode");

-- AddForeignKey
ALTER TABLE "ExamenIntento" ADD CONSTRAINT "ExamenIntento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenIntento" ADD CONSTRAINT "ExamenIntento_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examen" ADD CONSTRAINT "Examen_planCode_fkey" FOREIGN KEY ("planCode") REFERENCES "Plan"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenPregunta" ADD CONSTRAINT "ExamenPregunta_respuestaCorrectaId_fkey" FOREIGN KEY ("respuestaCorrectaId") REFERENCES "ExamenOpcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenPregunta" ADD CONSTRAINT "ExamenPregunta_examenId_fkey" FOREIGN KEY ("examenId") REFERENCES "Examen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenOpcion" ADD CONSTRAINT "ExamenOpcion_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "ExamenPregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

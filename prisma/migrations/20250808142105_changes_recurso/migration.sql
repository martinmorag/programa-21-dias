/*
  Warnings:

  - You are about to drop the column `contenido` on the `Recurso` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Recurso` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Recurso` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recurso" DROP COLUMN "contenido",
DROP COLUMN "tipo",
DROP COLUMN "url";

-- DropEnum
DROP TYPE "TipoRecurso";

-- CreateTable
CREATE TABLE "Video" (
    "id" UUID NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "recursoId" UUID NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pdf" (
    "id" UUID NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "recursoId" UUID NOT NULL,

    CONSTRAINT "Pdf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pregunta" (
    "id" UUID NOT NULL,
    "texto" VARCHAR(255) NOT NULL,
    "opciones" JSONB NOT NULL,
    "respuesta" VARCHAR(255) NOT NULL,
    "orden" INTEGER NOT NULL,
    "recursoId" UUID NOT NULL,

    CONSTRAINT "Pregunta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_recursoId_key" ON "Video"("recursoId");

-- CreateIndex
CREATE UNIQUE INDEX "Pdf_recursoId_key" ON "Pdf"("recursoId");

-- CreateIndex
CREATE UNIQUE INDEX "Pregunta_recursoId_orden_key" ON "Pregunta"("recursoId", "orden");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_recursoId_fkey" FOREIGN KEY ("recursoId") REFERENCES "Recurso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pdf" ADD CONSTRAINT "Pdf_recursoId_fkey" FOREIGN KEY ("recursoId") REFERENCES "Recurso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_recursoId_fkey" FOREIGN KEY ("recursoId") REFERENCES "Recurso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

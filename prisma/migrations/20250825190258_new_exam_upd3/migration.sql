-- DropForeignKey
ALTER TABLE "ExamenPregunta" DROP CONSTRAINT "ExamenPregunta_respuestaCorrectaId_fkey";

-- AlterTable
ALTER TABLE "ExamenPregunta" ALTER COLUMN "respuestaCorrectaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ExamenPregunta" ADD CONSTRAINT "ExamenPregunta_respuestaCorrectaId_fkey" FOREIGN KEY ("respuestaCorrectaId") REFERENCES "ExamenOpcion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

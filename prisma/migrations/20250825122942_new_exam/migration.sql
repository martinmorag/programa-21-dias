-- CreateTable
CREATE TABLE "Examen" (
    "id" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "planCode" VARCHAR(100) NOT NULL,
    "completado" BOOLEAN NOT NULL DEFAULT false,
    "fechaExamen" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Examen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Examen_usuarioId_planId_key" ON "Examen"("usuarioId", "planId");

-- AddForeignKey
ALTER TABLE "Examen" ADD CONSTRAINT "Examen_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examen" ADD CONSTRAINT "Examen_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

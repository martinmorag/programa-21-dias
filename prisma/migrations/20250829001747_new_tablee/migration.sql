-- CreateTable
CREATE TABLE "ClaseBonus" (
    "id" UUID NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "descripcion" TEXT,
    "linkVideo" VARCHAR(255) NOT NULL,
    "fechaDisponible" TIMESTAMP(3),

    CONSTRAINT "ClaseBonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClaseBonusToPlan" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ClaseBonusToPlan_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ClaseBonusToPlan_B_index" ON "_ClaseBonusToPlan"("B");

-- AddForeignKey
ALTER TABLE "_ClaseBonusToPlan" ADD CONSTRAINT "_ClaseBonusToPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "ClaseBonus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClaseBonusToPlan" ADD CONSTRAINT "_ClaseBonusToPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

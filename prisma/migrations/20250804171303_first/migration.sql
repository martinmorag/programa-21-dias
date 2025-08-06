-- CreateEnum
CREATE TYPE "TipoRecurso" AS ENUM ('VIDEO', 'PDF', 'QUIZ');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100),
    "email" VARCHAR(200) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "level" VARCHAR(50) NOT NULL,
    "profile_image" BYTEA,
    "default_picture" VARCHAR(50) DEFAULT 'profile',
    "accesos_directos" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login_attempts" (
    "id" TEXT NOT NULL,
    "usuarioid" UUID NOT NULL,
    "attemptedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "success" BOOLEAN NOT NULL,
    "ipaddress" TEXT,
    "useragent" TEXT,
    "reason" TEXT,

    CONSTRAINT "login_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tema" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "orden" INTEGER NOT NULL,

    CONSTRAINT "Tema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recurso" (
    "id" UUID NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "tipo" "TipoRecurso" NOT NULL,
    "url" TEXT,
    "contenido" JSONB,
    "temaId" INTEGER NOT NULL,

    CONSTRAINT "Recurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgresoRecurso" (
    "usuarioId" UUID NOT NULL,
    "recursoId" UUID NOT NULL,
    "completado" BOOLEAN NOT NULL DEFAULT false,
    "completadoEn" TIMESTAMPTZ,

    CONSTRAINT "ProgresoRecurso_pkey" PRIMARY KEY ("usuarioId","recursoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tema_orden_key" ON "Tema"("orden");

-- AddForeignKey
ALTER TABLE "login_attempts" ADD CONSTRAINT "login_attempts_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recurso" ADD CONSTRAINT "Recurso_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "Tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgresoRecurso" ADD CONSTRAINT "ProgresoRecurso_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgresoRecurso" ADD CONSTRAINT "ProgresoRecurso_recursoId_fkey" FOREIGN KEY ("recursoId") REFERENCES "Recurso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Progress from "@/ui/temas/Progress";

type Props = Promise<{ temaId: string }>;

export default async function TemaPage({ params }: { params: Props }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    redirect("/ingreso");
  }
  const userId = session.user.id;

  const { temaId } = await params;

  // 1. Correct the Prisma query to include the 'recursos' relationship
  const tema = await prisma.tema.findUnique({
    where: {
      id: temaId,
    },
    include: {
      recursos: {
        // 2. Ensure 'orden' exists on your Recurso model in schema.prisma
        orderBy: { orden: "asc" },
        include: {
          progreso: {
            where: { usuarioId: userId },
            select: { completado: true },
          },
        },
      },
    },
  });

  if (!tema) {
    notFound();
  }

  const totalRecursos = tema.recursos.length;
  const recursosCompletados = tema.recursos.filter(
    (recurso) =>
      recurso.progreso.length > 0 && recurso.progreso[0].completado
  ).length;

  const progresoGeneral =
    totalRecursos > 0
      ? Math.round((recursosCompletados / totalRecursos) * 100)
      : 0;

  return (
    <div className="bg-white dark:bg-gray-950 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          {tema.nombre}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {tema.descripcion}
        </p>
      </header>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Progreso del Tema
        </h2>
        <Progress value={progresoGeneral} />
        <span className="text-sm mt-2 block text-gray-500 dark:text-gray-400">
          {progresoGeneral}% completado
        </span>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Recursos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* The map function now works correctly because `tema.recursos` is defined */}
          {tema.recursos.map((recurso) => (
            <Link
              key={recurso.id}
              href={`/temas/${tema.id}/recursos/${recurso.id}`}
              className="group"
            >
              <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 transform group-hover:-translate-y-2 flex flex-col h-full">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors">
                  {recurso.titulo}
                </h3>
                <div className="mt-4 text-sm font-medium">
                  {recurso.progreso.length > 0 &&
                  recurso.progreso[0].completado ? (
                    <span className="text-green-600 dark:text-green-400">
                      ✅ Completado
                    </span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">
                      ❌ Pendiente
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
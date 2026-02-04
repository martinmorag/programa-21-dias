import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/lib/prisma";
import PdfDownloadButton from "@/ui/temas/PdfDownloadButton";
import Link from "next/link";
import { Quiz } from "@/ui/temas/Quiz";
import { FaCheckCircle } from "react-icons/fa";
import { Pregunta, Recurso, Tema } from "@/lib/utils";
import { Metadata } from "next";

type Props = Promise<{ temaId: string }>;

async function getTemaData(temaId: string, userId: string) {
    const tema = await prisma.tema.findUnique({
        where: { id: temaId },
        include: {
            recursos: {
                orderBy: { orden: "asc" },
                include: {
                    video: true,
                    pdf: true,
                    preguntas: true,
                    progreso: {
                        where: { usuarioId: userId },
                        select: { completado: true },
                    },
                },
            },
        },
    });

    return tema as (Tema & { recursos: (Recurso & { preguntas: Pregunta[] })[] }) | null;
}

export async function generateMetadata({ params }: { params: Props }): Promise<Metadata> {
    const { temaId } = await params;

    const tema = await prisma.tema.findUnique({
        where: { id: temaId },
        select: { nombre: true, descripcion: true },
    });

    if (!tema) {
        return {
            title: "Tema no encontrado",
            description: "La página que buscas no existe.",
        };
    }

    return {
        title: tema.nombre,
        description: tema.descripcion,
    };
}

export default async function TemaPage({ params }: { params: Props }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    redirect("/ingreso");
  }
  const userId = session.user.id;

  const { temaId } = await params;
  const tema = await getTemaData(temaId, userId);

  if (!tema) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-gray-950 px-4 py-16 sm:px-6 lg:px-8">
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
          Estado del Tema
        </h2>
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-center">
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {tema.recursos.every(r => r.progreso.length > 0 && r.progreso[0].completado) ? (
              <span className="text-green-600 dark:text-green-400">¡Tema Completado! ✅</span>
            ) : (
              <span className="text-yellow-600 dark:text-yellow-400">Tema en progreso</span>
            )}
          </span>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Recursos
        </h2>
        <div className="space-y-12">
          {tema.recursos.map((recurso) => {
            const isCompleted = recurso.progreso.length > 0 && recurso.progreso[0].completado;
            
            return (
              <div
                key={recurso.id}
                className="p-8 rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  {recurso.orden}. {recurso.titulo}
                  {isCompleted && <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />}
                </h3>

                {recurso.video && (
                  <div className="mt-6">
                    <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
                      <video
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={recurso.video.url}
                        title={recurso.titulo}
                        controls
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}

                {recurso.pdf && (
                  <div className="mt-8">
                    <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">
                      Documento de Apoyo
                    </h4>
                    <div className="flex gap-4">
                      <Link
                        href={`/viewer/${recurso.pdf.url}`}
                        className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                      > Ver PDF
                      </Link>
                      <PdfDownloadButton pdfUrl={recurso.pdf.url} fileName={recurso.titulo} />
                    </div>
                  </div>
                )}
                
                {recurso.preguntas && recurso.preguntas.length > 0 && (
                  <Quiz
                    recursoId={recurso.id}
                    preguntas={recurso.preguntas}
                    isCompleted={isCompleted}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
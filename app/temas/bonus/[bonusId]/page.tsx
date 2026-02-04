import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";
import { ClaseBonusType } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

type Props = Promise<{ bonusId: string }>;

// Function to fetch the bonus class data
async function getBonusData(bonusId: string) {
    const bonusClass = await prisma.claseBonus.findUnique({
        where: { id: bonusId },
    });

    return bonusClass as ClaseBonusType | null;
}

// Generates the metadata (SEO) for the page based on the data
export async function generateMetadata({ params }: { params: Props }): Promise<Metadata> {
    const { bonusId } = await params;
    const bonusClass = await getBonusData(bonusId);

    if (!bonusClass) {
        return {
            title: "Clase no encontrada",
            description: "La clase de bonificación que buscas no existe.",
        };
    }

    return {
        title: bonusClass.titulo,
        description: bonusClass.descripcion,
    };
}

// Main page component
export default async function BonusPage({ params }: { params: Props }) {
    // 1. Authentication check
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
        redirect("/ingreso");
    }

    // 2. Fetch the bonus class data
    const { bonusId } = await params;
    const bonusClass = await getBonusData(bonusId);

    // 3. Handle not found state
    if (!bonusClass) {
        notFound();
    }

    return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Navigation */}
        <Link
          href="/inicio"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
          Volver
        </Link>

        {/* Header Section */}
        <div className="space-y-4 mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            Contenido Bonus
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {bonusClass.titulo}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {bonusClass.descripcion}
          </p>
        </div>

        {/* Video Player Section */}
        <div className="relative group max-w-4xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800 bg-transparent">
                <video 
                controls 
                src={bonusClass.linkVideo} 
                className="w-full h-auto block" // h-auto lets the video define its own height
                >
                Tu navegador no soporta la reproducción de videos.
                </video>
            </div>
        </div>
      </div>
    </main>
  );
}
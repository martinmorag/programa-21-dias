import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import CertificateViewer from "@/ui/temas/CertificateViewer";

export const metadata: Metadata = {
    title: "Certificado de Finalización",
    description: "Descarga tu certificado por completar el Programa 21 Días.",
};

export default async function CertificadoPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
        redirect("/ingreso");
    }
    const userId = session.user.id;
    const userName = `${session.user.name} ${session.user.lastname}`;

    // 1. Find the user's active subscription to get the plan code
    const userSubscription = await prisma.suscripcion.findFirst({
        where: {
            userId: userId,
            status: 'active',
            endDate: { gte: new Date() },
        },
        include: {
            plan: true,
        },
    });

    if (!userSubscription) {
        redirect("/inicio");
    }

    const userPlanCode = userSubscription.plan.code;

    // 2. Count completed 'EMPRENDEDOR' resources for both plans
    const completedEmprendedorRecursos = await prisma.progresoRecurso.count({
        where: {
            usuarioId: userId,
            completado: true,
            recurso: {
                tema: {
                    tipo: 'EMPRENDEDOR',
                },
            },
        },
    });
    const totalEmprendedorRecursos = await prisma.recurso.count({
        where: { tema: { tipo: 'EMPRENDEDOR' } },
    });
    const isEmprendedorCompleted = completedEmprendedorRecursos === totalEmprendedorRecursos;

    // 3. Conditional check and redirect based on the user's plan
    if (userPlanCode === 'emprendedor') {
        if (!isEmprendedorCompleted) {
            redirect("/inicio?error=incomplete");
        }
        return (
            <main>
                <CertificateViewer
                    userName={userName}
                    isEmprendedorPersonal={false} // Pass `false` for the Emprendedor plan
                />
            </main>
        );
    }

    // 4. Handle 'emprendedorpersonal' plan
    if (userPlanCode === 'emprendedorpersonal') {
        const completedPersonalRecursos = await prisma.progresoRecurso.count({
            where: {
                usuarioId: userId,
                completado: true,
                recurso: {
                    tema: {
                        tipo: 'PERSONAL',
                    },
                },
            },
        });
        const totalPersonalRecursos = await prisma.recurso.count({
            where: { tema: { tipo: 'PERSONAL' } },
        });
        const isPersonalCompleted = completedPersonalRecursos === totalPersonalRecursos;

        const isProgramaCompleted = isEmprendedorCompleted && isPersonalCompleted;

        if (!isProgramaCompleted) {
            redirect("/inicio?error=incomplete");
        }
        return (
            <main>
                <CertificateViewer
                    userName={userName}
                    isEmprendedorPersonal={true} // Pass `true` for the EmprendedorPersonal plan
                />
            </main>
        );
    }
    
    // Default case for invalid plan types
    redirect("/inicio");
}
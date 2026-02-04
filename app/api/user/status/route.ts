import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = session.user.id;

    // 1. Get user's active subscription and related plan
    const user = await prisma.usuarios.findUnique({
        where: { id: userId },
        select: {
            subscriptions: {
                where: { status: 'active' },
                include: { plan: true }
            }
        }
    });

    const activeSubscription = user?.subscriptions[0];
    const planCode = activeSubscription?.plan.code || null;

    if (!activeSubscription || !planCode) {
        return NextResponse.json({
            status: 'sin_suscripcion',
            isProgramCompleted: false,
            requiredExamCompleted: false,
            certificado_emprendedor: false,
            certificado_personal: false
        });
    }

    // 2. Determine completion status for the user's plan
    let isProgramCompleted = false;
    let totalResourcesCount = 0;
    
    const temaIdsForPlan = await prisma.tema.findMany({
        where: { tipo: planCode === 'emprendedor' ? 'EMPRENDEDOR' : 'PERSONAL' },
        select: { id: true }
    });

    if (temaIdsForPlan.length > 0) {
        totalResourcesCount = await prisma.recurso.count({
            where: {
                temaId: { in: temaIdsForPlan.map(t => t.id) }
            }
        });

        const completedResourcesCount = await prisma.progresoRecurso.count({
            where: {
                usuarioId: userId,
                completado: true,
                recurso: {
                    temaId: { in: temaIdsForPlan.map(t => t.id) }
                }
            }
        });
        
        isProgramCompleted = completedResourcesCount === totalResourcesCount;
    }
    
    // 3. Check for completed exams using the ExamenIntento model
    const examenEmprendedor = await prisma.examenIntento.findFirst({
        where: {
            usuarioId: userId,
            plan: { code: 'emprendedor' },
            aprobado: true
        }
    });

    const examenPersonal = await prisma.examenIntento.findFirst({
        where: {
            usuarioId: userId,
            plan: { code: 'emprendedorpersonal' },
            aprobado: true
        }
    });

    const requiredExamCompleted = planCode === 'emprendedorpersonal'
        ? !!examenPersonal
        : !!examenEmprendedor;
    
    const certificado_emprendedor = !!examenEmprendedor;
    const certificado_personal = !!examenPersonal;

    return NextResponse.json({
        status: planCode,
        isProgramCompleted,
        requiredExamCompleted,
        certificado_emprendedor,
        certificado_personal,
        currentPlanCode: planCode,
        previouslyCompletedPersonal: planCode === 'emprendedor' && !!examenPersonal
    });
}
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

    // 1. Get user's current plan
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
    if (!activeSubscription) {
        return NextResponse.json({ message: "No active subscription found." }, { status: 403 });
    }

    const planCode = activeSubscription.plan.code;

    // 2. Check if the user has completed all program resources for their specific plan
    const temaIdsForPlan = await prisma.tema.findMany({
        where: {
            tipo: planCode === 'emprendedor' ? 'EMPRENDEDOR' : 'PERSONAL'
        },
        select: { id: true }
    });
    const totalResourcesForPlan = await prisma.recurso.count({
        where: {
            temaId: {
                in: temaIdsForPlan.map(t => t.id)
            }
        }
    });

    const completedResourcesCount = await prisma.progresoRecurso.count({
        where: {
            usuarioId: userId,
            completado: true,
            recurso: {
                temaId: {
                    in: temaIdsForPlan.map(t => t.id)
                }
            }
        },
    });
    
    // This is the core logic: check if the user completed ALL resources for their plan.
    if (completedResourcesCount !== totalResourcesForPlan) {
        return NextResponse.json(
            { message: "You must complete all lessons before taking the exam." },
            { status: 400 }
        );
    }
    
    // 3. Fetch questions for the user's plan
    const examen = await prisma.examen.findFirst({
        where: { planCode: planCode },
        select: {
            id: true,
            planCode: true,
            preguntas: {
                select: {
                    id: true,
                    pregunta: true,
                    opciones: {
                        select: { id: true, texto: true }
                    }
                }
            }
        }
    });

    if (!examen) {
        return NextResponse.json({ message: "No exam found for your plan." }, { status: 404 });
    }

    return NextResponse.json(examen);
}
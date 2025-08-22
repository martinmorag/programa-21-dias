import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ isCompleted: false }, { status: 401 });
        }
        const userId = session.user.id;

        // 1. Find the user's active subscription and its plan
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
            return NextResponse.json({ isCompleted: false, error: 'Subscription not found or inactive.' }, { status: 403 });
        }
        
        const userPlanCode = userSubscription.plan.code;

        // 2. Count completed 'EMPRENDEDOR' resources
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

        let isCompleted = false;

        // 3. Conditional check based on the user's plan
        if (userPlanCode === 'emprendedor') {
            isCompleted = completedEmprendedorRecursos === totalEmprendedorRecursos;
        } else if (userPlanCode === 'emprendedorpersonal') {
            // Count completed 'PERSONAL' resources for this plan
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

            const isEmprendedorCompleted = completedEmprendedorRecursos === totalEmprendedorRecursos;
            const isPersonalCompleted = completedPersonalRecursos === totalPersonalRecursos;
            
            isCompleted = isEmprendedorCompleted && isPersonalCompleted;
        }

        return NextResponse.json({ isCompleted });
    } catch (error) {
        console.error("Error fetching completion status:", error);
        return NextResponse.json({ isCompleted: false, error: "An unexpected error occurred." }, { status: 500 });
    }
}
// app/api/examen/submit/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = session.user.id;

    const { respuestas } = await req.json(); // { [preguntaId]: opcionId }

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

    // 2. Fetch the correct answers for the exam
    const examen = await prisma.examen.findFirst({
        where: { planCode: planCode },
        select: {
            preguntas: {
                select: {
                    id: true,
                    respuestaCorrectaId: true,
                }
            }
        }
    });

    if (!examen) {
        return NextResponse.json({ message: "No exam found for your plan." }, { status: 404 });
    }

    // 3. Grade the exam
    let correctAnswers = 0;
    const totalQuestions = examen.preguntas.length;

    examen.preguntas.forEach(pregunta => {
        if (respuestas[pregunta.id] === pregunta.respuestaCorrectaId) {
            correctAnswers++;
        }
    });

    const score = (correctAnswers / totalQuestions) * 100;
    const passed = score >= 80;

    // 4. Record the user's exam attempt in the database
    // Fetch the plan ID to link the attempt
    const plan = await prisma.plan.findUnique({
        where: { code: planCode },
        select: { id: true }
    });

    if (!plan) {
        return NextResponse.json({ message: "Plan not found." }, { status: 404 });
    }

    await prisma.examenIntento.create({
        data: {
            usuarioId: userId,
            planId: plan.id,
            puntaje: score,
            aprobado: passed,
        },
    });

    return NextResponse.json({
        message: "Exam submitted successfully.",
        score,
        passed,
    });
}
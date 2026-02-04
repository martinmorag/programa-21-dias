import { PrismaClient, TipoTema } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

const prisma = new PrismaClient();

type TemaWhereClause = {
  tipo: TipoTema | { in: TipoTema[] };
};

export async function GET() {
  try {
    // 1. Get the authenticated user's session
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const userSubscription = await prisma.suscripcion.findFirst({
      where: {
        userId: userId,
        status: 'active',
        endDate: { gte: new Date() },
      },
      include: {
        plan: {
                include: {
                    clasesBonus: true, // Fetch the bonus classes associated with the plan
                },
            },
      },
      orderBy: { endDate: 'desc' },
    });

    if (!userSubscription || !userSubscription.plan) {
      return NextResponse.json({ error: 'Active subscription not found' }, { status: 403 });
    }

    const userPlanName = userSubscription.plan.code;

    // 3. Determine the themes to fetch based on the user's plan
    let whereClause: TemaWhereClause;
    if (userPlanName === 'emprendedor') {
      whereClause = { tipo: 'EMPRENDEDOR' };
    } else if (userPlanName === 'emprendedorpersonal') {
      whereClause = {
        tipo: {
          in: ['EMPRENDEDOR', 'PERSONAL'],
        },
      };
    } else {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 });
    }

    // 3. Fetch themes with nested resources and user-specific progress
    const temas = await prisma.tema.findMany({
      where: whereClause,
      orderBy: { orden: 'asc' },
      include: {
        recursos: {
          orderBy: { orden: 'asc' },
          include: {
            video: true, // Include the related video data
            preguntas: true, // Include the related questions data
            progreso: {
              where: { usuarioId: userId },
              select: { completado: true },
            },
          },
        },
      },
    });

    // 4. Process the data to calculate theme progress
    let personalCounter = 1;
    const temasConProgreso = temas.map(tema => {
      const totalRecursos = tema.recursos.length;
      const recursosCompletados = tema.recursos.filter(recurso =>
        recurso.progreso.length > 0 && recurso.progreso[0].completado
      ).length;

      const progresoGeneral = totalRecursos > 0
        ? Math.round((recursosCompletados / totalRecursos) * 100)
        : 0;

      const recursosLimpios = tema.recursos.map(recurso => ({
        ...recurso,
        completado: recurso.progreso.length > 0 ? recurso.progreso[0].completado : false,
        progreso: undefined,
      }));

      // Re-index the 'orden' property for 'PERSONAL' themes
      const displayOrder = tema.tipo === 'PERSONAL' ? personalCounter++ : tema.orden;

      return {
        ...tema,
        orden: displayOrder, // Use the new displayOrder
        progresoGeneral,
        recursos: recursosLimpios,
      };
    });

    const responseData = {
        temas: temasConProgreso,
        clasesBonus: userSubscription.plan.clasesBonus,
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error("Error fetching temas:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
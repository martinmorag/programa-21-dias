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

    const user = await prisma.usuarios.findUnique({
      where: { id: userId },
      select: { plan: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 2. Determine the themes to fetch based on the user's plan
    let whereClause: TemaWhereClause;
    if (user.plan === 'EMPRENDEDOR') {
      whereClause = { tipo: 'EMPRENDEDOR' };
    } else if (user.plan === 'EMPRENDEDOR_Y_PERSONAL') {
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
          include: {
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

    return NextResponse.json(temasConProgreso);

  } catch (error) {
    console.error("Error fetching temas:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
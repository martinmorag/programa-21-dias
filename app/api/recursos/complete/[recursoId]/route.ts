import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

const prisma = new PrismaClient();

type Props = Promise<{ recursoId: string }>;

export async function POST( req: NextRequest, params: { params: Props } ) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;
    const { recursoId } = await params.params;
    console.log(recursoId)

    // Check if the resource exists
    const recurso = await prisma.recurso.findUnique({
      where: { id: recursoId },
    });
    if (!recurso) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    // Upsert the ProgresoRecurso record
    const updatedProgress = await prisma.progresoRecurso.upsert({
      where: {
        usuarioId_recursoId: {
          usuarioId: userId,
          recursoId: recursoId,
        },
      },
      update: {
        completado: true,
        completadoEn: new Date(),
      },
      create: {
        usuarioId: userId,
        recursoId: recursoId,
        completado: true,
        completadoEn: new Date(),
      },
    });

    return NextResponse.json({
      message: 'Resource marked as complete',
      progress: updatedProgress,
    });
  } catch (error) {
    console.error("Error marking resource as complete:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;
    const { recursoId } = await request.json();

    if (!recursoId) {
      return NextResponse.json({ error: 'Recurso ID is required' }, { status: 400 });
    }

    // Use upsert to create or update the completion status
    const progreso = await prisma.progresoRecurso.upsert({
      where: {
        usuarioId_recursoId: {
          usuarioId: userId,
          recursoId: recursoId,
        },
      },
      update: {
        completado: true,
      },
      create: {
        usuarioId: userId,
        recursoId: recursoId,
        completado: true,
      },
    });

    return NextResponse.json({ success: true, progreso });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
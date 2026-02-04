import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

const prisma = new PrismaClient();

type Props = Promise<{ bonusId: string }>;

export async function GET(
    request: Request,
    { params }: { params: Props }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.id;
        const { bonusId } = await params;

        // Verify the user has an active subscription
        const userSubscription = await prisma.suscripcion.findFirst({
            where: {
                userId: userId,
                status: 'active',
                endDate: { gte: new Date() },
            },
        });

        if (!userSubscription) {
            return NextResponse.json({ error: 'Active subscription not found' }, { status: 403 });
        }

        // Fetch the specific bonus class by ID
        const bonusClass = await prisma.claseBonus.findUnique({
            where: { id: bonusId },
            select: {
                id: true,
                titulo: true,
                descripcion: true,
                linkVideo: true,
                orden: true
            },
        });

        if (!bonusClass) {
            return NextResponse.json({ error: 'Bonus class not found' }, { status: 404 });
        }

        return NextResponse.json(bonusClass);

    } catch (error) {
        console.error("Error fetching bonus class:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
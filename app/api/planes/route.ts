import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const planes = await prisma.plan.findMany({
      orderBy: { price: 'asc' }, // Order by price for a better user experience
    });

    return NextResponse.json(planes);
  } catch (error) {
    console.error("Error fetching plans:", error);
    return NextResponse.json({ error: 'Failed to fetch subscription plans' }, { status: 500 });
  }
}
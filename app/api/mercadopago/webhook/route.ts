import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { prisma } from '@/lib/prisma';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const paymentId = body.data?.id;

    if (!paymentId) {
      return NextResponse.json({ message: 'No payment ID provided' }, { status: 400 });
    }

    const payments = new Payment(client);
    const paymentDetails = await payments.get({ id: paymentId });

    if (paymentDetails.status === 'approved' && paymentDetails.external_reference) {
      const [planId, userId] = paymentDetails.external_reference.split('_');

      // Check if userId is a valid UUID before fetching
      if (userId && planId) {
        const plan = await prisma.plan.findUnique({ where: { id: planId } });

        if (plan) {
          const now = new Date();
          const endDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

          await prisma.suscripcion.create({
            data: {
              userId: userId,
              planId: plan.id,
              startDate: now,
              endDate: endDate,
              status: 'active',
            },
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
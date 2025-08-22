import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago'; // Import the new classes
import { getServerSession } from "next-auth";
import { authOptions } from '../../auth/[...nextauth]/authOptions';

// 1. Create a new instance of the Mercado Pago client
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }
    const userId = session.user.id;
    const { planName, price, planId } = await req.json();

    const preference = {
      items: [
        { id: planId, title: planName, unit_price: price, quantity: 1, },
      ],
      notification_url: `${process.env.NEXTAUTH_URL}/api/mercadopago/webhook`,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/suscripcion?estado=exito`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/suscripcion?estado=fallido`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/suscripcion?estado=pendiente`,
      },
      auto_return: 'approved' as const,
      external_reference: `${planId}_${userId}`,
    };

    const preferences = new Preference(client); // 2. Create a Preference instance with the client

    // 3. Use the preferences instance to create the preference
    const response = await preferences.create({ body: preference });
    
    return NextResponse.json({
      initPoint: response.init_point, // Use response.init_point directly
    });
  } catch (error) {
    console.error('Error creating Mercado Pago preference:', error);
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 });
  }
}
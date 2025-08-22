import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CheckoutClient from '@/ui/pagos/CheckoutClient';
import { Metadata } from "next";

export const metadata : Metadata = {
     title: "Pago",
     description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

type CheckoutPageProps = Promise<{ planId: string }>

export default async function CheckoutPage({ params }: {params: CheckoutPageProps}) {
  const { planId } =  await params;
  const plan = await prisma.plan.findUnique({
    where: {
      code: planId,
    },
  });

  if (!plan) {
    notFound();
  }

  return <CheckoutClient plan={plan} />;
}
import { prisma } from '@/lib/prisma';
import RegisterClient from '@/ui/auth/RegisterClient';
import LoadingSpinning from '@/ui/general/LoadingSpinning';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Registro",
  description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

type Props = Promise<{ planId: string }>

export default async function RegisterPage({ searchParams }: {searchParams: Props}) {
  const { planId }= await searchParams;

  // Check if planId is missing
  if (!planId) {
    return <p>Error: Plan no seleccionado. Por favor, vuelve a la página de planes.</p>;
  }

  // Fetch plan details from the database using the unique code
  const plan = await prisma.plan.findUnique({
    where: {
      code: planId,
    },
  });

  // If the plan code doesn't exist, return a 404
  if (!plan) {
    notFound();
  }
  
  return (
    <Suspense fallback={<LoadingSpinning />}>
      <RegisterClient plan={plan} />
    </Suspense>
  );
}
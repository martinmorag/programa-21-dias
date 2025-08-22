import LoadingSpinning from '@/ui/general/LoadingSpinning';
import SuscripcionClient from '@/ui/pagos/SuscripcionClient';
import { Suspense } from 'react';
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Suscripción",
  description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

export default function SuscripcionPage() {
  return (
    <Suspense fallback={<LoadingSpinning />}>
      <SuscripcionClient />
    </Suspense>
  );
}

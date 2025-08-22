import { Suspense } from 'react';
import LoadingSpinning from '@/ui/general/LoadingSpinning';
import RestablecerContrasenaContent from '@/ui/auth/RestablecerContrasenaContent';
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Restablece Contraseña",
  description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

export default function RestablecerContrasenaPage() {
  return (
    <Suspense fallback={<LoadingSpinning />}>
      <RestablecerContrasenaContent />
    </Suspense>
  );
}
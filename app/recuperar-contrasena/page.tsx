import RecuperarContrasena from "@/ui/email/RecuperarContrasena";
import { Metadata } from "next";

export const metadata : Metadata = {
     title: "Recuperar Contraseña",
     description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

export default function Page() {
  return <RecuperarContrasena />
}
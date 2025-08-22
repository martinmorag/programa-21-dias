import Contacto from "@/ui/email/Contacto";
import { Metadata } from "next";

export const metadata : Metadata = {
     title: "Contacto",
     description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

export default function Page() {
  return <Contacto />
}
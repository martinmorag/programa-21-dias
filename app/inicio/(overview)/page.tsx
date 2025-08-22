import Inicio from "@/ui/inicio/Inicio";
import { Metadata } from "next";

export const metadata : Metadata = {
     title: "Inicio",
     description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

export default function Page() {
  return <Inicio />
}
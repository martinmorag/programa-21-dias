import Examen from "@/ui/temas/Exam";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Examen",
    description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

export default function Page() {
  return <Examen />
}
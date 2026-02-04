import Planes from "@/ui/inicio/Planes";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Planes",
  description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

export default function Page() {
  return <Planes />
}
import { Metadata } from "next"
import Privacy from "@/ui/general/Privacy";

export const metadata : Metadata = {
  title: "Privacidad",
  description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

export default function Page() {
  return <Privacy />
}
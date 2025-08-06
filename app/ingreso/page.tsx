import SignIn from "@/ui/auth/SignIn";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Ingreso",
    description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

export default function Login() {
    return <SignIn />
}
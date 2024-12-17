import SignIn from "@/app/ui/auth/SignIn";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Ingreso",
    description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-[#0a0a0a] text-white items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <SignIn />
      </main>
    </div>
  );
}

import { poppins } from "@/lib/fonts"
import "./globals.css"
import Header from "@/ui/general/Header"
import { Providers } from "@/ui/auth/Providers"

import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Inicio",
    description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${poppins.className}`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
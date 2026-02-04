"use client";

import { poppins } from "@/lib/fonts"
import "./globals.css"
import Header from "@/ui/general/Header"
import { Providers } from "@/ui/auth/Providers"

import { usePathname } from "next/navigation";
import WhatsappButton from "@/ui/general/WhatsappButton";
import Footer from "@/ui/general/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  const shouldShowWhatsappButton = !pathname.includes('/contacto') && !pathname.match('/temas/');
    
  return (
    <html lang="es">
      <body className={`${poppins.className}`}>
        <Providers>
          <Header />
          {children}
          {shouldShowWhatsappButton && <WhatsappButton />}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
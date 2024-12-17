"use client";

import { poppins } from "@/app/lib/fonts";
import { SessionProvider } from 'next-auth/react';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <SessionProvider>
          <body
            className={`${poppins.className} antialiased`}
          >
            {children}
          </body>
        </SessionProvider>
    </html>
  );
}

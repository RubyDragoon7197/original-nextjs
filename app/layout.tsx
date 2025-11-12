import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}>
        {/* 🔹 Menú superior */}
        <nav className="bg-black p-4 flex gap-6 justify-center items-center text-white border-b border-zinc-800">
          <Link href="/original1" className="hover:underline font-semibold">
            Original 1
          </Link>
          <Link href="/original2" className="hover:underline font-semibold">
            Original 2
          </Link>
          <Link href="/original3" className="hover:underline font-semibold">
            Original 3
          </Link>
        </nav>

        {/* 🔹 Contenido principal */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}

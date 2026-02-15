import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { AnalyticsProvider } from "@/components/marketing/AnalyticsProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "SalesPulse | El Futuro de la Inteligencia de Ventas",
  description: "Deja de adivinar. Empieza a cerrar. SalesPulse usa IA para predecir tu próximo gran cierre con un 94% de precisión. El CRM avanzado para equipos de ingresos modernos.",
  keywords: ["inteligencia de ventas", "crm ia", "proyeccion de ingresos", "dashboard de ventas", "saas", "latam"],
  openGraph: {
    title: "SalesPulse | El Futuro de la Inteligencia de Ventas",
    description: "Deja de adivinar. Empieza a cerrar. Predicción de ventas con Inteligencia Artificial.",
    url: "https://salespulse.demo",
    siteName: "SalesPulse",
    images: [
      {
        url: "https://salespulse.demo/og-image.jpg", // Placeholder
        width: 1200,
        height: 630,
        alt: "Dashboard de SalesPulse",
      },
    ],
    locale: "es_LA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SalesPulse | Inteligencia de Ventas con IA",
    description: "Predice tu próximo cierre con precisión quirúrgica.",
    creator: "@salespulse",
  },
};

import { TelegramWidget } from "@/components/ui/TelegramWidget";
import { ElevenLabsWidget } from "@/components/ui/ElevenLabsWidget";
import { AccessibilityProvider } from "@/components/a11y/AccessibilityContext";
import { AccessibilityWidget } from "@/components/a11y/AccessibilityWidget";
import { KeyboardNavigation } from "@/components/a11y/KeyboardNavigation";
import { VoiceCommandNavigation } from "@/components/a11y/VoiceCommandNavigation";




// ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-950 text-slate-100 selection:bg-purple-500/30`}>
        <AccessibilityProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-bold focus:rounded-md transition-all">
            Saltar al contenido principal
          </a>

          <div id="main-content">
            <Suspense fallback={null}>
              <AnalyticsProvider />
            </Suspense>
            {children}
          </div>
          <TelegramWidget />
          <ElevenLabsWidget />
          <AccessibilityWidget />
          <KeyboardNavigation />
          <VoiceCommandNavigation />
        </AccessibilityProvider>
      </body>
    </html>
  );
}

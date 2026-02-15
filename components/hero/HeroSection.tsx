"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { DashboardMockup } from "./DashboardMockup"

import { Scene3D } from "@/components/3d/Scene3D"

export function HeroSection() {
    return (
        <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-background">
                <Scene3D />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium border rounded-full text-primary/80 border-primary/20 bg-primary/10 backdrop-blur-sm animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Nuevo: Análisis de Pipeline con IA
                </div>

                <h1 className="max-w-4xl mx-auto mb-6 text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 animate-fade-in-up md:text-7xl font-display">
                    Deja de Adivinar. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        Empieza a Cerrar.
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto mb-10 text-xl text-slate-400 animate-fade-in-up delay-100">
                    La única plataforma de inteligencia de ventas que predice tu próximo gran cierre con un 94% de precisión. Convierte datos en ingresos, al instante.
                </p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <Button
                        size="lg"
                        className="min-w-[200px] text-lg"
                        onClick={() => window.dispatchEvent(new CustomEvent("open-elevenlabs-widget"))}
                    >
                        Agendar Demo o Pedir Cotización
                    </Button>
                    <Button variant="outline" size="lg" className="min-w-[200px] text-lg">
                        Ver Video Tour
                    </Button>
                </motion.div>

                {/* Dashboard Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="mt-20"
                >
                    <DashboardMockup />
                </motion.div>
            </div>
        </section>
    )
}

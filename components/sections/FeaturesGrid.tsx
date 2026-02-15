"use client"

import { Card } from "@/components/ui/Card"
import { motion } from "framer-motion"
import { BrainCircuit, Globe2, BarChart3, LockKeyhole, Zap } from "lucide-react"

export function FeaturesGrid() {
    return (
        <section className="py-24 bg-[#0B0F19] relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
                        Todo lo que necesitas para <br />
                        <span className="text-gradient-primary">escalar sin caos</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]">
                    {/* Main Feature: AI Scoring */}
                    <Card className="col-span-1 md:col-span-2 row-span-2 bg-slate-900/50 border-primary/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="p-8 h-full flex flex-col z-10 relative">
                            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-6">
                                <BrainCircuit className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Predicción de Cierre</h3>
                            <p className="text-slate-400 mb-6">
                                Nuestro algoritmo analiza más de 50 puntos de datos históricos para calcular la probabilidad real de cierre, eliminando el sesgo humano.
                            </p>
                            <div className="mt-auto relative w-full h-48 bg-slate-950/50 rounded-lg border border-white/5 overflow-hidden p-4">
                                {/* Abstract UI representation */}
                                <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
                                    <span>Deal: Expansión Enterprise</span>
                                    <span className="text-emerald-500 font-bold">92% Probabilidad</span>
                                </div>
                                <div className="w-full bg-slate-800 h-2 rounded-full mb-4">
                                    <div className="bg-emerald-500 h-2 rounded-full w-[92%]" />
                                </div>
                                <div className="space-y-2">
                                    <div className="w-full h-8 bg-slate-800/50 rounded animate-pulse" />
                                    <div className="w-2/3 h-8 bg-slate-800/30 rounded animate-pulse delay-75" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Secondary Feature: Geo Analysis */}
                    <Card className="col-span-1 md:col-span-1 row-span-1 bg-slate-900/50 border-accent-cyan/20 group hover:border-accent-cyan/40 transition-colors">
                        <div className="p-6 h-full flex flex-col">
                            <Globe2 className="w-10 h-10 text-accent-cyan mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Dominio LatAm</h3>
                            <p className="text-sm text-slate-400">
                                Soporte nativo para monedas locales y estructuras regionales complejas.
                            </p>
                        </div>
                    </Card>

                    {/* Feature: Real Time */}
                    <Card className="col-span-1 md:col-span-1 row-span-1 bg-slate-900/50 border-purple-500/20 group hover:border-purple-500/40 transition-colors">
                        <div className="p-6 h-full flex flex-col">
                            <Zap className="w-10 h-10 text-purple-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Verdad en Tiempo Real</h3>
                            <p className="text-sm text-slate-400">
                                Cambios en el CRM se reflejan instantáneamente en tus proyecciones.
                            </p>
                        </div>
                    </Card>

                    {/* Feature: Security */}
                    <Card className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-slate-900/50 border-white/10 group">
                        <div className="p-6 h-full flex flex-row items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                                <LockKeyhole className="w-8 h-8 text-slate-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Blindaje Corporativo</h3>
                                <p className="text-sm text-slate-400">
                                    SOC2 Compliant, encriptación end-to-end y control de accesos granular basado en roles. Tus datos financieros están blindados.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}

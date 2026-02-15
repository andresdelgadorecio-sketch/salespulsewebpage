"use client"

import { motion } from "framer-motion"
import { XCircle, CheckCircle, ArrowRight } from "lucide-react"

export function ProblemSolution() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
                        Excel está matando tu Forecast
                    </h2>
                    <p className="text-lg text-slate-400">
                        El 60% de los líderes de ventas admiten que sus proyecciones son "pura intuición".
                        ¿Cuánto dinero estás dejando en la mesa por falta de visibilidad?
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center justify-center">
                    {/* The Problem Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 w-full relative p-1 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/5"
                    >
                        <div className="bg-slate-900/90 rounded-xl p-8 h-full border border-red-500/20 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-full bg-red-500/10 text-red-500">
                                    <XCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">El Caos Actual</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Tu equipo pierde 20h/semana en 'Data Entry'",
                                    "Tu Board no confía en tus números",
                                    "Sorpresas desagradables a fin de trimestre",
                                    "Guerra fría entre Ventas y Operaciones"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-400">
                                        <XCircle className="w-5 h-5 text-red-500/50 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Arrow visual connection (Desktop only) */}
                    <div className="hidden md:flex justify-center text-slate-600 shrink-0">
                        <ArrowRight className="w-12 h-12" />
                    </div>

                    {/* The Solution Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 w-full relative p-1 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]"
                    >
                        <div className="bg-slate-900/90 rounded-xl p-8 h-full border border-emerald-500/20 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">La Verdad en SalesPulse</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Una sola fuente de verdad, actualizada al segundo",
                                    "Predicciones que tu CFO amará",
                                    "Control total del Pipeline desde tu celular",
                                    "Ventas vende, nosotros sumamos"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

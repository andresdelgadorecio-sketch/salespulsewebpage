"use client"

import { CheckCircle2, Zap, Crown, Target, Activity, Lock } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { motion } from "framer-motion"
import { useEffect } from "react"

// IDs de variantes placeholder - Reemplazar con los reales de Lemon Squeezy
const VARIANT_IDS = {
    FRANCOTIRADOR: "123456",
    TRACCION: "234567",
    SOBERANIA: "345678"
}

export function Pricing() {
    useEffect(() => {
        // Inicializar el script de LS
        if (!(window as any).createLemonSqueezy) {
            const script = document.createElement('script');
            script.src = "https://app.lemonsqueezy.com/js/lemon.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const getCheckoutUrl = (variantId: string) => {
        // En producción, obtener el userId real del contexto de autenticación
        const userId = "USER_ID_PLACEHOLDER";
        return `https://salespulse.lemonsqueezy.com/checkout/buy/${variantId}?embed=1&checkout[custom][user_id]=${userId}`;
    }

    return (
        <section id="pricing" className="py-24 bg-[#020617] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
                        DOMINIO DEL MERCADO
                    </h2>
                    <p className="text-lg text-slate-400">
                        Elige tu nivel de impacto.
                        <span className="text-primary font-bold"> Desde precisión individual hasta dominación corporativa.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">

                    {/* NIVEL 1: FRANCOTIRADOR */}
                    <Card className="bg-slate-900/80 border-slate-700 p-8 relative hover:border-blue-400/50 transition-all duration-300 flex flex-col group">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                        <div className="mb-6 relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="w-5 h-5 text-blue-400" />
                                <h3 className="text-xl font-bold text-slate-200 tracking-wider">FRANCOTIRADOR</h3>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white">$49</span>
                                <span className="text-slate-500">/mes</span>
                            </div>
                            <p className="text-sm text-blue-200/80 mt-2 font-medium">Closers de Alto Rendimiento y Freelancers.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1 relative z-10">
                            {[
                                "Análisis Táctico de 15 Leads/mes",
                                "Predictor Quirúrgico (1-100%)",
                                "Radar de \"Ventana de Cierre\"",
                                "Gestión de Pipeline Personal",
                                "Acceso Móvil"
                            ].map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-auto relative z-10">
                            <a href={getCheckoutUrl(VARIANT_IDS.FRANCOTIRADOR)} className="lemonsqueezy-button block w-full">
                                <Button variant="outline" className="w-full border-blue-500/30 text-blue-100 hover:bg-blue-950/50 hover:text-white hover:border-blue-400">
                                    Activar mi Puntería
                                </Button>
                            </a>
                            <p className="text-xs text-center text-slate-500 mt-3 italic">Empieza a cerrar hoy mismo.</p>
                        </div>
                    </Card>

                    {/* NIVEL 2: TRACCIÓN ÉLITE (MÁS RECOMENDADO) */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative flex flex-col"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 rounded-2xl blur-md opacity-75 animate-pulse" />

                        <Card className="bg-[#0B0F19] border-purple-500/50 p-8 relative z-10 h-full transform shadow-2xl flex flex-col">
                            <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-fuchsia-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-lg">
                                MÁS RECOMENDADO
                            </div>
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity className="w-5 h-5 text-fuchsia-400" />
                                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 tracking-wider">TRACCIÓN ÉLITE</h3>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-white">$149</span>
                                    <span className="text-slate-500">/mes</span>
                                </div>
                                <p className="text-sm text-purple-200/80 mt-2 font-medium">Equipos de Ventas (Hasta 5 Asientos).</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-start gap-3 text-sm text-white font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" />
                                    <span>Todo lo incluido en Francotirador, más:</span>
                                </li>
                                {[
                                    "Dashboard de Comando Grupal",
                                    "Sincronización Neural (Slack/Telegram)",
                                    "Reportes de Fiabilidad del 94%",
                                    "Análisis de Performance por Agente",
                                    "5 Asientos Incluidos"
                                ].map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-200">
                                        <CheckCircle2 className="w-5 h-5 text-fuchsia-500 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto">
                                <a href={getCheckoutUrl(VARIANT_IDS.TRACCION)} className="lemonsqueezy-button block w-full">
                                    <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all border-0">
                                        Dominar mi Mercado al 94%
                                    </Button>
                                </a>
                                <p className="text-xs text-center text-purple-300/60 mt-3 italic">Prueba de 7 días sin riesgo. Resultados inmediatos.</p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* NIVEL 3: SOBERANÍA */}
                    <Card className="bg-black/90 border-yellow-500/20 p-8 relative hover:border-yellow-500/40 transition-all duration-300 flex flex-col group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
                        <div className="mb-6 relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Crown className="w-5 h-5 text-yellow-500" />
                                <h3 className="text-xl font-bold text-yellow-500 tracking-wider">SOBERANÍA</h3>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white">$449</span>
                                <span className="text-slate-500">/mes</span>
                            </div>
                            <p className="text-sm text-yellow-500/70 mt-2 font-medium">Scale-ups, Corporativos u Agencias.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1 relative z-10">
                            {[
                                "API Ilimitada \"God Mode\"",
                                "Sincronización Bidireccional Total",
                                "IA Entrenada con TU Data",
                                "Soporte Prioritario \"Línea Roja\"",
                                "Onboarding de Alta Precisión"
                            ].map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                                    <Lock className="w-5 h-5 text-yellow-600/80 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-auto relative z-10">
                            <a href={getCheckoutUrl(VARIANT_IDS.SOBERANIA)} className="lemonsqueezy-button block w-full">
                                <Button variant="outline" className="w-full border-yellow-500/30 text-yellow-100 hover:bg-yellow-950/30 hover:text-yellow-50 hover:border-yellow-500/60">
                                    Solicitar Acceso Exclusivo
                                </Button>
                            </a>
                            <p className="text-xs text-center text-slate-500 mt-3 italic">Solo para organizaciones que escalan en serio.</p>
                        </div>
                    </Card>

                </div>
            </div>
        </section>
    )
}

"use client"

import { Card } from "@/components/ui/Card"
import { Quote, TrendingUp, Clock, DollarSign, Star } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const stories = [
    {
        name: "Carlos Rivera",
        role: "Closer de Elite (High-Ticket)",
        revenueChange: "$8k -> $50k/mes",
        quote: "No necesitaba más leads, necesitaba dejar de hablar con gente sin dinero.",
        story: "Pasaba 10 horas al día en Zoom intentando convencer a prospectos 'fríos'. Me sentía quemado y mi calendario era un caos. SalesPulse identificó el patrón de comportamiento de mi top 1% de clientes. Ahora trabajo 3 horas al día y mi tasa de cierre se triplicó.",
        metric: "310% Aumento en Comisiones",
        icon: DollarSign,
        image: "/testimonials/carlos.png"
    },
    {
        name: "Elena Vudis",
        role: "VP de Ventas SaaS",
        revenueChange: "$250k -> $1M/mes",
        quote: "Mi equipo estaba persiguiendo fantasmas. SalesPulse limpió la basura.",
        story: "Tenía a 12 vendedores desmotivados persiguiendo un pipeline inflado. La IA de SalesPulse audió 6 meses de data y nos dijo: 'Olviden el 80% de estos deals'. Nos enfocamos solo en los ganadores. Cerramos nuestro primer millón en 30 días.",
        metric: "4x Ingresos Recurrentes (ARR)",
        icon: TrendingUp,
        image: "/testimonials/elena.png"
    },
    {
        name: "Roberto Méndez",
        role: "Real Estate de Lujo",
        revenueChange: "6 Meses -> 3 Semanas (Ciclo)",
        quote: "Dejé de hacer tours para 'turistas'. Ahora solo abro la puerta para firmar.",
        story: "En Real Estate de $5M+, el tiempo es oro. Antes hacía 20 visitas para una venta. SalesPulse predijo qué inversionista estaba listo para comprar basado en señales que yo ignoraba. Ahorré meses de prospección inútil.",
        metric: "94% Precisión en Scouting",
        icon: Clock,
        image: "/testimonials/roberto.png"
    },
    {
        name: "Ana Solares",
        role: "Fundadora Agencia Digital",
        revenueChange: "Burnout -> Escala 300%",
        quote: "Estaba a punto de cerrar la agencia por agotamiento. La IA me salvó.",
        story: "Vivía apagando fuegos con clientes pequeños que pagaban poco y exigían mucho. SalesPulse analizó mi base y me mostró quiénes eran los clientes 'VIP silenciosos'. Despedí al 50% de mis clientes y tripliqué la facturación con los restantes.",
        metric: "300% Margen Neto",
        icon: Star,
        image: "/testimonials/ana.png"
    },
    {
        name: "David Chen",
        role: "Gerente Enterprise B2B",
        revenueChange: "Ciclo 180 días -> 45 días",
        quote: "Tener SalesPulse es como jugar al ajedrez sabiendo los movimientos del oponente.",
        story: "Nuestros ciclos de venta B2B eran eternos. La priorización algorítmica nos permitió detectar el 'momento de verdad' de cada corporativo. Empezamos a golpear cuando la puerta estaba abierta, no antes ni después. Velocidad quirúrgica.",
        metric: "-75% Duración del Ciclo",
        icon: TrendingUp,
        image: "/testimonials/david.png"
    }
]

export function SuccessStories() {
    return (
        <section className="py-24 bg-[#050A14] relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
            <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
                        No es Magia. Es la <span className="text-emerald-500">Doctrina del 94%.</span>
                    </h2>
                    <p className="text-lg text-slate-400">
                        Historias reales de profesionales que dejaron de adivinar y empezaron a dominar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map((story, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={i === 0 || i === 1 ? "lg:col-span-1" : i === 3 ? "lg:col-span-2" : "lg:col-span-1"}
                        >
                            <Card className="h-full bg-slate-900/40 border-white/5 p-8 hover:bg-slate-900/60 transition-colors group relative overflow-hidden flex flex-col">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Quote className="w-20 h-20 text-white" />
                                </div>

                                <div className="relative z-10 flex-1">
                                    <div className="flex items-center gap-2 mb-6 text-emerald-500 font-bold text-sm tracking-wider uppercase">
                                        <story.icon className="w-4 h-4" />
                                        {story.metric}
                                    </div>

                                    {/* Profile Header */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                                            <Image
                                                src={story.image}
                                                alt={story.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-0.5">{story.name}</h3>
                                            <p className="text-sm text-slate-500">{story.role}</p>
                                        </div>
                                    </div>

                                    <div className="text-xs font-mono text-primary/80 mb-6 bg-primary/10 inline-block px-2 py-1 rounded">
                                        {story.revenueChange}
                                    </div>

                                    <p className="text-slate-300 italic mb-6 text-lg font-light leading-relaxed">
                                        "{story.quote}"
                                    </p>

                                    <p className="text-sm text-slate-400 leading-relaxed border-l-2 border-white/10 pl-4">
                                        {story.story}
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

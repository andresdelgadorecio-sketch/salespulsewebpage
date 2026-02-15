"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Check, X, AlertTriangle, ArrowRight, Zap, Target, Activity, LayoutDashboard, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

export function ComparisonSection() {
    return (
        <section id="comparison" className="py-24 bg-[#030617] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
                            Sales Pulse vs <span className="text-gradient-primary">otras soluciones del mercado</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            Elegir una herramienta de forecast no se trata de quién tiene más dashboards.
                            Se trata de: <strong>¿te ayuda a llegar al número... o solo te explica por qué no llegaste?</strong>
                        </p>
                    </motion.div>
                </div>

                {/* Quick Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    <SummaryCard
                        icon={<Zap className="w-6 h-6 text-primary" />}
                        title="Sales Pulse"
                        description="Detecta riesgos reales, alerta concentración y entrega un plan semanal automático."
                        highlight={true}
                    />
                    <SummaryCard
                        icon={<LayoutDashboard className="w-6 h-6 text-slate-400" />}
                        title="CRM Tradicional"
                        description="Registra y muestra forecast básico. Depende 100% de la disciplina humana."
                    />
                    <SummaryCard
                        icon={<Activity className="w-6 h-6 text-slate-400" />}
                        title="Revenue Intelligence"
                        description="Potente, pero suele ser más pesado y menos enfocado en la 'agenda ejecutable'."
                    />
                    <SummaryCard
                        icon={<Brain className="w-6 h-6 text-slate-400" />}
                        title="Conversation Intel"
                        description="Excelente señal desde llamadas, pero no cubre el riesgo operativo completo."
                    />
                    <SummaryCard
                        icon={<Target className="w-6 h-6 text-slate-400" />}
                        title="BI (Power BI/Tableau)"
                        description="Reporting puro. Te dice qué pasó, no es un motor de ejecución."
                    />
                </div>

                {/* Comparison Table */}
                <div className="mb-24 overflow-x-auto">
                    <div className="min-w-[800px] bg-slate-900/50 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="p-6 text-slate-300 font-semibold w-1/4">Capacidades Críticas</th>
                                    <th className="p-6 text-primary font-bold w-1/6 bg-primary/5">Sales Pulse</th>
                                    <th className="p-6 text-slate-400 font-semibold w-1/6">CRM</th>
                                    <th className="p-6 text-slate-400 font-semibold w-1/6">RevIntel</th>
                                    <th className="p-6 text-slate-400 font-semibold w-1/6">Conv Intel</th>
                                    <th className="p-6 text-slate-400 font-semibold w-1/6">BI</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <TableRow
                                    label="Detección automática de 'negocios zombis'"
                                    sp={<CheckIcon />}
                                    crm={<WarningIcon />}
                                    ri={<CheckIcon />}
                                    ci={<CheckIcon />}
                                    bi={<WarningIcon />}
                                />
                                <TableRow
                                    label="Riesgo financiero: alto valor + baja probabilidad"
                                    sp={<CheckIcon />}
                                    crm={<WarningIcon />}
                                    ri={<CheckIcon />}
                                    ci={<WarningIcon />}
                                    bi={<WarningIcon />}
                                />
                                <TableRow
                                    label="Riesgo administrativo: 'ganado sin PO'"
                                    sp={<CheckIcon label="Nativo" />}
                                    crm={<CrossIcon label="Depende setup" />}
                                    ri={<WarningIcon />}
                                    ci={<CrossIcon />}
                                    bi={<WarningIcon />}
                                />
                                <TableRow
                                    label="Radar de concentración (1 deal >60% de meta)"
                                    sp={<CheckIcon label="Alerta explícita" />}
                                    crm={<WarningIcon />}
                                    ri={<WarningIcon />}
                                    ci={<CrossIcon />}
                                    bi={<WarningIcon />}
                                />
                                <TableRow
                                    label="Plan semanal automático"
                                    sp={<CheckIcon label="Diferenciador" />}
                                    crm={<CrossIcon />}
                                    ri={<WarningIcon label="Recomendaciones" />}
                                    ci={<WarningIcon label="Coaching" />}
                                    bi={<CrossIcon />}
                                />
                                <TableRow
                                    label="Gap vs AOP en tiempo real"
                                    sp={<CheckIcon label="Nativo" />}
                                    crm={<WarningIcon />}
                                    ri={<CheckIcon />}
                                    ci={<WarningIcon />}
                                    bi={<CheckIcon label="Con modelado" />}
                                />
                                <TableRow
                                    label="Implementación rápida y operativa"
                                    sp={<CheckIcon />}
                                    crm={<CheckIcon />}
                                    ri={<WarningIcon />}
                                    ci={<WarningIcon />}
                                    bi={<WarningIcon />}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Real Cases Grid */}
                <div>
                    <h3 className="text-3xl font-bold text-white mb-10 text-center">Comparación por casos reales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <CaseCard
                            title="Caso 1: “Mi pipeline suma la meta... pero me da ansiedad”"
                            problem="El número está inflado o maquillado."
                            solution="Sales Pulse identifica qué oportunidades distorsionan el forecast (stalled, alto valor/baja prob) y te muestra el riesgo antes de que sea tarde."
                        />
                        <CaseCard
                            title="Caso 2: “El mes depende de un solo deal”"
                            problem="Tienes lotería, no forecast."
                            solution="Activamos la alerta de concentración cuando una oportunidad representa >60% de la meta y empujamos diversificación."
                        />
                        <CaseCard
                            title="Caso 3: “No sé en qué enfocar al equipo esta semana”"
                            problem="Parálisis de ejecución."
                            solution="Generamos un plan semanal automático: Lunes limpiar riesgos, Jueves empujar oportunidades Best Case, Viernes cerrar lo administrativo."
                        />
                        <CaseCard
                            title="Caso 4: “Ventas celebra... Finanzas está furioso”"
                            problem="Desconexión con la meta anual (AOP)."
                            solution="Calculamos Gap vs AOP en tiempo real y clasificamos: On-track, At-risk o Behind. Verdad única para todos."
                        />
                    </div>
                </div>

                {/* FAQ Style Accordion for "When to choose" could be added here, but maybe text blocks are enough */}
                <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-br from-primary/20 to-purple-900/20 rounded-2xl p-8 md:p-12 border border-white/10 text-center">
                    <h3 className="text-2xl font-bold text-white mb-6">¿Cuándo elegir Sales Pulse?</h3>
                    <div className="flex flex-wrap justify-center gap-4 text-left">
                        <BenefitPill text="Forecast defendible" />
                        <BenefitPill text="Alertas por riesgo real" />
                        <BenefitPill text="Evitar dependencia de 'mega-deals'" />
                        <BenefitPill text="Agenda semanal de ejecución" />
                        <BenefitPill text="Alineación con Finanzas (AOP)" />
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent("open-elevenlabs-widget"))}
                            className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-full text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
                        >
                            Agendar Demo o Pedir Cotización <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

function SummaryCard({ icon, title, description, highlight = false }: { icon: React.ReactNode, title: string, description: string, highlight?: boolean }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={cn(
                "p-6 rounded-xl border transition-colors",
                highlight
                    ? "bg-primary/10 border-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                    : "bg-slate-900/50 border-white/5 hover:border-white/10"
            )}
        >
            <div className="mb-4">{icon}</div>
            <h4 className={cn("text-lg font-bold mb-2", highlight ? "text-white" : "text-slate-200")}>{title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </motion.div>
    )
}

function TableRow({ label, sp, crm, ri, ci, bi }: { label: string, sp: React.ReactNode, crm: React.ReactNode, ri: React.ReactNode, ci: React.ReactNode, bi: React.ReactNode }) {
    return (
        <tr className="hover:bg-white/5 transition-colors">
            <td className="p-6 text-slate-300 font-medium border-r border-white/5">{label}</td>
            <td className="p-6 text-white bg-primary/5 border-r border-primary/10 relative">
                {sp}
                <div className="absolute inset-y-0 -left-px w-px bg-primary/20" />
                <div className="absolute inset-y-0 -right-px w-px bg-primary/20" />
            </td>
            <td className="p-6 border-r border-white/5">{crm}</td>
            <td className="p-6 border-r border-white/5">{ri}</td>
            <td className="p-6 border-r border-white/5">{ci}</td>
            <td className="p-6">{bi}</td>
        </tr>
    )
}

function CheckIcon({ label }: { label?: string }) {
    return (
        <div className="flex flex-col items-center gap-1">
            <Check className="w-6 h-6 text-emerald-400" />
            {label && <span className="text-xs text-emerald-400/80 font-medium text-center">{label}</span>}
        </div>
    )
}

function WarningIcon({ label }: { label?: string }) {
    return (
        <div className="flex flex-col items-center gap-1">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            {label && <span className="text-xs text-amber-400/80 font-medium text-center">{label}</span>}
        </div>
    )
}

function CrossIcon({ label }: { label?: string }) {
    return (
        <div className="flex flex-col items-center gap-1">
            <X className="w-5 h-5 text-slate-600" />
            {label && <span className="text-xs text-slate-500 font-medium text-center">{label}</span>}
        </div>
    )
}

function CaseCard({ title, problem, solution }: { title: string, problem: string, solution: string }) {
    return (
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-primary/30 transition-colors group">
            <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold">
                    <Brain className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{title}</h4>
                </div>
            </div>

            <div className="space-y-4 pl-14">
                <div>
                    <p className="text-xs text-rose-400 uppercase font-bold tracking-wider mb-1">Problema Real</p>
                    <p className="text-slate-400">{problem}</p>
                </div>
                <div>
                    <p className="text-xs text-emerald-400 uppercase font-bold tracking-wider mb-1">Solución Sales Pulse</p>
                    <p className="text-slate-200">{solution}</p>
                </div>
            </div>
        </div>
    )
}

function BenefitPill({ text }: { text: string }) {
    return (
        <span className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium border border-white/10">
            {text}
        </span>
    )
}

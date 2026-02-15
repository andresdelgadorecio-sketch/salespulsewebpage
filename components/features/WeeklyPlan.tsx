"use client"

import { Card } from "@/components/ui/Card"
import { Calendar, Clock, ChevronRight, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export function WeeklyPlan() {
    const schedule = [
        { day: "Lunes", focus: "Colombia", activity: "Revisión de Pipeline", time: "09:00 AM", status: "completed" },
        { day: "Martes", focus: "Perú", activity: "Forecast Semanal", time: "10:30 AM", status: "active" },
        { day: "Miércoles", focus: "Ecuador", activity: "Comité de Riesgos", time: "02:00 PM", status: "pending" },
        { day: "Jueves", focus: "Regional", activity: "Cierre de Oportunidades", time: "11:00 AM", status: "pending" },
        { day: "Viernes", focus: "Admin", activity: "Planificación Siguiente Semana", time: "09:00 AM", status: "pending" },
    ]

    return (
        <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="space-y-8">
                <div>
                    <h2 className="font-heading text-3xl font-bold md:text-5xl text-white mb-6">
                        Tu Reunión Semanal, <span className="text-gradient-primary">en Autopiloto</span>
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Deja de micro-gestionar. Sales Pulse prepara la agenda, destaca los riesgos y te dice exactamente dónde enfocar tu energía. Recupera tus domingos.
                    </p>
                </div>

                <ul className="space-y-4">
                    {[
                        "Sincronización automática con calendarios (Google/Outlook)",
                        "Recordatorios inteligentes de seguimiento de deals",
                        "Bloques de tiempo sugeridos para 'Deep Work'"
                    ].map((item, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 group"
                        >
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors">
                                <ChevronRight className="h-4 w-4" />
                            </div>
                            <span className="text-slate-300 font-medium">{item}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* Right Widget */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <Card className="bg-slate-900/60 border-primary/10 backdrop-blur-xl relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded text-primary">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-white tracking-wide">SEMANA ACTUAL</span>
                        </div>
                        <span className="text-xs font-mono text-slate-500">KW-42</span>
                    </div>

                    <div className="p-6 space-y-6 relative">
                        {/* Timeline Line */}
                        <div className="absolute left-[2.25rem] top-8 bottom-8 w-px bg-slate-800" />

                        {schedule.map((item, i) => (
                            <div key={item.day} className="relative flex items-start gap-6 group">
                                {/* Timeline Dot */}
                                <div className={`w-3 h-3 rounded-full mt-2 shrink-0 z-10 border-2 ${item.status === 'completed' ? 'bg-emerald-500 border-emerald-500' :
                                    item.status === 'active' ? 'bg-primary border-primary animate-pulse' :
                                        'bg-slate-900 border-slate-700'
                                    }`} />

                                <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all cursor-default">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-sm font-bold text-white">{item.day}</span>
                                        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-slate-800 text-slate-500'
                                            }`}>
                                            {item.time}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-slate-300 text-sm font-medium mb-1">{item.activity}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-slate-500">Foco:</span>
                                                <span className="text-xs text-primary font-bold">{item.focus}</span>
                                            </div>
                                        </div>

                                        {item.status === 'completed' && (
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}

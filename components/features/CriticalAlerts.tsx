"use client"

import { Card } from "@/components/ui/Card"
import { AlertOctagon, ArrowUpRight } from "lucide-react"

export function CriticalAlerts() {
    return (
        <Card className="h-full bg-slate-900/50 hover:bg-slate-900/80 transition-all border-l-4 border-l-red-500 group relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-500/5 blur-3xl group-hover:bg-red-500/10 transition-all" />

            <div className="mb-6 flex justify-between items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform">
                    <AlertOctagon className="h-6 w-6" />
                </div>
                <div className="px-2 py-1 bg-red-500/10 rounded text-[10px] font-bold text-red-500 animate-pulse">
                    2 CRÍTICOS
                </div>
            </div>

            <h3 className="mb-2 text-xl font-bold font-heading text-white group-hover:text-red-400 transition-colors">
                Riesgo de Pipeline
            </h3>
            <p className="mb-6 text-sm text-slate-400">
                Oportunidades estancadas que requieren atención inmediata.
            </p>

            <div className="space-y-3">
                <div className="group/item flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-colors cursor-pointer">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover/item:text-red-400 transition-colors">Spectra Ingeniería</span>
                        <span className="text-[10px] text-red-300/70">Sin actividad: 15 días</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-red-500 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                </div>

                <div className="group/item flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-orange-400/30 hover:bg-orange-400/5 transition-colors cursor-pointer">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-300 group-hover/item:text-orange-400 transition-colors">Saltex Corp</span>
                        <span className="text-[10px] text-slate-500">Déficit vs Meta</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-orange-400 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                </div>
            </div>
        </Card>
    )
}

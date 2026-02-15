import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, AlertTriangle } from "lucide-react"
import { SalesChart3D } from "@/components/3d/SalesChart3D"

export function DashboardMockup() {
    return (
        <div className="relative mx-auto w-full max-w-5xl rounded-xl border border-white/10 bg-[#0f172a]/50 p-2 shadow-2xl backdrop-blur-xl lg:rounded-2xl lg:p-4">
            {/* Window Controls */}
            <div className="mb-4 flex items-center gap-2 px-2">
                <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>

            {/* Dashboard Grid */}
            <div className="grid gap-4 md:grid-cols-4">
                {/* Column 1: Ventas */}
                <div className="col-span-1 space-y-4">
                    <Card className="border-l-4 border-l-accent-emerald bg-slate-900/80 p-4">
                        <h3 className="text-xs font-semibold text-slate-400">VENTAS TOTALES</h3>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl font-bold font-heading text-white">$1.2M</span>
                            <span className="text-xs text-accent-emerald flex items-center">
                                <ArrowUpRight className="h-3 w-3 mr-1" /> +12%
                            </span>
                        </div>
                    </Card>
                    <Card className="bg-slate-900/80 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-semibold text-slate-400">TOP PERFORMANCE</h3>
                            <MoreHorizontal className="h-4 w-4 text-slate-500" />
                        </div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-slate-800" />
                                    <div>
                                        <div className="h-2 w-20 rounded bg-slate-700" />
                                        <div className="mt-1 h-1.5 w-12 rounded bg-slate-800" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Column 2: Forecast Ponderado */}
                <div className="col-span-2">
                    <Card className="h-full bg-slate-900/80 p-5 relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ActivityIcon className="h-24 w-24 text-primary" />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-300 mb-4">FORECAST PONDERADO (AI)</h3>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold font-heading text-white">$3.4M</span>
                            <Badge variant="success" className="mb-2">On Track</Badge>
                        </div>

                        {/* 3D Chart Integration */}
                        <div className="flex-1 w-full min-h-[160px] relative z-10">
                            <SalesChart3D />
                        </div>
                    </Card>
                </div>

                {/* Column 3: Alertas */}
                <div className="col-span-1">
                    <Card className="h-full bg-slate-900/80 p-4 border-red-500/20">
                        <h3 className="text-xs font-semibold text-accent-rose mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            ALERTAS CRÍTICAS
                        </h3>
                        <div className="space-y-3">
                            {["Spectra Ing.", "Saltex Corp", "Tech Solutions"].map((company, i) => (
                                <div key={i} className="rounded bg-red-500/5 p-2 py-3 border border-red-500/10 hover:bg-red-500/10 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-medium text-slate-300">{company}</span>
                                        <span className="text-[10px] text-accent-rose">Riesgo Alto</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-accent-rose h-full rounded-full" style={{ width: `${30 + i * 10}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function ActivityIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}

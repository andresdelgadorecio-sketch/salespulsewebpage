import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { CheckCircle2, TrendingUp } from "lucide-react"

export function WeightedForecast() {
    return (
        <Card className="h-full bg-slate-900/50 hover:bg-slate-900/80 transition-all border-l-4 border-l-primary group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary group-hover:bg-primary/30 group-hover:scale-110 transition-all">
                <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold font-heading text-white group-hover:text-primary transition-colors">
                Forecast Ponderado Realista
            </h3>
            <p className="mb-4 text-sm text-slate-400">
                Olvídate del optimismo infundado. Nuestra IA calcula el forecast basado en:
            </p>
            <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-2">
                    <Badge variant="success">Win %</Badge>
                    <span className="text-sm text-slate-300">Probabilidad histórica de cierre</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-2">
                    <Badge variant="warning">Go %</Badge>
                    <span className="text-sm text-slate-300">Probabilidad de que el proyecto suceda</span>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-accent-emerald" />
                Elimina el "bloat" de tu pipeline
            </div>
        </Card>
    )
}

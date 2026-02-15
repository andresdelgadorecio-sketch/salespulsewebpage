import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Map, ArrowRight } from "lucide-react"

export function GeoAnalysis() {
    return (
        <Card className="h-full bg-slate-900/50 hover:bg-slate-900/80 transition-all border-l-4 border-l-accent-cyan group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-cyan/20 text-accent-cyan group-hover:bg-accent-cyan/30 group-hover:scale-110 transition-all">
                <Map className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold font-heading text-white group-hover:text-accent-cyan transition-colors">
                Análisis Geográfico LatAm
            </h3>
            <p className="mb-4 text-sm text-slate-400">
                Diseñado para la realidad regional. Filtra y controla tu operación por país con un solo clic.
            </p>

            <div className="grid grid-cols-3 gap-2 mb-4">
                {["Colombia", "Perú", "Ecuador"].map((country) => (
                    <div key={country} className="text-center p-2 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-default border border-white/5 hover:border-accent-cyan/50">
                        <span className="text-xs font-semibold text-slate-300">{country}</span>
                    </div>
                ))}
            </div>

            <Button variant="ghost" size="sm" className="w-full justify-between hover:text-accent-cyan group/btn">
                Ver mapa de calor
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
        </Card>
    )
}

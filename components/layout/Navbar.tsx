"use client"

import * as React from "react"
import Link from "next/link"
import { Activity } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                isScrolled ? "bg-[#0f172a]/80 backdrop-blur-md shadow-lg border-b border-white/5" : "bg-transparent"
            )}
        >
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary group-hover:bg-primary/30 transition-colors">
                        <Activity className="h-6 w-6" />
                        <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg group-hover:blur-xl transition-all" />
                    </div>
                    <span className="font-heading text-xl font-bold tracking-tight text-white">
                        Sales<span className="text-primary">Pulse</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#comparison" className="text-sm font-medium text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">
                        Plataforma
                    </Link>
                    <Link href="#analytics" className="text-sm font-medium text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">
                        Inteligencia
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">
                        Planes
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Iniciar Sesión
                    </Link>
                    <Button
                        size="sm"
                        className="shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                        onClick={() => window.dispatchEvent(new CustomEvent("open-elevenlabs-widget"))}
                    >
                        Agendar Demo o Pedir Cotización
                    </Button>
                </div>
            </div>
        </header>
    )
}

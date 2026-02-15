"use client"

import * as React from "react"
import Link from "next/link"
import { Activity } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

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
                isScrolled || isMobileMenuOpen ? "bg-[#0f172a]/95 backdrop-blur-md shadow-lg border-b border-white/5" : "bg-transparent"
            )}
        >
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 group z-50">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary group-hover:bg-primary/30 transition-colors">
                        <Activity className="h-6 w-6" />
                        <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg group-hover:blur-xl transition-all" />
                    </div>
                    <span className="font-heading text-xl font-bold tracking-tight text-white">
                        Sales<span className="text-primary">Pulse</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
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

                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Iniciar Sesión
                    </Link>
                    <Button
                        size="sm"
                        className="shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                        onClick={() => window.dispatchEvent(new CustomEvent("open-elevenlabs-widget"))}
                    >
                        Agendar Demo
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                    )}
                </button>

                {/* Mobile Navigation Overlay */}
                <div
                    className={cn(
                        "fixed inset-0 bg-[#0f172a] z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden",
                        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <nav className="flex flex-col items-center gap-8 text-lg">
                        <Link
                            href="#comparison"
                            className="text-slate-300 hover:text-white hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Plataforma
                        </Link>
                        <Link
                            href="#analytics"
                            className="text-slate-300 hover:text-white hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Inteligencia
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-slate-300 hover:text-white hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Planes
                        </Link>
                        <Link
                            href="/login"
                            className="text-slate-300 hover:text-white hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Iniciar Sesión
                        </Link>
                    </nav>
                    <div className="mt-4">
                        <Button
                            size="lg"
                            className="shadow-[0_0_20px_rgba(168,85,247,0.3)] w-full"
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                window.dispatchEvent(new CustomEvent("open-elevenlabs-widget"));
                            }}
                        >
                            Agendar Demo
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

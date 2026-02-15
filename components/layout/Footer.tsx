import Link from "next/link"
import { Activity, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#020617] py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Activity className="h-6 w-6 text-primary" />
                            <span className="font-heading text-xl font-bold text-white">
                                Sales<span className="text-primary">Pulse</span>
                            </span>
                        </Link>
                        <p className="text-sm text-slate-400">
                            Domina tus proyecciones con IA. La herramienta definitiva para líderes comerciales en LatAm.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">Producto</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">Forecast</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Analítica</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Integraciones</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">Compañía</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Carreras</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">Síguenos</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="text-slate-400 hover:text-white hover:scale-110 transition-all">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-white hover:scale-110 transition-all">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-white hover:scale-110 transition-all">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} Sales Pulse. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    )
}

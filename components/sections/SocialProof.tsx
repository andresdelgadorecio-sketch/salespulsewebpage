"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const companies = [
    "Nubank",
    "MercadoLibre",
    "Rappi",
    "Kavak",
    "dLocal",
    "Ualá",
]

export function SocialProof() {
    return (
        <section className="py-12 bg-black/60 border-y border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 text-center">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
                    Utilizado por líderes de revenue en LatAm
                </p>

                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70">
                    {companies.map((company) => (
                        <div key={company} className="text-xl md:text-2xl font-bold font-heading text-slate-400 select-none">
                            {company}
                        </div>
                    ))}
                </div>
            </div>

            {/* Background gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background poiinter-events-none" />
        </section>
    )
}

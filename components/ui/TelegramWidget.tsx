"use client"

import { Send, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function TelegramWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)

    // Demo bot username - replace with real one
    const BOT_USERNAME = "VentasSalesPulseBot"

    useEffect(() => {
        // Show tooltip after 3 seconds
        const timer = setTimeout(() => setShowTooltip(true), 3000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">

            {/* Tooltip Message */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-white text-slate-900 px-4 py-3 rounded-2xl shadow-xl border border-slate-100 max-w-[200px] pointer-events-auto relative mr-2"
                    >
                        <p className="text-sm font-medium leading-snug">
                            ¿Dudas sobre qué plan elegir? <span className="text-primary font-bold">Habla con IA</span>
                        </p>
                        {/* Arrow */}
                        <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white transform rotate-45 border-b border-r border-slate-100" />

                        {/* Close button */}
                        <button
                            onClick={() => setShowTooltip(false)}
                            className="absolute -top-2 -left-2 w-5 h-5 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center text-[10px] text-slate-600 font-bold"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main FAB */}
            <motion.a
                href={`https://t.me/${BOT_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pointer-events-auto relative group"
                onClick={() => setShowTooltip(false)}
            >
                {/* Pulse Effect */}
                <span className="absolute inset-0 rounded-full bg-[#2AABEE] opacity-20 group-hover:animate-ping duration-1000" />

                <div className="relative w-14 h-14 bg-[#2AABEE] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(42,171,238,0.4)] transition-shadow hover:shadow-[0_0_30px_rgba(42,171,238,0.6)]">
                    <Send className="w-6 h-6 text-white ml-0.5 mt-0.5" />
                </div>

                {/* Status indicator */}
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#020617] rounded-full" />
            </motion.a>
        </div>
    )
}

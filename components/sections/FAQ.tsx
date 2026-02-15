"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
    {
        question: "¿Se integra con mi CRM actual?",
        answer: "Sí, Forecast Commander tiene integraciones nativas one-click con Salesforce, HubSpot y Pipedrive. Para otros sistemas, ofrecemos una API robusta y webhooks."
    },
    {
        question: "¿Mis datos están seguros?",
        answer: "Absolutamente. Utilizamos encriptación AES-256 en reposo y TLS 1.3 en tránsito. No almacenamos datos sensibles de tus clientes, solo metadata necesaria para el forecasting."
    },
    {
        question: "¿Cuánto tiempo toma la implementación?",
        answer: "La mayoría de los equipos están operativos en menos de 48 horas. Nuestro equipo de onboarding te ayuda a configurar tus reglas de negocio y carga histórica."
    },
    {
        question: "¿Es adecuado para equipos pequeños?",
        answer: "Tenemos planes diseñados para startups en crecimiento, pero el mayor valor se percibe en equipos de ventas de +5 personas donde la complejidad del forecast aumenta."
    }
]

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="py-24 bg-background border-t border-white/5">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-heading text-white mb-4">Preguntas Frecuentes</h2>
                    <p className="text-slate-400">Todo lo que necesitas saber antes de empezar.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-white/10 rounded-lg bg-white/5 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-semibold text-white">{faq.question}</span>
                                {openIndex === index ? (
                                    <Minus className="w-5 h-5 text-primary" />
                                ) : (
                                    <Plus className="w-5 h-5 text-slate-400" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

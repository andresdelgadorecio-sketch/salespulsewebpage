import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Declaración de Accesibilidad | SalesPulse",
    description: "Nuestro compromiso con la accesibilidad digital y el cumplimiento de WCAG 2.2 AA.",
};

export default function AccessibilityPage() {
    return (
        <main className="w-full min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
                        Declaración de Accesibilidad
                    </h1>
                    <p className="text-lg text-slate-400">
                        En SalesPulse, nos comprometemos a garantizar la accesibilidad digital para personas con discapacidad.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-8 text-slate-300 leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white font-heading">Estado de cumplimiento</h2>
                        <p>
                            Actualmente, estamos trabajando para cumplir con las <strong className="text-white">Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2 nivel AA</strong>. Nuestro objetivo es que nuestro sitio web sea perceptible, operable, comprensible y robusto para todos los usuarios.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white font-heading">Características de accesibilidad</h2>
                        <p>
                            Hemos implementado las siguientes medidas para asegurar la accesibilidad:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                            <li>
                                <strong>Navegación por teclado:</strong> Todo el sitio es navegable sin necesidad de ratón.
                            </li>
                            <li>
                                <strong>Ajustes personalizados:</strong> Un widget de accesibilidad que permite aumentar el texto, ajustar contraste y pausar animaciones.
                            </li>
                            <li>
                                <strong>Estructura semántica:</strong> Uso correcto de etiquetas HTML para tecnologías de asistencia.
                            </li>
                            <li>
                                <strong>Foco visible:</strong> Indicadores visuales claros al navegar por teclado.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white font-heading">Feedback y contacto</h2>
                        <p>
                            Agradecemos sus comentarios sobre la accesibilidad de SalesPulse. Si encuentra barreras de acceso o necesita contenido en un formato alternativo, por favor contáctenos:
                        </p>
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-2">
                            <p>
                                <span className="font-semibold text-white">Correo electrónico:</span>{" "}
                                <a href="mailto:accesibilidad@salespulse.com" className="text-primary hover:underline hover:text-primary-400 transition-colors">
                                    accesibilidad@salespulse.com
                                </a>
                            </p>
                            <p>
                                <span className="font-semibold text-white">Tiempo de respuesta:</span> Intentamos responder a los comentarios en un plazo de 2 días hábiles.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white font-heading">Fecha</h2>
                        <p>
                            Esta declaración fue creada el <time dateTime="2026-02-09">9 de febrero de 2026</time>.
                        </p>
                    </section>
                </div>

                {/* Back Button */}
                <div className="pt-8 border-t border-slate-800 text-center">
                    <a
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 border border-slate-700 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-all font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                        Volver al inicio
                    </a>
                </div>
            </div>
        </main>
    );
}

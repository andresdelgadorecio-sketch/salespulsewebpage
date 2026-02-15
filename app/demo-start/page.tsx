import { Suspense } from "react";

export default function DemoStartPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] p-4 font-sans text-white">
            <div className="quick-demo-card-page max-w-[520px] w-full mx-auto p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl text-center">
                <h3 className="text-2xl font-bold mb-4">Prueba rápida (30s)</h3>
                <p className="mb-6 text-lg">Usuario: <b className="text-primary">demo</b></p>

                <form action="/api/demo-session" method="POST">
                    <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] border-none cursor-pointer"
                    >
                        Entrar al demo
                    </button>
                </form>

                <p className="mt-4 text-xs text-slate-400 opacity-75">
                    Sin registro. Datos ficticios. Acceso limitado.
                </p>
            </div>

            <style jsx>{`
        .quick-demo-card-page {
            background: rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        }
      `}</style>
        </div>
    );
}

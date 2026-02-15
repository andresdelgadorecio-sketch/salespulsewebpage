"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "elevenlabs-convai": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { "agent-id": string };
        }
    }
}

export function ElevenLabsWidget() {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed"
        script.async = true
        script.type = "text/javascript"
        document.body.appendChild(script)

        const handleOpenWidget = () => {
            setIsActive(true)

            const attemptInject = (retries = 0) => {
                if (retries > 10) return

                const widget = document.querySelector("elevenlabs-convai") as HTMLElement
                if (widget && widget.shadowRoot) {
                    const shadow = widget.shadowRoot

                    // 1. Trigger the click
                    const button = shadow.querySelector("button")
                    if (button) (button as HTMLElement).click()
                    else widget.click()

                    // 2. Inject CSS directly into Shadow DOM
                    const style = document.createElement('style')
                    style.textContent = `
                        :host {
                            top: 0 !important;
                            right: 0 !important;
                            bottom: auto !important;
                            left: auto !important;
                            position: absolute !important;
                            width: 100% !important;
                            height: 100% !important;
                            max-height: none !important;
                            margin: 0 !important;
                            z-index: 10000 !important;
                            border-radius: 20px !important;
                            overflow: hidden !important;
                            /* Apply background mostly here to avoid obscuring video */
                            background-color: #0f172a !important; 
                        }
                        
                        /* Try to ensure text is visible */
                        * {
                            color-scheme: dark;
                        }
                        
                        /* Helper to round buttons */
                        button {
                            border-radius: 9999px !important;
                        }
                    `
                    shadow.appendChild(style)

                } else {
                    setTimeout(() => attemptInject(retries + 1), 200)
                }
            }

            attemptInject()
        }

        window.addEventListener("open-elevenlabs-widget", handleOpenWidget)

        return () => {
            if (document.body.contains(script)) {
                // keep script
            }
            window.removeEventListener("open-elevenlabs-widget", handleOpenWidget)
        }
    }, [])

    return (
        <div
            className="fixed z-[99999] shadow-2xl bg-slate-900"
            style={{
                top: '100px',
                right: '25px', // Adjusted to make room for close button if needed, but relative to this
                width: isActive ? '340px' : '0',
                height: isActive ? '550px' : '0',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: isActive ? 'auto' : 'none',
                opacity: isActive ? 1 : 0,
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
        >
            {/* Close Button */}
            <button
                onClick={() => setIsActive(false)}
                className={`
                    absolute -top-3 -right-3 
                    bg-red-500 hover:bg-red-600 
                    text-white rounded-full p-2 
                    shadow-lg z-[100000] 
                    transition-all duration-300
                    ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                `}
                aria-label="Cerrar widget"
            >
                <X size={16} strokeWidth={3} />
            </button>

            <style jsx global>{`
                elevenlabs-convai {
                    width: 100% !important;
                    height: 100% !important;
                }
            `}</style>
            {/* @ts-ignore */}
            <elevenlabs-convai agent-id="agent_8401kgf16z3aez28bb8kx59p5t38"></elevenlabs-convai>
        </div>
    )
}


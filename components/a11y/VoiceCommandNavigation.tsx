"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAccessibility } from "./AccessibilityContext";
import {
    ArrowRight,
    ArrowLeft,
    Home,
    Upload,
    HelpCircle,
    Settings,
    X,
    Mic,
    MicOff,
    Volume2
} from "lucide-react";
import { createPortal } from "react-dom";

export function VoiceCommandNavigation() {
    const { settings, updateSetting } = useAccessibility();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !settings.voiceCommands) return null;

    // Portal to ensure it floats above everything
    return createPortal(
        <VoiceBar onClose={() => updateSetting("voiceCommands", false)} />,
        document.body
    );
}

function VoiceBar({ onClose }: { onClose: () => void }) {
    const [isListening, setIsListening] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const recognitionRef = useRef<any>(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = "es-ES";

                recognition.onresult = (event: any) => {
                    let transcript = "";
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        transcript += event.results[i][0].transcript;
                    }
                    setInputValue(transcript);
                    handleCommand(transcript.toLowerCase());
                };

                recognitionRef.current = recognition;
            }
        }
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert("Tu navegador no soporta reconocimiento de voz.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleCommand = (command: string) => {
        if (command.includes("bajar") || command.includes("abajo")) {
            window.scrollBy({ top: 300, behavior: "smooth" });
        } else if (command.includes("subir") || command.includes("arriba")) {
            window.scrollBy({ top: -300, behavior: "smooth" });
        } else if (command.includes("inicio") || command.includes("principal")) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (command.includes("cerrar")) {
            onClose();
        }
    };

    // Navigation Handlers
    const handleNext = () => {
        // Tab simulation logic could go here
        const focusable = getFocusableElements();
        const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
        const nextIndex = (currentIndex + 1) % focusable.length;
        focusable[nextIndex]?.focus();
    };

    const handlePrev = () => {
        const focusable = getFocusableElements();
        const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
        const prevIndex = (currentIndex - 1 + focusable.length) % focusable.length;
        focusable[prevIndex]?.focus();
    };

    const handleHome = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div id="voice-a11y-toolbar" className="fixed top-0 left-0 right-0 z-[20002] bg-[#9e0b21] h-16 flex items-center justify-between px-2 shadow-2xl border-b-4 border-white font-sans">

            {/* Left Section: Logo & Input */}
            <div className="flex items-center flex-1 gap-3 mr-4">
                {/* Logo Placeholder (Insuit style) */}
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-[#9e0b21] shrink-0">
                    <span className="text-[#9e0b21] font-bold italic text-sm">inS</span>
                </div>

                <Mic className="text-white shrink-0" size={24} />

                <input
                    type="text"
                    value={inputValue}
                    readOnly
                    placeholder="Di un comando..."
                    className="w-full max-w-2xl h-10 bg-white rounded-md px-3 text-lg text-gray-800 focus:outline-none"
                />
            </div>

            {/* Center Section: Navigation Buttons */}
            <div className="flex items-center gap-1 mx-2">
                <NavButton
                    icon={<ArrowRight size={24} className="stroke-[3]" />}
                    label="siguiente"
                    onClick={handleNext}
                />
                <NavButton
                    icon={<ArrowLeft size={24} className="stroke-[3] scale-x-[-1]" />} // Flip arrow for 'return' look
                    label="atrás"
                    onClick={handlePrev}
                />
                <NavButton
                    icon={<Home size={24} className="stroke-[3]" />}
                    label="principal"
                    onClick={handleHome}
                />
                <NavButton
                    icon={<Upload size={24} className="stroke-[3]" />}
                    label="raíz"
                    onClick={() => window.location.href = '/'}
                />
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-2 ml-4">
                {/* Voice Commands Indicator */}
                <div className="bg-[#7d091b] rounded-lg p-1 px-3 flex items-center gap-2 border border-[#b01e36]">
                    <div className="flex flex-col items-center">
                        <button
                            onClick={toggleListening}
                            className={`p-1 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-white/20'}`}
                        >
                            <Mic size={20} className="text-white" />
                        </button>
                    </div>
                    <span className="text-white font-bold leading-tight text-sm w-20">Comandos de voz</span>
                </div>

                {/* Read Toggle */}
                <ActionButton
                    icon={<Volume2 size={24} className="stroke-[3]" />}
                    label="activar"
                    subLabel="lectura"
                    onClick={() => { }}
                />

                {/* Help */}
                <ActionButton
                    icon={<HelpCircle size={24} className="stroke-[3]" />}
                    label="ayuda"
                    onClick={() => alert("Comandos disponibles: 'Bajar', 'Subir', 'Inicio'.")}
                />

                {/* Close */}
                <button
                    onClick={() => {
                        const toolbar = document.getElementById("voice-a11y-toolbar");
                        if (toolbar) toolbar.style.display = "none";
                        onClose();
                    }}
                    className="bg-white hover:bg-gray-100 text-[#9e0b21] rounded-lg w-16 h-14 shadow-sm flex flex-col items-center justify-center p-1 transition-transform active:scale-95 border-b-4 border-gray-200"
                >
                    <X size={28} className="stroke-[3]" />
                    <div className="flex flex-col items-center leading-none mt-0.5">
                        <span className="text-[10px] font-bold">cerrar</span>
                        <span className="text-[10px] font-bold">insuit</span>
                    </div>
                </button>
            </div>
        </div>
    );
}

// Helper Components
function NavButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="bg-white hover:bg-gray-100 text-[#9e0b21] rounded-lg w-16 h-14 shadow-sm flex flex-col items-center justify-center p-1 transition-transform active:scale-95 border-b-4 border-gray-200 mx-0.5"
        >
            <div className="mb-0.5">{icon}</div>
            <span className="text-[11px] font-bold leading-none">{label}</span>
        </button>
    )
}

function ActionButton({ icon, label, subLabel, onClick }: { icon: React.ReactNode, label: string, subLabel?: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="bg-[#7d091b] hover:bg-[#6b0817] text-white rounded-lg w-14 h-14 border border-[#b01e36] flex flex-col items-center justify-center p-1 transition-colors"
        >
            <div className="mb-0.5">{icon}</div>
            <span className="text-[9px] font-bold leading-none">{label}</span>
            {subLabel && <span className="text-[9px] font-bold leading-none">{subLabel}</span>}
        </button>
    )
}

// Helper to find focusable elements
function getFocusableElements(): HTMLElement[] {
    const selector = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
    return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
}

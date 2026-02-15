"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAccessibility } from "./AccessibilityContext";
import { Play, Pause, Square, Volume2 } from "lucide-react";

export function ScreenReader() {
    const { settings } = useAccessibility();
    const [isSupportingSpeech, setIsSupportingSpeech] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentText, setCurrentText] = useState("");
    const synthRef = useRef<SpeechSynthesis | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            setIsSupportingSpeech(true);
            synthRef.current = window.speechSynthesis;
        }
    }, []);

    // Stop speaking when disabled
    useEffect(() => {
        if (!settings.speakContent && synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
            setCurrentText("");
        }
    }, [settings.speakContent]);

    // Handle click to speak
    useEffect(() => {
        if (!settings.speakContent || !isSupportingSpeech) return;

        const handleClick = (e: MouseEvent) => {
            // Check if clicking the controls
            if ((e.target as HTMLElement).closest(".screen-reader-controls")) return;

            // Find nearest text container
            const target = e.target as HTMLElement;
            const textContent = target.innerText || target.textContent;

            if (textContent && textContent.trim().length > 0) {
                // Flash highlight
                target.style.outline = "2px solid #A855F7";
                setTimeout(() => target.style.outline = "", 1000);

                speak(textContent);
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [settings.speakContent, isSupportingSpeech]);

    const speak = (text: string) => {
        if (!synthRef.current) return;

        // Cancel current
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "es-ES"; // Default to Spanish
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
        setCurrentText(text.substring(0, 50) + (text.length > 50 ? "..." : ""));
    };

    const stop = () => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    };

    if (!settings.speakContent || !isSupportingSpeech) return null;

    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100000] screen-reader-controls bg-slate-900 border border-slate-700 rounded-full shadow-2xl p-2 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Volume2 size={20} />
            </div>

            <div className="flex flex-col max-w-[200px]">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Lector de Voz</span>
                <span className="text-[10px] text-slate-400 truncate w-full">
                    {isSpeaking ? currentText : "Haz clic en un texto"}
                </span>
            </div>

            <div className="h-8 w-px bg-slate-700 mx-1" />

            <button
                onClick={stop}
                className="p-2 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors"
                title="Detener lectura"
            >
                <Square size={16} fill="currentColor" />
            </button>
        </div>
    );
}

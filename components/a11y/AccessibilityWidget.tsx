"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAccessibility } from "./AccessibilityContext";
import {
    X,
    RotateCcw,
    Type,
    Zap,
    Eye,
    MousePointer2,
    PauseCircle,
    Sun,
    Accessibility,
    MousePointerClick,
    AlignLeft,
    Heading,
    MessageSquare,
    ALargeSmall,
    Keyboard,
    Mic // New icon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export function AccessibilityWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { settings, updateSetting, resetSettings } = useAccessibility();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    // Toggle Drawer
    const toggleDrawer = () => setIsOpen(!isOpen);

    // Close Drawer
    const closeDrawer = () => {
        setIsOpen(false);
        // Return focus to trigger button after closing
        setTimeout(() => {
            triggerRef.current?.focus();
        }, 100);
    };

    // Focus Trap & ESC key listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === "Escape") {
                closeDrawer();
            }

            // Simple Focus Trap logic
            if (e.key === "Tab" && drawerRef.current) {
                const focusableElements = drawerRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            // Focus the close button when drawer opens
            setTimeout(() => {
                closeButtonRef.current?.focus();
            }, 100);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    // Profiles Logic
    const applyProfile = (profile: "lowVision" | "motionSensitive" | "highContrast") => {
        resetSettings(); // Reset first to avoid conflicts
        // Small timeout to allow state clear before applying new
        setTimeout(() => {
            switch (profile) {
                case "lowVision":
                    updateSetting("textScale", 1.25);
                    updateSetting("contrastPlus", true);
                    updateSetting("highlightLinks", true);
                    break;
                case "motionSensitive":
                    updateSetting("pauseAnimations", true);
                    break;
                case "highContrast":
                    updateSetting("contrastPlus", true); // Using contrast+ as smart contrast proxy for now
                    updateSetting("smartContrast", true);
                    break;
            }
        }, 10);
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                ref={triggerRef}
                onClick={toggleDrawer}
                aria-label="Menú de Accesibilidad"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                className="fixed top-24 right-6 z-[9999] p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-primary transition-transform hover:scale-105"
            >
                <Accessibility size={28} />
            </button>

            {/* Drawer Overlay & Panel */}
            <AnimatePresence>
                {isOpen && (
                    <Portal>
                        <div className="fixed inset-0 z-[20000] flex justify-end font-sans">
                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeDrawer}
                                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                                aria-hidden="true"
                            />

                            {/* Drawer Content */}
                            <motion.div
                                ref={drawerRef}
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="a11y-title"
                                className="relative w-full max-w-md h-full bg-slate-900 border-l border-slate-800 shadow-2xl overflow-y-auto"
                            >
                                <div className="p-6 space-y-8">
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <h2 id="a11y-title" className="text-xl font-bold text-white flex items-center gap-2">
                                            <Accessibility className="text-primary" />
                                            Accesibilidad
                                        </h2>
                                        <button
                                            ref={closeButtonRef}
                                            onClick={closeDrawer}
                                            aria-label="Cerrar panel de accesibilidad"
                                            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    {/* Profiles */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                            Perfiles Inteligentes
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <ProfileCard
                                                icon={<Eye size={20} />}
                                                label="Baja Visión"
                                                onClick={() => applyProfile("lowVision")}
                                            />
                                            <ProfileCard
                                                icon={<PauseCircle size={20} />}
                                                label="Sin Movimiento"
                                                onClick={() => applyProfile("motionSensitive")}
                                            />
                                            <ProfileCard
                                                icon={<Sun size={20} />}
                                                label="Alto Contraste"
                                                onClick={() => applyProfile("highContrast")}
                                            />
                                        </div>
                                    </div>

                                    {/* Toggles Grid */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                            Ajustes Individuales
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <ToggleCard
                                                icon={<Zap size={20} />}
                                                title="Smart Contrast"
                                                description="Mejora el contraste"
                                                isActive={settings.smartContrast}
                                                onToggle={() => updateSetting("smartContrast", !settings.smartContrast)}
                                            />
                                            <ToggleCard
                                                icon={<Sun size={20} />}
                                                title="Contraste +"
                                                description="Filtro de alto contraste"
                                                isActive={settings.contrastPlus}
                                                onToggle={() => updateSetting("contrastPlus", !settings.contrastPlus)}
                                            />
                                            <ToggleCard
                                                icon={<Type size={20} />}
                                                title="Texto Grande"
                                                description="Aumenta tamaño de letra"
                                                isActive={settings.textScale > 1}
                                                onToggle={() => {
                                                    // Cycle: 1 -> 1.15 -> 1.25 -> 1
                                                    if (settings.textScale === 1) updateSetting("textScale", 1.15);
                                                    else if (settings.textScale === 1.15) updateSetting("textScale", 1.25);
                                                    else updateSetting("textScale", 1);
                                                }}
                                                statusText={settings.textScale > 1 ? `${settings.textScale}x` : "Off"}
                                            />
                                            <ToggleCard
                                                icon={<MousePointer2 size={20} />}
                                                title="Resaltar Links"
                                                description="Subraya enlaces"
                                                isActive={settings.highlightLinks}
                                                onToggle={() => updateSetting("highlightLinks", !settings.highlightLinks)}
                                            />
                                            <ToggleCard
                                                icon={<PauseCircle size={20} />}
                                                title="Pausar Animación"
                                                description="Y transiciones"
                                                isActive={settings.pauseAnimations}
                                                onToggle={() => updateSetting("pauseAnimations", !settings.pauseAnimations)}
                                            />
                                            <ToggleCard
                                                icon={<MousePointer2 size={20} />}
                                                title="Foco Visible"
                                                description="Resaltar el foco"
                                                isActive={settings.focusHighlight}
                                                onToggle={() => updateSetting("focusHighlight", !settings.focusHighlight)}
                                            />
                                        </div>
                                    </div>

                                    {/* Insuit Technical Aids */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                            Ayudas Técnicas
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <ToggleCard
                                                icon={<MousePointerClick size={20} />}
                                                title="Cursor Grande"
                                                description="Aumentar tamaño"
                                                isActive={settings.cursorType === "big"}
                                                onToggle={() =>
                                                    updateSetting(
                                                        "cursorType",
                                                        settings.cursorType === "big" ? "default" : "big"
                                                    )
                                                }
                                            />
                                            <ToggleCard
                                                icon={<AlignLeft size={20} />}
                                                title="Guía de Lectura"
                                                description="Línea de seguimiento"
                                                isActive={settings.cursorType === "reading-guide"}
                                                onToggle={() =>
                                                    updateSetting(
                                                        "cursorType",
                                                        settings.cursorType === "reading-guide" ? "default" : "reading-guide"
                                                    )
                                                }
                                            />
                                            <ToggleCard
                                                icon={<ALargeSmall size={20} />}
                                                title="Fuente Legible"
                                                description="Dislexia Friendly"
                                                isActive={settings.dyslexiaFont}
                                                onToggle={() => updateSetting("dyslexiaFont", !settings.dyslexiaFont)}
                                            />
                                            <ToggleCard
                                                icon={<Heading size={20} />}
                                                title="Resaltar Títulos"
                                                description="Jerarquía visual"
                                                isActive={settings.highlightHeadings}
                                                onToggle={() => updateSetting("highlightHeadings", !settings.highlightHeadings)}
                                            />
                                            <ToggleCard
                                                icon={<MessageSquare size={20} />}
                                                title="Lector de Voz"
                                                description="Leer contenido al hacer clic"
                                                isActive={settings.speakContent}
                                                onToggle={() => updateSetting("speakContent", !settings.speakContent)}
                                            />
                                            <ToggleCard
                                                icon={<Keyboard size={20} />}
                                                title="Navegación por Teclado"
                                                description="Teclado virtual en pantalla"
                                                isActive={settings.keyboardNavigation}
                                                onToggle={() => updateSetting("keyboardNavigation", !settings.keyboardNavigation)}
                                            />
                                            <ToggleCard
                                                icon={<Mic size={20} />}
                                                title="Comandos de Voz"
                                                description="Navegar hablando"
                                                isActive={settings.voiceCommands}
                                                onToggle={() => updateSetting("voiceCommands", !settings.voiceCommands)}
                                            />
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="pt-6 border-t border-slate-800 space-y-4">
                                        <button
                                            onClick={resetSettings}
                                            className="w-full flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
                                        >
                                            <RotateCcw size={18} />
                                            Restablecer Preferencias
                                        </button>

                                        <div className="text-center">
                                            <a href="/accesibilidad" className="text-sm text-primary hover:underline focus:outline-dashed focus:outline-2 focus:outline-primary rounded-sm px-1">
                                                Declaración de Accesibilidad
                                            </a>
                                            <p className="text-xs text-slate-500 mt-2">
                                                Tus preferencias se guardan en este dispositivo.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </Portal>
                )}
            </AnimatePresence>
        </>
    );
}

// Portal Helper to render outside of normal DOM flow
const Portal = ({ children }: { children: React.ReactNode }) => {
    if (typeof window === "undefined") return null;
    return createPortal(children, document.body);
};


// Helper Components for Cards
function ProfileCard({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center p-3 gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all hover:scale-105 focus:ring-2 focus:ring-primary focus:outline-none"
        >
            <div className="text-primary">{icon}</div>
            <span className="text-xs font-medium text-slate-300 text-center">{label}</span>
        </button>
    )
}

function ToggleCard({
    icon,
    title,
    description,
    isActive,
    onToggle,
    statusText
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    isActive: boolean;
    onToggle: () => void;
    statusText?: string;
}) {
    return (
        <button
            onClick={onToggle}
            role="switch"
            aria-checked={isActive}
            className={`flex items-start gap-3 p-3 text-left rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary ${isActive
                ? "bg-primary/10 border-primary/50"
                : "bg-slate-800 border-slate-700 hover:bg-slate-750"
                }`}
        >
            <div className={`mt-0.5 ${isActive ? "text-primary" : "text-slate-400"}`}>
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <span className={`font-semibold text-sm ${isActive ? "text-white" : "text-slate-200"}`}>
                        {title}
                    </span>
                    {statusText && (
                        <span className="text-xs font-mono bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">
                            {statusText}
                        </span>
                    )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                    {description}
                </p>
            </div>
            {/* Switch Visual */}
            <div className={`w-8 h-5 rounded-full relative transition-colors mt-1 ${isActive ? "bg-primary" : "bg-slate-600"
                }`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${isActive ? "left-[18px]" : "left-1"
                    }`} />
            </div>
        </button>
    )
}

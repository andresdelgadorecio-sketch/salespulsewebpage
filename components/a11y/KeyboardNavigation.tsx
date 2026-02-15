"use client";

import React, { useEffect, useState } from "react";
import { useAccessibility } from "./AccessibilityContext";
import {
    ChevronUp,
    ChevronDown,
    ArrowRight,
    ArrowLeft,
    Home,
    Upload,
    HelpCircle,
    Settings,
    X,
    Keyboard
} from "lucide-react";
import { createPortal } from "react-dom";

export function KeyboardNavigation() {
    const { settings, updateSetting } = useAccessibility();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !settings.keyboardNavigation) return null;

    // Portal to ensure it floats above everything
    return createPortal(
        <KeyboardBar onClose={() => updateSetting("keyboardNavigation", false)} />,
        document.body
    );
}

function KeyboardBar({ onClose }: { onClose: () => void }) {
    // Navigation Logic
    const handleNext = () => {
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

    const handleScrollUp = () => {
        window.scrollBy({ top: -200, behavior: "smooth" });
    };

    const handleScrollDown = () => {
        window.scrollBy({ top: 200, behavior: "smooth" });
    };

    const handleHome = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Numbers 1, 2, 3 could mapped to specific regions or headers if desired.
    // For now we'll keep them as visual placeholders or basic shortcuts if needed.

    return (
        <div id="keyboard-a11y-toolbar" className="fixed bottom-0 left-0 right-0 z-[10001] bg-[#9e0b21] p-2 flex flex-wrap items-center justify-center gap-1 shadow-2xl border-t-4 border-white">
            {/* Brand / Logo Area */}
            <div className="hidden md:flex items-center mr-4">
                <div className="bg-white rounded-full p-1 w-10 h-10 flex items-center justify-center">
                    <Keyboard className="text-[#9e0b21]" size={24} />
                </div>
            </div>

            {/* Number Keys (Mockup/Future use) */}
            <div className="flex gap-1">
                <NavButton label="1" onClick={() => { }} className="text-[#9e0b21] font-bold text-xl" />
                <NavButton label="2" onClick={() => { }} className="text-[#9e0b21] font-bold text-xl" />
                <NavButton label="3" onClick={() => { }} className="text-[#9e0b21] font-bold text-xl" />
            </div>

            <div className="w-px h-10 bg-white/30 mx-1"></div>

            {/* Navigation Keys */}
            <NavButton
                icon={<ArrowRight size={20} className="stroke-[3]" />}
                label="siguiente"
                onClick={handleNext}
                subText="Tab"
            />
            <NavButton
                icon={<ArrowLeft size={20} className="stroke-[3]" />}
                label="atrás"
                onClick={handlePrev}
                subText="Shift+Tab"
            />

            <div className="w-px h-10 bg-white/30 mx-1"></div>

            <NavButton
                icon={<ChevronUp size={24} className="stroke-[3]" />}
                label="sube"
                onClick={handleScrollUp}
            />
            <NavButton
                icon={<ChevronDown size={24} className="stroke-[3]" />}
                label="baja"
                onClick={handleScrollDown}
            />

            <div className="w-px h-10 bg-white/30 mx-1"></div>

            <NavButton
                icon={<Home size={20} className="stroke-[3]" />}
                label="principal"
                onClick={handleHome}
            />
            <NavButton
                icon={<Upload size={20} className="stroke-[3]" />}
                label="raíz"
                onClick={() => window.location.href = '/'}
            />

            <div className="w-px h-10 bg-white/30 mx-1"></div>

            <NavButton
                icon={<HelpCircle size={20} className="stroke-[3]" />}
                label="ayuda"
                onClick={() => alert("Usa los botones para navegar por la página.")}
            />
            <NavButton
                icon={<Settings size={20} className="stroke-[3]" />}
                label="configuración"
                onClick={() => {
                    const btn = document.querySelector('button[aria-label="Menú de Accesibilidad"]') as HTMLButtonElement;
                    btn?.click();
                }}
            />

            {/* Right Side - Description & Close */}
            <div className="hidden md:flex ml-4 items-center gap-2">
                <div className="bg-[#bd0d26] border-2 border-white rounded-lg px-3 py-1 text-white flex items-center gap-2">
                    <ArrowRight className="bg-white text-[#bd0d26] rounded-sm p-0.5" size={20} />
                    <div className="flex flex-col leading-tight">
                        <span className="font-bold text-xs">Navegación sencilla</span>
                        <span className="text-[10px]">con botones</span>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Forzando cierre...");
                    // Force visual hide immediately for better UX
                    const toolbar = document.getElementById("keyboard-a11y-toolbar");
                    if (toolbar) toolbar.style.display = "none";

                    onClose();
                }}
                className="ml-2 bg-[#bd0d26] hover:bg-[#a60b21] text-white border-2 border-white rounded-lg p-2 transition-colors cursor-pointer relative z-50 shadow-md"
                aria-label="Cerrar teclado virtual"
            >
                <X size={24} className="stroke-[3]" />
            </button>

        </div>
    );
}

interface NavButtonProps {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    className?: string;
    subText?: string;
}

function NavButton({ label, icon, onClick, className, subText }: NavButtonProps) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center bg-white hover:bg-gray-100 text-[#9e0b21] rounded-lg w-16 h-14 shadow-sm transition-transform active:scale-95 border-b-4 border-gray-200"
        >
            {icon && <div className="mb-0.5">{icon}</div>}
            <span className={`text-[10px] font-bold leading-none ${className || ""}`}>
                {label}
            </span>
            {subText && <span className="sr-only">{subText}</span>}
        </button>
    );
}

// Helper to find focusable elements
function getFocusableElements(): HTMLElement[] {
    const selector = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
    return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
}

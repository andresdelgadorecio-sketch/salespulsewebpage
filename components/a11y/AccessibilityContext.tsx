"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ReadingGuide } from "./ReadingGuide";
import { ScreenReader } from "./ScreenReader";


// Define the shape of our accessibility settings
export interface AccessibilitySettings {
    smartContrast: boolean;
    contrastPlus: boolean;
    textScale: 1 | 1.15 | 1.25;
    highlightLinks: boolean;
    pauseAnimations: boolean;
    focusHighlight: boolean;
    // Insuit Enhancements
    cursorType: "default" | "big" | "reading-guide";
    dyslexiaFont: boolean;
    highlightHeadings: boolean;
    speakContent: boolean;
    keyboardNavigation: boolean;
    voiceCommands: boolean;
}

// Default settings
const defaultSettings: AccessibilitySettings = {
    smartContrast: false,
    contrastPlus: false,
    textScale: 1,
    highlightLinks: false,
    pauseAnimations: false,
    focusHighlight: false,
    cursorType: "default",
    dyslexiaFont: false,
    highlightHeadings: false,
    speakContent: false,
    keyboardNavigation: false,
    voiceCommands: false,
};

interface AccessibilityContextType {
    settings: AccessibilitySettings;
    updateSetting: <K extends keyof AccessibilitySettings>(
        key: K,
        value: AccessibilitySettings[K]
    ) => void;
    resetSettings: () => void;
    isLoading: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(
    undefined
);

const LOCAL_STORAGE_KEY = "a11y_settings_v1";

export function AccessibilityProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [settings, setSettings] =
        useState<AccessibilitySettings>(defaultSettings);
    const [isLoading, setIsLoading] = useState(true);

    // Load settings from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (stored) {
                setSettings({ ...defaultSettings, ...JSON.parse(stored) });
            }
        } catch (e) {
            console.error("Failed to load accessibility settings:", e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Update localStorage and apply classes whenever settings change
    useEffect(() => {
        if (isLoading) return;

        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));

            // Apply classes and CSS variables to document.body
            const body = document.body;
            const doc = document.documentElement;

            // Smart Contrast (Implementation pending specific design system hooks, for now toggle class)
            body.classList.toggle("a11y-smart-contrast", settings.smartContrast);

            // Contrast Plus
            body.classList.toggle("a11y-contrast-plus", settings.contrastPlus);

            // Text Scale
            // We explicitly remove classes to avoid conflicts
            body.classList.remove("a11y-text-115", "a11y-text-125");
            if (settings.textScale === 1.15) {
                body.classList.add("a11y-text-115");
                doc.style.setProperty("--font-scale", "1.15");
            } else if (settings.textScale === 1.25) {
                body.classList.add("a11y-text-125");
                doc.style.setProperty("--font-scale", "1.25");
            } else {
                doc.style.setProperty("--font-scale", "1");
            }

            // Highlight Links
            body.classList.toggle("a11y-highlight-links", settings.highlightLinks);

            // Pause Animations
            body.classList.toggle("a11y-paused", settings.pauseAnimations);

            // Focus Highlight
            body.classList.toggle("a11y-focus-highlight", settings.focusHighlight);

            // Insuit Enhancements
            // Cursor
            body.classList.remove("a11y-cursor-big", "a11y-reading-guide");
            if (settings.cursorType === "big") body.classList.add("a11y-cursor-big");
            if (settings.cursorType === "reading-guide") body.classList.add("a11y-reading-guide");

            // Dyslexia Font
            body.classList.toggle("a11y-font-dyslexia", settings.dyslexiaFont);

            // Highlight Headings
            body.classList.toggle("a11y-headers-highlight", settings.highlightHeadings);

            // Speak Content (handled by component effect, but class helpful for cursor state)
            body.classList.toggle("a11y-speak-content", settings.speakContent);

        } catch (e) {
            console.error("Failed to apply accessibility settings:", e);
        }
    }, [settings, isLoading]);

    const updateSetting = <K extends keyof AccessibilitySettings>(
        key: K,
        value: AccessibilitySettings[K]
    ) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
        // Force cleanup of styles immediately
        document.documentElement.style.removeProperty("--font-scale");
        document.body.classList.remove(
            "a11y-smart-contrast",
            "a11y-contrast-plus",
            "a11y-text-115",
            "a11y-text-125",
            "a11y-highlight-links",
            "a11y-paused",
            "a11y-focus-highlight",
            "a11y-cursor-big",
            "a11y-reading-guide",
            "a11y-font-dyslexia",
            "a11y-headers-highlight",
            "a11y-speak-content"
        );
        // Keyboard Navigation logic is handled by component
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    };

    return (
        <AccessibilityContext.Provider
            value={{ settings, updateSetting, resetSettings, isLoading }}
        >
            {children}
            <ReadingGuide />
            <ScreenReader />

        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (context === undefined) {
        throw new Error(
            "useAccessibility must be used within an AccessibilityProvider"
        );
    }
    return context;
}

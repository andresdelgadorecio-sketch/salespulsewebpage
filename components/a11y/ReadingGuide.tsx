"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAccessibility } from "./AccessibilityContext";

export function ReadingGuide() {
    const { settings } = useAccessibility();
    const [y, setY] = useState(0);

    useEffect(() => {
        if (settings.cursorType !== "reading-guide") return;

        const handleMouseMove = (e: MouseEvent) => {
            setY(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [settings.cursorType]);

    if (settings.cursorType !== "reading-guide") return null;

    if (typeof document === "undefined") return null;

    return createPortal(
        <div
            className="fixed left-0 w-full h-8 bg-black/20 backdrop-invert pointer-events-none z-[999999]"
            style={{
                top: Math.max(0, y - 16), // Center the guide on the cursor
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.3)", // Dim the rest of the screen
                borderTop: "2px solid #A855F7",
                borderBottom: "2px solid #A855F7"
            }}
        />,
        document.body
    );
}

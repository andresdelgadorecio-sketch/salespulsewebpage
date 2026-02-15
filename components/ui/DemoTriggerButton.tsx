"use client"

import { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface DemoTriggerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export function DemoTriggerButton({ children, className, ...props }: DemoTriggerButtonProps) {
    return (
        <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-elevenlabs-widget"))}
            className={cn(
                "bg-white text-primary font-bold px-8 py-4 rounded-full text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}

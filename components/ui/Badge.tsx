import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "success" | "warning" | "danger" | "neutral"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                    "border-transparent bg-primary/20 text-primary hover:bg-primary/30":
                        variant === "default",
                    "border-transparent bg-accent-emerald/20 text-accent-emerald hover:bg-accent-emerald/30":
                        variant === "success",
                    "border-transparent bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30":
                        variant === "warning",
                    "border-transparent bg-accent-rose/20 text-accent-rose hover:bg-accent-rose/30":
                        variant === "danger",
                    "border-slate-700 bg-slate-800 text-slate-300":
                        variant === "neutral",
                },
                className
            )}
            {...props}
        />
    )
}

export { Badge }

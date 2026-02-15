"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function StarField() {
    const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([])

    useEffect(() => {
        // Generate random stars on client-side only to avoid hydration mismatch
        const count = 50
        const newStars = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 5,
        }))
        setStars(newStars)
    }, [])

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    initial={{ opacity: 0.2, scale: 0.8 }}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeInOut",
                    }}
                    className="absolute rounded-full bg-white"
                    style={{
                        top: `${star.y}%`,
                        left: `${star.x}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
                    }}
                />
            ))}
        </div>
    )
}

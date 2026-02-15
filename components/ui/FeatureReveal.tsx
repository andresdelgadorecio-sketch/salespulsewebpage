"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

export function FeatureReaveal({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
            {children}
        </motion.div>
    )
}

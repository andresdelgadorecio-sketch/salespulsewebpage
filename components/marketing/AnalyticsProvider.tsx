"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function AnalyticsProvider() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        // This is where you would trigger a pageview event for GA4, Plausible, etc.
        // Example: window.plausible('pageview', { u: url })
        const url = pathname + searchParams.toString()
        console.log(`[Analytics] Pageview: ${url}`)
    }, [pathname, searchParams])

    return null
}

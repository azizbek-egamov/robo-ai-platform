"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  // Start with a default value (false) for server rendering
  const [isMobile, setIsMobile] = useState(false)
  // Track if component is mounted to avoid hydration mismatch
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Mark as mounted after first render
    setMounted(true)

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // During SSR and first render, return false
  // After mounting, return the actual value
  return mounted ? isMobile : false
}


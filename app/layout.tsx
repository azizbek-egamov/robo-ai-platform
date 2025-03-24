import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import EnvReminder from "./env-reminder"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "RoboLearn - Robotics & AI for Students",
  description: "Learn robotics and artificial intelligence through practical projects",
  generator: "ardentsoft.uz",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <LanguageProvider>
          <ThemeProvider>
            <EnvReminder />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

import "./globals.css"


"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "uz" | "ru" | "en"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  uz: {
    home: "Bosh sahifa",
    courses: "Kurslar",
    projects: "Loyihalar",
    tasks: "Topshiriqlar",
    resources: "Resurslar",
    news: "Yangiliklar",
    telegramBot: "Telegram bot",
    darkMode: "Tun rejimi",
    lightMode: "Kun rejimi",
    heroTitle: "Robototexnika va sun'iy intellektni o'rganing",
    heroSubtitle: "Amaliy loyihalar orqali bilim va ko'nikmalarni rivojlantiring",
    getStarted: "Boshlash",
    learnMore: "Batafsil",
    featuredCourses: "Mashhur kurslar",
    latestProjects: "So'nggi loyihalar",
    viewAll: "Barchasini ko'rish",
  },
  ru: {
    home: "Главная",
    courses: "Курсы",
    projects: "Проекты",
    tasks: "Задания",
    resources: "Ресурсы",
    news: "Новости",
    telegramBot: "Телеграм бот",
    darkMode: "Темный режим",
    lightMode: "Светлый режим",
    heroTitle: "Изучайте робототехнику и искусственный интеллект",
    heroSubtitle: "Развивайте знания и навыки через практические проекты",
    getStarted: "Начать",
    learnMore: "Подробнее",
    featuredCourses: "Популярные курсы",
    latestProjects: "��оследние проекты",
    viewAll: "Смотреть все",
  },
  en: {
    home: "Home",
    courses: "Courses",
    projects: "Projects",
    tasks: "Tasks",
    resources: "Resources",
    news: "News",
    telegramBot: "Telegram Bot",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    heroTitle: "Learn Robotics and Artificial Intelligence",
    heroSubtitle: "Develop knowledge and skills through practical projects",
    getStarted: "Get Started",
    learnMore: "Learn More",
    featuredCourses: "Featured Courses",
    latestProjects: "Latest Projects",
    viewAll: "View All",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start with a default language for server rendering
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Detect browser language
    if (typeof window !== "undefined") {
      const browserLang = navigator.language.split("-")[0] as Language
      if (browserLang === "uz" || browserLang === "ru" || browserLang === "en") {
        setLanguage(browserLang)
      }

      // Check for stored preference
      const storedLang = localStorage.getItem("language") as Language
      if (storedLang) {
        setLanguage(storedLang)
      }
    }
  }, [])

  const handleSetLanguage = (newLang: Language) => {
    setLanguage(newLang)
    if (mounted) {
      localStorage.setItem("language", newLang)
    }
  }

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}


"use client"

import { useLanguage } from "@/components/language-provider"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function NoDataMessage({
  type = "generic",
}: { type?: "generic" | "courses" | "projects" | "tasks" | "resources" | "news" }) {
  const { language } = useLanguage()

  const messages = {
    generic: {
      en: "No data available",
      ru: "Данные недоступны",
      uz: "Ma'lumotlar mavjud emas",
    },
    courses: {
      en: "No courses available",
      ru: "Курсы недоступны",
      uz: "Kurslar mavjud emas",
    },
    projects: {
      en: "No projects available",
      ru: "Проекты недоступны",
      uz: "Loyihalar mavjud emas",
    },
    tasks: {
      en: "No tasks available",
      ru: "Задания недоступны",
      uz: "Topshiriqlar mavjud emas",
    },
    resources: {
      en: "No resources available",
      ru: "Ресурсы недоступны",
      uz: "Resurslar mavjud emas",
    },
    news: {
      en: "No news available",
      ru: "Новости недоступны",
      uz: "Yangiliklar mavjud emas",
    },
  }

  const descriptions = {
    en: "The requested data could not be loaded from the server. Please try again later.",
    ru: "Запрошенные данные не могут быть загружены с сервера. Пожалуйста, повторите попытку позже.",
    uz: "So'ralgan ma'lumotlarni serverdan yuklab bo'lmadi. Iltimos, keyinroq qayta urinib ko'ring.",
  }

  return (
    <Card className="p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400 mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="text-xl font-medium mb-2">{messages[type][language]}</h2>
      <p className="text-muted-foreground">{descriptions[language]}</p>
    </Card>
  )
}


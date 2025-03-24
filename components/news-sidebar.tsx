"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BellIcon as BrandTelegram } from "lucide-react"
import { useState, useEffect } from "react"

export default function NewsSidebar({ news }) {
  const { t, language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatDate = (dateString: string) => {
    if (!mounted || typeof window === "undefined") return dateString // Return raw date during SSR

    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat(language === "en" ? "en-US" : language === "ru" ? "ru-RU" : "uz-UZ", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date)
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("news")}</CardTitle>
        </CardHeader>
        <CardContent>
          {news.length === 0 ? (
            <div className="py-2">
              <p className="text-muted-foreground text-center text-sm">
                {language === "en" && "No news available at the moment."}
                {language === "ru" && "На данный момент новости недоступны."}
                {language === "uz" && "Hozirda yangiliklar mavjud emas."}
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {news.map((item) => (
                <li key={item.id} className="border-b pb-3 last:border-0 last:pb-0">
                  <Link href={`/news/${item.id}`} className="block hover:text-primary">
                    <h3 className="font-medium">{item[`title_${language}`]}</h3>
                    <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrandTelegram className="h-5 w-5" />
            {t("telegramBot")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            {language === "en" &&
              "Stay updated with our Telegram bot. Get notifications about new courses, projects, and events."}
            {language === "ru" &&
              "Будьте в курсе с нашим Телеграм-ботом. Получайте уведомления о новых курсах, проектах и мероприятиях."}
            {language === "uz" &&
              "Telegram botimiz bilan yangilanib turing. Yangi kurslar, loyihalar va tadbirlar haqida xabarnomalar oling."}
          </p>
          <Button className="w-full" asChild>
            <a href="https://t.me/robolearn_bot" target="_blank" rel="noopener noreferrer">
              {language === "en" && "Open Telegram Bot"}
              {language === "ru" && "Открыть Телеграм бот"}
              {language === "uz" && "Telegram botni ochish"}
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { fetchNews } from "@/lib/api"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { useDateFormatter } from "@/lib/date-formatter"
import { Skeleton } from "@/components/ui/skeleton"
import ApiConnectionError from "@/components/api-connection-error"

export default function NewsPage() {
  const { language } = useLanguage()
  const { formatDate } = useDateFormatter()
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      console.log("Fetching news data...")
      const newsData = await fetchNews()
      console.log("API response for news:", newsData)

      if (newsData && newsData.results) {
        console.log("Setting news from results:", newsData.results)
        setNews(newsData.results)
      } else if (Array.isArray(newsData)) {
        console.log("Setting news from array:", newsData)
        setNews(newsData)
      } else {
        console.error("Unexpected news data format:", newsData)
        setNews([])
      }
    } catch (error) {
      console.error("Error fetching news:", error)
      setHasError(true)
      setNews([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const pageTitle = {
    en: "News & Announcements",
    ru: "Новости и объявления",
    uz: "Yangiliklar va e'lonlar",
  }

  const pageDescription = {
    en: "Stay updated with the latest news, events, and announcements from RoboLearn.",
    ru: "Будьте в курсе последних новостей, событий и объявлений от RoboLearn.",
    uz: "RoboLearn'dan eng so'nggi yangiliklar, tadbirlar va e'lonlar bilan tanishing.",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{pageTitle[language]}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{pageDescription[language]}</p>
          </div>

          {hasError && <ApiConnectionError onRetry={fetchData} />}

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/4 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                {language === "en" && "No news available at the moment."}
                {language === "ru" && "На данный момент новости недоступны."}
                {language === "uz" && "Hozirda yangiliklar mavjud emas."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {news.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item[`title_${language}`]}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(item.date, language === "en" ? "en-US" : language === "ru" ? "ru-RU" : "uz-UZ", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      {item[`summary_${language}`] ||
                        (language === "en"
                          ? "Click to read more about this news item."
                          : language === "ru"
                            ? "Нажмите, чтобы узнать больше об этой новости."
                            : "Bu yangilik haqida ko'proq ma'lumot olish uchun bosing.")}
                    </p>
                    <Button asChild>
                      <Link href={`/news/${item.id}`}>
                        {language === "en" && "Read More"}
                        {language === "ru" && "Читать далее"}
                        {language === "uz" && "Batafsil"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}


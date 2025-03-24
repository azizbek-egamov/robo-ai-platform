"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Download } from "lucide-react"
import Image from "next/image"

export default function ClientResourcePage({ resource, category }) {
  const { language } = useLanguage()

  const pageTitle = {
    en: "Resource Details",
    ru: "Детали ресурса",
    uz: "Resurs tafsilotlari",
  }

  if (!resource) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {language === "en" && "Resource not found"}
              {language === "ru" && "Ресурс не найден"}
              {language === "uz" && "Resurs topilmadi"}
            </h1>
            <Button asChild>
              <Link href="/resources">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "en" && "Back to Resources"}
                {language === "ru" && "Назад к ресурсам"}
                {language === "uz" && "Resurslarga qaytish"}
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Ensure we have the title and description in all languages
  const title = resource[`title_${language}`] || resource.title_en || "Resource"
  const description = resource[`description_${language}`] || resource.description_en || ""
  const content = resource[`content_${language}`] || resource.content_en || ""

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Button variant="outline" asChild className="mb-6">
            <Link href="/resources">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === "en" && "Back to Resources"}
              {language === "ru" && "Назад к ресурсам"}
              {language === "uz" && "Resurslarga qaytish"}
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resource.image && (
                <div className="relative w-full h-64 rounded-md overflow-hidden">
                  <Image
                    src={resource.image || "/placeholder.svg?height=300&width=500"}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <p>{description}</p>
              {content && (
                <div className="mt-6">
                  <h3 className="text-xl font-medium mb-2">
                    {language === "en" && "Content"}
                    {language === "ru" && "Содержание"}
                    {language === "uz" && "Tarkib"}
                  </h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{content}</p>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-4 mt-6">
                {resource.external_link && (
                  <Button asChild className="flex items-center gap-2">
                    <Link
                      href={resource.external_link}
                      target={resource.is_external ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                    >
                      {resource.is_external && <ExternalLink className="h-4 w-4" />}
                      {resource.is_downloadable && <Download className="h-4 w-4" />}
                      {language === "en" && (resource.is_downloadable ? "Download Resource" : "View Resource")}
                      {language === "ru" && (resource.is_downloadable ? "Скачать ресурс" : "Смотреть ресурс")}
                      {language === "uz" && (resource.is_downloadable ? "Resursni yuklab olish" : "Resursni ko'rish")}
                    </Link>
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link href={`/resources/${category}`}>
                    {language === "en" && `View All ${category.charAt(0).toUpperCase() + category.slice(1)}`}
                    {language === "ru" &&
                      `Смотреть все ${
                        category === "tutorials"
                          ? "руководства"
                          : category === "videos"
                            ? "видео"
                            : category === "books"
                              ? "книги"
                              : "загрузки"
                      }`}
                    {language === "uz" &&
                      `Barcha ${
                        category === "tutorials"
                          ? "qo'llanmalar"
                          : category === "videos"
                            ? "videolar"
                            : category === "books"
                              ? "kitoblar"
                              : "yuklamalar"
                      }ni ko'rish`}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}


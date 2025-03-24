"use client"

import { CardFooter } from "@/components/ui/card"

import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Video, Book, Download, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function ClientResourcesPage({ initialResources }) {
  const { t, language } = useLanguage()

  const resourceCategories = {
    en: [
      { id: "tutorials", name: "Tutorials", icon: <FileText className="h-4 w-4" /> },
      { id: "videos", name: "Video Lessons", icon: <Video className="h-4 w-4" /> },
      { id: "books", name: "Books", icon: <Book className="h-4 w-4" /> },
      { id: "downloads", name: "Downloads", icon: <Download className="h-4 w-4" /> },
    ],
    ru: [
      { id: "tutorials", name: "Руководства", icon: <FileText className="h-4 w-4" /> },
      { id: "videos", name: "Видеоуроки", icon: <Video className="h-4 w-4" /> },
      { id: "books", name: "Книги", icon: <Book className="h-4 w-4" /> },
      { id: "downloads", name: "Загрузки", icon: <Download className="h-4 w-4" /> },
    ],
    uz: [
      { id: "tutorials", name: "Qo'llanmalar", icon: <FileText className="h-4 w-4" /> },
      { id: "videos", name: "Video darslar", icon: <Video className="h-4 w-4" /> },
      { id: "books", name: "Kitoblar", icon: <Book className="h-4 w-4" /> },
      { id: "downloads", name: "Yuklamalar", icon: <Download className="h-4 w-4" /> },
    ],
  }

  const pageTitle = {
    en: "Learning Resources",
    ru: "Учебные материалы",
    uz: "O'quv materiallari",
  }

  const pageDescription = {
    en: "Access our comprehensive collection of tutorials, videos, books, and downloadable resources to enhance your learning.",
    ru: "Получите доступ к нашей обширной коллекции руководств, видео, книг и загружаемых ресурсов для улучшения вашего обучения.",
    uz: "O'rganishingizni yaxshilash uchun qo'llanmalar, videolar, kitoblar va yuklab olinadigan resurslarning keng to'plamiga kiring.",
  }

  const getCategoryResources = (category) => {
    return initialResources.filter((resource) => resource.category === category)
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

          <Tabs defaultValue="tutorials" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              {resourceCategories[language].map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  {category.icon}
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="tutorials">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCategoryResources("tutorials").map((resource) => (
                  <Card key={resource.id} className="flex flex-col h-full overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={resource.image || "/placeholder.svg"}
                        alt={resource[`title_${language}`]}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{resource[`title_${language}`]}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{resource[`description_${language}`]}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/resources/tutorials/${resource.id}`}>
                          {language === "en" && "Read Tutorial"}
                          {language === "ru" && "Читать руководство"}
                          {language === "uz" && "Qo'llanmani o'qish"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCategoryResources("videos").map((resource) => (
                  <Card key={resource.id} className="flex flex-col h-full overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={resource.image || "/placeholder.svg"}
                        alt={resource[`title_${language}`]}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-3">
                          <Video className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{resource[`title_${language}`]}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{resource[`description_${language}`]}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full" variant={resource.external_link ? "outline" : "default"}>
                        <Link
                          href={resource.external_link || `/resources/videos/${resource.id}`}
                          target={resource.external_link ? "_blank" : "_self"}
                          className="flex items-center gap-2"
                        >
                          {resource.external_link ? <ExternalLink className="h-4 w-4" /> : null}
                          {language === "en" && "Watch Video"}
                          {language === "ru" && "Смотреть видео"}
                          {language === "uz" && "Videoni ko'rish"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="books">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCategoryResources("books").map((resource) => (
                  <Card key={resource.id} className="flex flex-col h-full overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={resource.image || "/placeholder.svg"}
                        alt={resource[`title_${language}`]}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{resource[`title_${language}`]}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{resource[`description_${language}`]}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/resources/books/${resource.id}`}>
                          {language === "en" && "Read Book"}
                          {language === "ru" && "Читать книгу"}
                          {language === "uz" && "Kitobni o'qish"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="downloads">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCategoryResources("downloads").map((resource) => (
                  <Card key={resource.id} className="flex flex-col h-full">
                    <CardHeader>
                      <CardTitle>{resource[`title_${language}`]}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{resource[`description_${language}`]}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full" variant="outline">
                        <Link href={resource.external_link} className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          {language === "en" && "Download"}
                          {language === "ru" && "Скачать"}
                          {language === "uz" && "Yuklab olish"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}


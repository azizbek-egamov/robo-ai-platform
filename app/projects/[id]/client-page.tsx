"use client"

import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, Download, FileText, PenToolIcon as Tool, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Xavfsiz ma'lumot olish uchun yordamchi funksiya
function getSafeValue(obj, path, defaultValue = "") {
  if (!obj) return defaultValue

  const keys = path.split(".")
  let result = obj

  for (const key of keys) {
    if (result === undefined || result === null) return defaultValue
    result = result[key]
  }

  return result !== undefined && result !== null ? result : defaultValue
}

export default function ClientProjectPage({ project }) {
  console.log("Project data in client component:", project)

  const { language } = useLanguage()

  // Agar project undefined bo'lsa, xatolik xabarini ko'rsatish
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-medium mb-2">
              {language === "en" ? "Project not found" : language === "ru" ? "Проект не найден" : "Loyiha topilmadi"}
            </h2>
            <Button asChild className="mt-4">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "en"
                  ? "Back to Projects"
                  : language === "ru"
                    ? "Назад к проектам"
                    : "Loyihalarga qaytish"}
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  // Ma'lumotlarni xavfsiz olish
  const projectTitle = getSafeValue(project, `title.${language}`, "Project")
  const projectDescription = getSafeValue(project, `description.${language}`, "")
  const projectDetailedDescription = getSafeValue(project, `detailedDescription.${language}`, "")
  const projectDifficulty = getSafeValue(project, `difficulty.${language}`, "Beginner")
  const projectTagsList = Array.isArray(project.tags_list) ? project.tags_list : []
  const projectSteps = Array.isArray(getSafeValue(project, `steps.${language}`, []))
    ? getSafeValue(project, `steps.${language}`, [])
    : []
  const projectMaterials = Array.isArray(getSafeValue(project, `materials.${language}`, []))
    ? getSafeValue(project, `materials.${language}`, [])
    : []
  const projectCodeSnippet = getSafeValue(project, "codeSnippet", "// No code snippet available")
  const projectImage = getSafeValue(project, "image", "/placeholder.svg")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Button variant="outline" asChild className="mb-6">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === "en" && "Back to Projects"}
              {language === "ru" && "Назад к проектам"}
              {language === "uz" && "Loyihalarga qaytish"}
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
                <Image src={projectImage || "/placeholder.svg"} alt={projectTitle} fill className="object-cover" />
              </div>

              <h1 className="text-3xl font-bold mb-4">{projectTitle}</h1>

              <div className="flex flex-wrap gap-2 mb-6">
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${getDifficultyColor(
                    getSafeValue(project, `difficulty.${language}`, "beginner").toLowerCase(),
                  )}`}
                >
                  {projectDifficulty}
                </span>
                {projectTagsList.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <p className="text-lg">{projectDetailedDescription}</p>
              </div>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {language === "en" && "Project Overview"}
                    {language === "ru" && "Обзор проекта"}
                    {language === "uz" && "Loyiha haqida"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">
                        {language === "en" && "Difficulty"}
                        {language === "ru" && "Сложность"}
                        {language === "uz" && "Qiyinlik"}
                      </h3>
                      <p className="text-sm">{projectDifficulty}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">
                        {language === "en" && "Technologies"}
                        {language === "ru" && "Технологии"}
                        {language === "uz" && "Texnologiyalar"}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {projectTagsList.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">
                        {language === "en" && "Estimated Time"}
                        {language === "ru" && "Примерное время"}
                        {language === "uz" && "Taxminiy vaqt"}
                      </h3>
                      <p className="text-sm">
                        {language === "en" && "2-4 hours"}
                        {language === "ru" && "2-4 часа"}
                        {language === "uz" && "2-4 soat"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full mb-6">
                {language === "en" && "Start This Project"}
                {language === "ru" && "Начать этот проект"}
                {language === "uz" && "Ushbu loyihani boshlash"}
              </Button>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "en" && "Related Projects"}
                    {language === "ru" && "Похожие проекты"}
                    {language === "uz" && "O'xshash loyihalar"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {/* This would be populated with actual related projects */}
                    <li className="border-b pb-2 last:border-0 last:pb-0">
                      <Link href="/projects/1" className="hover:text-primary block">
                        {language === "en" && "Line Following Robot"}
                        {language === "ru" && "Робот, следующий по линии"}
                        {language === "uz" && "Chiziq bo'ylab harakatlanuvchi robot"}
                      </Link>
                    </li>
                    <li className="border-b pb-2 last:border-0 last:pb-0">
                      <Link href="/projects/2" className="hover:text-primary block">
                        {language === "en" && "Voice Controlled Robot"}
                        {language === "ru" && "Робот с голосовым управлением"}
                        {language === "uz" && "Ovoz bilan boshqariladigan robot"}
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="steps" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="steps" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                {language === "en" && "Project Steps"}
                {language === "ru" && "Шаги проекта"}
                {language === "uz" && "Loyiha bosqichlari"}
              </TabsTrigger>
              <TabsTrigger value="materials" className="flex items-center gap-2">
                <Tool className="h-4 w-4" />
                {language === "en" && "Materials"}
                {language === "ru" && "Материалы"}
                {language === "uz" && "Materiallar"}
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {language === "en" && "Code"}
                {language === "ru" && "Код"}
                {language === "uz" && "Kod"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="steps">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "en" && "Step-by-Step Instructions"}
                    {language === "ru" && "Пошаговые инструкции"}
                    {language === "uz" && "Bosqichma-bosqich ko'rsatmalar"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {projectSteps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{getSafeValue(step, "title", "")}</h3>
                          <p className="text-muted-foreground">{getSafeValue(step, "description", "")}</p>
                        </div>
                      </div>
                    ))}

                    {projectSteps.length === 0 && (
                      <p className="text-muted-foreground text-center py-4">
                        {language === "en" && "No step-by-step instructions available for this project."}
                        {language === "ru" && "Для этого проекта нет пошаговых инструкций."}
                        {language === "uz" && "Bu loyiha uchun bosqichma-bosqich ko'rsatmalar mavjud emas."}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "en" && "Required Materials"}
                    {language === "ru" && "Необходимые материалы"}
                    {language === "uz" && "Kerakli materiallar"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {projectMaterials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}

                    {projectMaterials.length === 0 && (
                      <p className="text-muted-foreground text-center py-4">
                        {language === "en" && "No materials list available for this project."}
                        {language === "ru" && "Для этого проекта нет списка материалов."}
                        {language === "uz" && "Bu loyiha uchun materiallar ro'yxati mavjud emas."}
                      </p>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="code">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "en" && "Sample Code"}
                    {language === "ru" && "Пример кода"}
                    {language === "uz" && "Namuna kod"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
                    <pre className="text-sm">
                      <code>{projectCodeSnippet}</code>
                    </pre>
                  </div>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link href="#">
                      <Download className="mr-2 h-4 w-4" />
                      {language === "en" && "Download Code"}
                      {language === "ru" && "Скачать код"}
                      {language === "uz" && "Kodni yuklab olish"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}


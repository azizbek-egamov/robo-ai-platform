"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ClientProjectsPage({ initialProjects }) {
  const { language } = useLanguage()
  const [projects] = useState(initialProjects)

  const pageTitle = {
    en: "Projects",
    ru: "Проекты",
    uz: "Loyihalar",
  }

  const pageDescription = {
    en: "Explore our collection of hands-on robotics and AI projects for students of all skill levels.",
    ru: "Изучите нашу коллекцию практических проектов по робототехнике и ИИ для студентов всех уровней подготовки.",
    uz: "Barcha malaka darajasidagi o'quvchilar uchun robototexnika va sun'iy intellekt bo'yicha amaliy loyihalar to'plamimizni o'rganing.",
  }

  const getDifficultyColor = (difficulty: string) => {
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

  const getDifficultyText = (difficulty: string) => {
    if (language === "en") {
      return difficulty === "beginner" ? "Beginner" : difficulty === "intermediate" ? "Intermediate" : "Advanced"
    } else if (language === "ru") {
      return difficulty === "beginner" ? "Начальный" : difficulty === "intermediate" ? "Средний" : "Продвинутый"
    } else {
      return difficulty === "beginner" ? "Boshlang'ich" : difficulty === "intermediate" ? "O'rta" : "Yuqori"
    }
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={project.image || "/placeholder.svg?height=300&width=600"}
                    alt={project[`title_${language}`]}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{project[`title_${language}`]}</CardTitle>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${getDifficultyColor(project.difficulty)}`}
                    >
                      {getDifficultyText(project.difficulty)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{project[`description_${language}`]}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags_list &&
                      project.tags_list.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/projects/${project.id}`}>
                      {language === "en" && "View Project"}
                      {language === "ru" && "Посмотреть проект"}
                      {language === "uz" && "Loyihani ko'rish"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


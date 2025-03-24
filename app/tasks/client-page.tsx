"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Clock, Award } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ClientTasksPage({ initialTasks }) {
  const { language } = useLanguage()
  const [tasks] = useState(initialTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  const pageTitle = {
    en: "Practical Tasks",
    ru: "Практические задания",
    uz: "Amaliy topshiriqlar",
  }

  const pageDescription = {
    en: "Complete these hands-on tasks to apply your knowledge and earn points.",
    ru: "Выполните эти практические задания, чтобы применить свои знания и заработать баллы.",
    uz: "Bilimlaringizni qo'llash va ball to'plash uchun ushbu amaliy topshiriqlarni bajaring.",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    if (language === "en") {
      return status === "completed" ? "Completed" : status === "in_progress" ? "In Progress" : "Not Started"
    } else if (language === "ru") {
      return status === "completed" ? "Завершено" : status === "in_progress" ? "В процессе" : "Не начато"
    } else {
      return status === "completed" ? "Bajarilgan" : status === "in_progress" ? "Jarayonda" : "Boshlanmagan"
    }
  }

  const getDifficultyText = (difficulty: string) => {
    if (!difficulty) return "" // Add this check for undefined difficulty

    if (language === "en") {
      return difficulty === "beginner" ? "Beginner" : difficulty === "intermediate" ? "Intermediate" : "Advanced"
    } else if (language === "ru") {
      return difficulty === "beginner" ? "Начальный" : difficulty === "intermediate" ? "Средний" : "Продвинутый"
    } else {
      return difficulty === "beginner" ? "Boshlang'ich" : difficulty === "intermediate" ? "O'rta" : "Yuqori"
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task[`title_${language}`]?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDifficulty = difficultyFilter === "all" || (task.difficulty || "") === difficultyFilter

    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{pageTitle[language]}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{pageDescription[language]}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder={
                  language === "en"
                    ? "Search tasks..."
                    : language === "ru"
                      ? "Поиск заданий..."
                      : "Topshiriqlarni qidirish..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      language === "en"
                        ? "Filter by difficulty"
                        : language === "ru"
                          ? "Фильтр по сложности"
                          : "Qiyinlik bo'yicha filtrlash"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === "en" && "All Difficulties"}
                    {language === "ru" && "Все уровни сложности"}
                    {language === "uz" && "Barcha qiyinliklar"}
                  </SelectItem>
                  <SelectItem value="beginner">
                    {language === "en" && "Beginner"}
                    {language === "ru" && "Начальный"}
                    {language === "uz" && "Boshlang'ich"}
                  </SelectItem>
                  <SelectItem value="intermediate">
                    {language === "en" && "Intermediate"}
                    {language === "ru" && "Средний"}
                    {language === "uz" && "O'rta"}
                  </SelectItem>
                  <SelectItem value="advanced">
                    {language === "en" && "Advanced"}
                    {language === "ru" && "Продвинутый"}
                    {language === "uz" && "Yuqori"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-xl">{task[`title_${language}`]}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${getDifficultyColor(task.difficulty)}`}
                      >
                        {getDifficultyText(task.difficulty)}
                      </span>
                      {task.status !== "not_started" && (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}
                        >
                          {getStatusIcon(task.status)}
                          {getStatusText(task.status)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{task[`description_${language}`]}</p>
                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span>
                        {language === "en" && `${task.points} points`}
                        {language === "ru" && `${task.points} баллов`}
                        {language === "uz" && `${task.points} ball`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>{task[`estimated_time_${language}`]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>
                        {language === "en" && "Related to Course #" + task.related_course}
                        {language === "ru" && "Связано с курсом #" + task.related_course}
                        {language === "uz" && "Kurs #" + task.related_course + " bilan bog'liq"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/tasks/${task.id}`}>
                      {task.status === "completed" ? (
                        <>
                          {language === "en" && "View Solution"}
                          {language === "ru" && "Посмотреть решение"}
                          {language === "uz" && "Yechimni ko'rish"}
                        </>
                      ) : task.status === "in_progress" ? (
                        <>
                          {language === "en" && "Continue Task"}
                          {language === "ru" && "Продолжить задание"}
                          {language === "uz" && "Topshiriqni davom ettirish"}
                        </>
                      ) : (
                        <>
                          {language === "en" && "Start Task"}
                          {language === "ru" && "Начать задание"}
                          {language === "uz" && "Topshiriqni boshlash"}
                        </>
                      )}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                {language === "en" && "No tasks found matching your criteria."}
                {language === "ru" && "Не найдено заданий, соответствующих вашим критериям."}
                {language === "uz" && "Mezonlaringizga mos topshiriqlar topilmadi."}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}


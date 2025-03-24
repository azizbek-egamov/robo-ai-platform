"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AlertCircle } from "lucide-react"

export default function ClientCoursesPage({ initialCourses }) {
  console.log("ClientCoursesPage received initialCourses:", initialCourses)
  const { t, language } = useLanguage()
  const [courses] = useState(initialCourses || []) // Ensure courses is never undefined

  // Log all courses to see what we're working with
  useEffect(() => {
    console.log("Courses in state:", courses)
    if (courses && courses.length > 0) {
      console.log("First course difficulty:", courses[0].difficulty)
    }
  }, [courses])

  const courseCategories = {
    en: [
      { id: "all", name: "All Courses" },
      { id: "beginner", name: "Beginner" },
      { id: "intermediate", name: "Intermediate" },
      { id: "advanced", name: "Advanced" },
    ],
    ru: [
      { id: "all", name: "Все курсы" },
      { id: "beginner", name: "Начальный" },
      { id: "intermediate", name: "Средний" },
      { id: "advanced", name: "Продвинутый" },
    ],
    uz: [
      { id: "all", name: "Barcha kurslar" },
      { id: "beginner", name: "Boshlang'ich" },
      { id: "intermediate", name: "O'rta" },
      { id: "advanced", name: "Yuqori" },
    ],
  }

  const pageTitle = {
    en: "Courses",
    ru: "Курсы",
    uz: "Kurslar",
  }

  const pageDescription = {
    en: "Explore our comprehensive range of robotics and AI courses designed for students of all levels.",
    ru: "Изучите наш комплексный набор курсов по робототехнике и ИИ, разработанных для студентов всех уровней.",
    uz: "Barcha darajadagi o'quvchilar uchun mo'ljallangan robototexnika va sun'iy intellekt kurslarimizning keng doirasini o'rganing.",
  }

  const noDataMessage = {
    en: "No courses available. Please check back later.",
    ru: "Курсы недоступны. Пожалуйста, проверьте позже.",
    uz: "Kurslar mavjud emas. Iltimos, keyinroq tekshiring.",
  }

  // Modified filterByCategory function to be more flexible
  const filterByCategory = (category) => {
    console.log(`Filtering by category: "${category}"`)
    console.log("All courses:", courses)

    // Agar kurslar bo'sh bo'lsa, bo'sh massiv qaytarish
    if (!courses || courses.length === 0) {
      console.log("No courses available to filter")
      return []
    }

    // "all" kategoriyasi uchun barcha kurslarni qaytarish
    if (category === "all") {
      return courses
    }

    // Har bir kursni tekshirish va debug ma'lumotlarini chiqarish
    const filtered = courses.filter((course) => {
      console.log(`Course ID ${course.id}:`, {
        difficulty: course.difficulty,
        category: category,
        match:
          course.difficulty === category ||
          (course.difficulty && course.difficulty.toLowerCase() === category.toLowerCase()),
      })

      // Kengaytirilgan taqqoslash - case-insensitive va null/undefined tekshirish
      if (!course.difficulty) {
        return false
      }

      return course.difficulty.toLowerCase() === category.toLowerCase()
    })

    console.log(`Found ${filtered.length} courses for category "${category}"`)
    return filtered
  }

  // Function to render all courses without filtering
  const renderAllCourses = () => {
    console.log("Rendering all courses:", courses)

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          console.log(`Rendering course ${course.id}:`, {
            title: course[`title_${language}`],
            difficulty: course.difficulty,
          })

          return (
            <Card key={course.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={course.image || "/placeholder.svg?height=200&width=300"}
                  alt={course[`title_${language}`]}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{course[`title_${language}`]}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{course[`description_${language}`]}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {course[`duration_${language}`]}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/courses/${course.id}`}>
                    {language === "en" && "Enroll Now"}
                    {language === "ru" && "Записаться"}
                    {language === "uz" && "Ro'yxatdan o'tish"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    )
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

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-medium mb-2">{noDataMessage[language]}</h2>
              <p className="text-muted-foreground">
                {language === "en" && "The courses data could not be loaded from the server."}
                {language === "ru" && "Данные о курсах не могут быть загружены с сервера."}
                {language === "uz" && "Kurslar ma'lumotlari serverdan yuklab olinmadi."}
              </p>
            </div>
          ) : (
            <>
              <Tabs defaultValue="all" className="mb-12">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  {courseCategories[language].map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {courseCategories[language].map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filterByCategory(category.id).map((course) => (
                        <Card key={course.id} className="overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={course.image || "/placeholder.svg?height=200&width=300"}
                              alt={course[`title_${language}`]}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardHeader>
                            <CardTitle>{course[`title_${language}`]}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">{course[`description_${language}`]}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary">
                                {course[`duration_${language}`]}
                              </span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button asChild className="w-full">
                              <Link href={`/courses/${course.id}`}>
                                {language === "en" && "Enroll Now"}
                                {language === "ru" && "Записаться"}
                                {language === "uz" && "Ro'yxatdan o'tish"}
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}

                      {filterByCategory(category.id).length === 0 && (
                        <div className="col-span-full text-center py-8">
                          <p className="text-muted-foreground">
                            {language === "en" && `No ${category.name.toLowerCase()} courses available.`}
                            {language === "ru" && `Нет доступных курсов уровня "${category.name}".`}
                            {language === "uz" && `${category.name} darajasidagi kurslar mavjud emas.`}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}


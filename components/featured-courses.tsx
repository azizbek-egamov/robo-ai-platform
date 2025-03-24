"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import NoDataMessage from "@/components/no-data-message"

export default function FeaturedCourses({ courses }) {
  // Qo'shimcha debug ma'lumotlarini qo'shish
  console.log("FeaturedCourses received courses:", courses)

  // Ensure courses is never undefined
  const coursesToDisplay = courses || []

  const { t, language } = useLanguage()

  // Har bir kurs uchun qo'shimcha tekshirish
  coursesToDisplay.forEach((course, index) => {
    console.log(`Course ${index + 1}:`, {
      id: course.id,
      title: course[`title_${language}`],
      difficulty: course.difficulty,
    })
  })

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t("featuredCourses")}</h2>
        <Button variant="ghost" asChild>
          <Link href="/courses">{t("viewAll")}</Link>
        </Button>
      </div>

      {!coursesToDisplay || coursesToDisplay.length === 0 ? (
        <NoDataMessage type="courses" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesToDisplay.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={course.image || "/placeholder.svg?height=200&width=300"}
                  alt={course[`title_${language}`] || "Course"}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{course[`title_${language}`] || "Course Title"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {course[`description_${language}`] || "No description available"}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/courses/${course.id}`}>{t("learnMore")}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
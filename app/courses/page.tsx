"use client"

import { useState, useEffect } from "react"
import { fetchCourses } from "@/lib/api"
import ClientCoursesPage from "./client-page"
import ApiConnectionError from "@/components/api-connection-error"
import { Skeleton } from "@/components/ui/skeleton"

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Update the fetchData function to log more details
  const fetchData = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      console.log("Fetching courses data...")
      // API dan ma'lumotlarni olish
      const coursesData = await fetchCourses()
      console.log("API response for courses:", coursesData)

      // Ensure we're setting courses correctly
      if (coursesData && coursesData.results) {
        console.log("Setting courses from results:", coursesData.results)

        // Har bir kursni tekshirish
        coursesData.results.forEach((course, index) => {
          console.log(`Course ${index + 1}:`, {
            id: course.id,
            title_en: course.title_en,
            title_ru: course.title_ru,
            title_uz: course.title_uz,
            difficulty: course.difficulty,
          })
        })

        setCourses(coursesData.results)
      } else if (Array.isArray(coursesData)) {
        console.log("Setting courses from array:", coursesData)
        setCourses(coursesData)
      } else {
        console.error("Unexpected courses data format:", coursesData)
        setCourses([])
      }
    } catch (error) {
      console.error("Error fetching courses:", error)
      setHasError(true)
      setCourses([]) // Ensure courses is an empty array on error
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Add logging to debug what's being passed to the client page
  console.log("Courses being passed to ClientCoursesPage:", courses)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {hasError && <ApiConnectionError onRetry={fetchData} />}
      <ClientCoursesPage initialCourses={courses} />
    </>
  )
}


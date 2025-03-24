"use client"

import { useState, useEffect } from "react"
import { fetchCourses, fetchProjects, fetchNews } from "@/lib/api"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import FeaturedCourses from "@/components/featured-courses"
import LatestProjects from "@/components/latest-projects"
import NewsSidebar from "@/components/news-sidebar"
import Footer from "@/components/footer"
import ApiConnectionError from "@/components/api-connection-error"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const [courses, setCourses] = useState([])
  const [projects, setProjects] = useState([])
  const [news, setNews] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      console.log("Fetching data for home page...")

      // API dan ma'lumotlarni olish
      const coursesData = await fetchCourses()
      const projectsData = await fetchProjects()
      const newsData = await fetchNews()

      console.log("Home page API responses received")

      // Process courses
      if (coursesData && coursesData.results) {
        console.log(`Setting ${coursesData.results.length} courses`)
        setCourses(coursesData.results)
      } else {
        console.log("No courses data available")
        setCourses([])
      }

      // Process projects
      if (projectsData && projectsData.results) {
        console.log(`Setting ${projectsData.results.length} projects`)
        setProjects(projectsData.results)
      } else {
        console.log("No projects data available")
        setProjects([])
      }

      // Process news
      if (newsData && newsData.results) {
        console.log(`Setting ${newsData.results.length} news items`)
        setNews(newsData.results)
      } else {
        console.log("No news data available")
        setNews([])
      }
    } catch (error) {
      console.error("Error in Home page:", error)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          {hasError && <ApiConnectionError onRetry={fetchData} />}

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <Skeleton className="h-8 w-48 mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-4">
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Skeleton className="h-8 w-48 mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="space-y-4">
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-[400px] w-full" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <FeaturedCourses courses={courses.slice(0, 3)} />
                <LatestProjects projects={projects.slice(0, 2)} />
              </div>
              <div className="lg:col-span-1">
                <NewsSidebar news={news.slice(0, 4)} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { fetchProjects } from "@/lib/api"
import ClientProjectsPage from "./client-page"
import ApiConnectionError from "@/components/api-connection-error"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      console.log("Fetching projects data...")
      // API dan loyihalar ro'yxatini olish
      const projectsData = await fetchProjects()
      console.log("API response for projects:", projectsData)

      if (projectsData && projectsData.results) {
        console.log("Setting projects from results:", projectsData.results)
        setProjects(projectsData.results)
      } else if (Array.isArray(projectsData)) {
        console.log("Setting projects from array:", projectsData)
        setProjects(projectsData)
      } else {
        console.error("Unexpected projects data format:", projectsData)
        setProjects([])
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
      setHasError(true)
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log("Projects being passed to ClientProjectsPage:", projects)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[1, 2, 3, 4].map((i) => (
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
      <ClientProjectsPage initialProjects={projects} />
    </>
  )
}


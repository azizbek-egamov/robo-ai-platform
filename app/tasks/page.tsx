"use client"

import { useState, useEffect } from "react"
import { fetchTasks } from "@/lib/api"
import ClientTasksPage from "./client-page"
import ApiConnectionError from "@/components/api-connection-error"
import { Skeleton } from "@/components/ui/skeleton"

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      console.log("Fetching tasks data...")
      // API dan topshiriqlar ro'yxatini olish
      const tasksData = await fetchTasks()
      console.log("API response for tasks:", tasksData)

      if (tasksData && tasksData.results) {
        console.log("Setting tasks from results:", tasksData.results)
        setTasks(tasksData.results)
      } else if (Array.isArray(tasksData)) {
        console.log("Setting tasks from array:", tasksData)
        setTasks(tasksData)
      } else {
        console.error("Unexpected tasks data format:", tasksData)
        setTasks([])
      }
    } catch (error) {
      console.error("Error fetching tasks:", error)
      setHasError(true)
      setTasks([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log("Tasks being passed to ClientTasksPage:", tasks)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
      <ClientTasksPage initialTasks={tasks} />
    </>
  )
}


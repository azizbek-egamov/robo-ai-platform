"use client"

import { useState, useEffect } from "react"
import { fetchResources } from "@/lib/api"
import ClientResourcesPage from "./client-page"
import ApiConnectionError from "@/components/api-connection-error"
import { Skeleton } from "@/components/ui/skeleton"

export default function ResourcesPage() {
  const [resources, setResources] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      console.log("Fetching resources data...")
      // API dan resurslar ro'yxatini olish
      const resourcesData = await fetchResources()
      console.log("API response for resources:", resourcesData)

      if (resourcesData && resourcesData.results) {
        console.log("Setting resources from results:", resourcesData.results)
        setResources(resourcesData.results)
      } else if (Array.isArray(resourcesData)) {
        console.log("Setting resources from array:", resourcesData)
        setResources(resourcesData)
      } else {
        console.error("Unexpected resources data format:", resourcesData)
        setResources([])
      }
    } catch (error) {
      console.error("Error fetching resources:", error)
      setHasError(true)
      setResources([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log("Resources being passed to ClientResourcesPage:", resources)

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
      <ClientResourcesPage initialResources={resources} />
    </>
  )
}


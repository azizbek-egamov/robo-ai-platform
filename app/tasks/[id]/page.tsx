import { fetchTask } from "@/lib/api"
import { notFound } from "next/navigation"
import ClientTaskPage from "./client-page"

// Server Component
export default async function TaskPage({ params }) {
  try {
    console.log(`Fetching task with ID: ${params.id}`)
    // API dan topshiriq ma'lumotlarini olish
    const task = await fetchTask(params.id)

    console.log(`Task data received:`, task)

    // If no task is returned, show 404
    if (!task) {
      console.log(`Task with ID ${params.id} not found`)
      return notFound()
    }

    return <ClientTaskPage task={task} />
  } catch (error) {
    console.error(`Error fetching task ${params.id}:`, error)
    notFound()
  }
}


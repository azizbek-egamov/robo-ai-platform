import { fetchProject } from "@/lib/api"
import { notFound } from "next/navigation"
import ClientProjectPage from "./client-page"

// Server Component
export default async function ProjectPage({ params }) {
  try {
    // API dan loyiha ma'lumotlarini olish
    const project = await fetchProject(params.id)

    return <ClientProjectPage project={project} />
  } catch (error) {
    console.error("Error fetching project:", error)
    notFound()
  }
}


"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import NoDataMessage from "@/components/no-data-message"

export default function LatestProjects({ projects }) {
  const { t, language } = useLanguage()

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t("latestProjects")}</h2>
        <Button variant="ghost" asChild>
          <Link href="/projects">{t("viewAll")}</Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <NoDataMessage type="projects" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={project.image || "/placeholder.svg?height=200&width=300"}
                  alt={project[`title_${language}`]}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{project[`title_${language}`]}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project[`description_${language}`]}</p>
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                    {language === "en" && project.difficulty === "beginner" && "Beginner"}
                    {language === "ru" && project.difficulty === "beginner" && "Начальный"}
                    {language === "uz" && project.difficulty === "beginner" && "Boshlang'ich"}

                    {language === "en" && project.difficulty === "intermediate" && "Intermediate"}
                    {language === "ru" && project.difficulty === "intermediate" && "Средний"}
                    {language === "uz" && project.difficulty === "intermediate" && "O'rta"}

                    {language === "en" && project.difficulty === "advanced" && "Advanced"}
                    {language === "ru" && project.difficulty === "advanced" && "Продвинутый"}
                    {language === "uz" && project.difficulty === "advanced" && "Yuqori"}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/projects/${project.id}`}>{t("learnMore")}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}


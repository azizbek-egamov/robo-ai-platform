"use client"

import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Clock, Users, BookOpen, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ClientCoursePage({ course }) {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Button variant="outline" asChild className="mb-6">
            <Link href="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === "en" && "Back to Courses"}
              {language === "ru" && "Назад к курсам"}
              {language === "uz" && "Kurslarga qaytish"}
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
                <Image
                  src={course.image || "/placeholder.svg?height=400&width=800"}
                  alt={course[`title_${language}`]}
                  fill
                  className="object-cover"
                />
              </div>

              <h1 className="text-3xl font-bold mb-4">{course[`title_${language}`]}</h1>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">
                  {language === "en" && course.difficulty === "beginner" && "Beginner"}
                  {language === "ru" && course.difficulty === "beginner" && "Начальный"}
                  {language === "uz" && course.difficulty === "beginner" && "Boshlang'ich"}

                  {language === "en" && course.difficulty === "intermediate" && "Intermediate"}
                  {language === "ru" && course.difficulty === "intermediate" && "Средний"}
                  {language === "uz" && course.difficulty === "intermediate" && "O'rta"}

                  {language === "en" && course.difficulty === "advanced" && "Advanced"}
                  {language === "ru" && course.difficulty === "advanced" && "Продвинутый"}
                  {language === "uz" && course.difficulty === "advanced" && "Yuqori"}
                </Badge>
                <Badge variant="outline">{course[`duration_${language}`]}</Badge>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <p className="text-lg">{course[`detailed_description_${language}`]}</p>
              </div>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {language === "en" && "Course Details"}
                    {language === "ru" && "Детали курса"}
                    {language === "uz" && "Kurs tafsilotlari"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-sm">
                          {language === "en" && "Start Date"}
                          {language === "ru" && "Дата начала"}
                          {language === "uz" && "Boshlanish sanasi"}
                        </h3>
                        <p>{course[`start_date_${language}`]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-sm">
                          {language === "en" && "Schedule"}
                          {language === "ru" && "Расписание"}
                          {language === "uz" && "Jadval"}
                        </h3>
                        <p>{course[`schedule_${language}`]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-sm">
                          {language === "en" && "Class Size"}
                          {language === "ru" && "Размер класса"}
                          {language === "uz" && "Sinf hajmi"}
                        </h3>
                        <p>
                          {language === "en" && `${course.max_students} students max`}
                          {language === "ru" && `Максимум ${course.max_students} студентов`}
                          {language === "uz" && `Maksimum ${course.max_students} o'quvchi`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-sm">
                          {language === "en" && "Duration"}
                          {language === "ru" && "Продолжительность"}
                          {language === "uz" && "Davomiyligi"}
                        </h3>
                        <p>{course[`duration_${language}`]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-sm">
                          {language === "en" && "Certificate"}
                          {language === "ru" && "Сертификат"}
                          {language === "uz" && "Sertifikat"}
                        </h3>
                        <p>
                          {language === "en" && "Certificate of Completion"}
                          {language === "ru" && "Сертификат об окончании"}
                          {language === "uz" && "Tugatish sertifikati"}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-center mb-2">
                        <span className="text-2xl font-bold">{course[`price_${language}`]}</span>
                      </div>
                      <Button asChild className="w-full">
                        <Link href={`/enroll?course=${course.id}`}>
                          {language === "en" && "Enroll Now"}
                          {language === "ru" && "Записаться"}
                          {language === "uz" && "Ro'yxatdan o'tish"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {course.instructors && course.instructors.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "en" && "Instructor"}
                      {language === "ru" && "Преподаватель"}
                      {language === "uz" && "O'qituvchi"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-muted mb-4 overflow-hidden relative">
                        <Image
                          src={course.instructors[0].photo || "/placeholder.svg?height=96&width=96"}
                          alt={course.instructors[0].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-lg">{course.instructors[0].name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{course.instructors[0][`title_${language}`]}</p>
                      <p className="text-sm">{course.instructors[0][`bio_${language}`]}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <Tabs defaultValue="syllabus" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="syllabus">
                {language === "en" && "Course Syllabus"}
                {language === "ru" && "Программа курса"}
                {language === "uz" && "Kurs dasturi"}
              </TabsTrigger>
              <TabsTrigger value="requirements">
                {language === "en" && "Requirements"}
                {language === "ru" && "Требования"}
                {language === "uz" && "Talablar"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="syllabus">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "en" && "Course Syllabus"}
                    {language === "ru" && "Программа курса"}
                    {language === "uz" && "Kurs dasturi"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {course.syllabus_items &&
                      course.syllabus_items.map((week) => (
                        <div key={week.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <h3 className="font-bold text-lg mb-2">
                            {language === "en" && `Week ${week.week}: ${week.title_en}`}
                            {language === "ru" && `Неделя ${week.week}: ${week.title_ru}`}
                            {language === "uz" && `${week.week}-hafta: ${week.title_uz}`}
                          </h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {week.topics &&
                              week.topics.map((topic) => <li key={topic.id}>{topic[`topic_${language}`]}</li>)}
                          </ul>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "en" && "Course Requirements"}
                    {language === "ru" && "Требования к курсу"}
                    {language === "uz" && "Kurs talablari"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {language === "en" && (
                      <>
                        <li>No prior robotics experience required</li>
                        <li>Basic computer skills</li>
                        <li>Laptop with internet connection</li>
                        <li>Interest in robotics and willingness to learn</li>
                        <li>All materials and components will be provided during the course</li>
                      </>
                    )}
                    {language === "ru" && (
                      <>
                        <li>Предварительный опыт в робототехнике не требуется</li>
                        <li>Базовые компьютерные навыки</li>
                        <li>Ноутбук с подключением к интернету</li>
                        <li>Интерес к робототехнике и желание учиться</li>
                        <li>Все материалы и компоненты будут предоставлены во время курса</li>
                      </>
                    )}
                    {language === "uz" && (
                      <>
                        <li>Oldingi robototexnika tajribasi talab qilinmaydi</li>
                        <li>Asosiy kompyuter ko'nikmalari</li>
                        <li>Internet ulanishiga ega noutbuk</li>
                        <li>Robototexnikaga qiziqish va o'rganish istagi</li>
                        <li>Barcha materiallar va komponentlar kurs davomida taqdim etiladi</li>
                      </>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}


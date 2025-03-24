"use client"

import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: "John Smith",
    role: "Founder & Lead Instructor",
    bio: "John has over 10 years of experience in robotics education and has developed curriculum for schools across the country.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Maria Rodriguez",
    role: "AI Curriculum Developer",
    bio: "Maria holds a PhD in Computer Science with a focus on machine learning and has worked on AI projects for major tech companies.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Ahmed Hassan",
    role: "Robotics Engineer",
    bio: "Ahmed specializes in designing and building educational robots that are both affordable and effective for teaching core concepts.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
  },
]

export default function AboutPage() {
  const { language } = useLanguage()

  const pageContent = {
    en: {
      title: "About Us",
      subtitle: "Empowering students through robotics and AI education",
      mission: {
        title: "Our Mission",
        content:
          "Our mission is to make robotics and artificial intelligence education accessible to all students. We believe that hands-on learning through practical projects is the most effective way to develop skills in these cutting-edge fields.",
      },
      vision: {
        title: "Our Vision",
        content:
          "We envision a future where every student has the opportunity to learn about robotics and AI, regardless of their background or resources. By providing high-quality educational content in multiple languages, we aim to break down barriers to learning and inspire the next generation of innovators.",
      },
      approach: {
        title: "Our Approach",
        content:
          "We focus on practical, project-based learning that allows students to apply theoretical knowledge in real-world scenarios. Our curriculum is designed to be engaging, challenging, and accessible to students of all skill levels.",
      },
      team: {
        title: "Our Team",
        members: teamMembers,
      },
      history: {
        title: "Our History",
        content:
          "Founded in 2018, RoboLearn began as a small workshop series in local schools. Since then, we have grown to reach thousands of students through our online platform and in-person events. Our commitment to quality education and accessibility has remained at the core of everything we do.",
      },
    },
    ru: {
      title: "О нас",
      subtitle: "Расширение возможностей студентов через обучение робототехнике и ИИ",
      mission: {
        title: "Наша миссия",
        content:
          "Наша миссия — сделать образование в области робототехники и искусственного интеллекта доступным для всех студентов. Мы считаем, что практическое обучение через практические проекты — наиболее эффективный способ развития навыков в этих передовых областях.",
      },
      vision: {
        title: "Наше видение",
        content:
          "Мы представляем будущее, в котором каждый студент имеет возможность изучать робототехнику и ИИ, независимо от его происхождения или ресурсов. Предоставляя высококачественный образовательный контент на нескольких языках, мы стремимся устранить барьеры для обучения и вдохновить следующее поколение новаторов.",
      },
      approach: {
        title: "Наш подход",
        content:
          "Мы фокусируемся на практическом, проектном обучении, которое позволяет студентам применять теоретические знания в реальных сценариях. Наша учебная программа разработана так, чтобы быть увлекательной, сложной и доступной для студентов всех уровней подготовки.",
      },
      team: {
        title: "Наша команда",
        members: teamMembers,
      },
      history: {
        title: "Наша история",
        content:
          "Основанный в 2018 году, RoboLearn начинался как серия небольших семинаров в местных школах. С тех пор мы выросли и охватили тысячи студентов через нашу онлайн-платформу и очные мероприятия. Наша приверженность качественному образованию и доступности остается в основе всего, что мы делаем.",
      },
    },
    uz: {
      title: "Biz haqimizda",
      subtitle: "Robototexnika va sun'iy intellekt ta'limi orqali o'quvchilarni qo'llab-quvvatlash",
      mission: {
        title: "Bizning vazifamiz",
        content:
          "Bizning vazifamiz robototexnika va sun'iy intellekt ta'limini barcha o'quvchilar uchun qulay qilishdir. Biz amaliy loyihalar orqali amaliy o'rganish bu ilg'or sohalarda ko'nikmalarni rivojlantirishning eng samarali usuli deb hisoblaymiz.",
      },
      vision: {
        title: "Bizning ko'rinishimiz",
        content:
          "Biz har bir o'quvchi o'z kelib chiqishi yoki resurslaridan qat'i nazar, robototexnika va sun'iy intellekt haqida o'rganish imkoniyatiga ega bo'lgan kelajakni tasavvur qilamiz. Bir nechta tillarda yuqori sifatli ta'lim kontentini taqdim etish orqali biz o'rganish to'siqlarini bartaraf etishga va innovatorlarning keyingi avlodini ilhomlantirish maqsad qilamiz.",
      },
      approach: {
        title: "Bizning yondashuvimiz",
        content:
          "Biz o'quvchilarga nazariy bilimlarni real stsenariylarda qo'llash imkonini beradigan amaliy, loyihaga asoslangan ta'limga e'tibor qaratamiz. Bizning o'quv dasturimiz barcha malaka darajasidagi o'quvchilar uchun qiziqarli, qiyin va qulay bo'lishi uchun ishlab chiqilgan.",
      },
      team: {
        title: "Bizning jamoamiz",
        members: teamMembers,
      },
      history: {
        title: "Bizning tarixmiz",
        content:
          "2018 yilda tashkil etilgan RoboLearn mahalliy maktablarda kichik seminarlar seriyasi sifatida boshlangan. O'shandan beri biz onlayn platformamiz va shaxsan tadbirlar orqali minglab o'quvchilarga yetib bordik. Sifatli ta'lim va qulaylikka bo'lgan sadoqatimiz biz qiladigan hamma narsaning asosida qolmoqda.",
      },
    },
  }

  const content = pageContent[language as keyof typeof pageContent]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{content.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">{content.mission.title}</h2>
                <p className="text-muted-foreground">{content.mission.content}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">{content.vision.title}</h2>
                <p className="text-muted-foreground">{content.vision.content}</p>
              </div>
            </div>
            <div>
              <div className="relative h-full min-h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Students learning robotics"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">{content.approach.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary text-xl font-bold">
                      1
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">
                    {language === "en" && "Hands-on Learning"}
                    {language === "ru" && "Практическое обучение"}
                    {language === "uz" && "Amaliy o'rganish"}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en" && "Learn by doing with practical projects and exercises."}
                    {language === "ru" && "Учитесь на практике с помощью практических проектов и упражнений."}
                    {language === "uz" && "Amaliy loyihalar va mashqlar bilan qilib o'rganing."}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary text-xl font-bold">
                      2
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">
                    {language === "en" && "Project-Based"}
                    {language === "ru" && "На основе проектов"}
                    {language === "uz" && "Loyihaga asoslangan"}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en" && "Complete real-world projects that demonstrate your skills."}
                    {language === "ru" && "Выполняйте реальные проекты, демонстрирующие ваши навыки."}
                    {language === "uz" && "Ko'nikmalaringizni namoyish etadigan real loyihalarni bajaring."}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary text-xl font-bold">
                      3
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">
                    {language === "en" && "Accessible to All"}
                    {language === "ru" && "Доступно для всех"}
                    {language === "uz" && "Barchaga qulay"}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en" && "Content available in multiple languages and difficulty levels."}
                    {language === "ru" && "Контент доступен на нескольких языках и уровнях сложности."}
                    {language === "uz" && "Kontent bir nechta tillarda va qiyinlik darajalarida mavjud."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">{content.team.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.team.members.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{content.history.title}</h2>
            <p className="text-muted-foreground">{content.history.content}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


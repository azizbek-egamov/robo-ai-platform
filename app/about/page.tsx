"use client"

import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = {
  en: [
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
  ],
  ru: [
    {
      name: "Джон Смит",
      role: "Основатель и главный инструктор",
      bio: "Джон имеет более 10 лет опыта в области образования в сфере робототехники и разработал учебные программы для школ по всей стране.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Мария Родригес",
      role: "Разработчик учебных программ по ИИ",
      bio: "Мария имеет степень доктора наук по информатике с упором на машинное обучение и работала над проектами в крупных технологических компаниях.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Ахмед Хассан",
      role: "Инженер по робототехнике",
      bio: "Ахмед специализируется на проектировании и создании образовательных роботов, которые доступны по цене и эффективны для обучения основным концепциям.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
    },
  ],
  uz: [
    {
      name: "Jon Smit",
      role: "Asoschi va Bosh Instruktor",
      bio: "Jon robototexnika ta'limida 10 yildan ortiq tajribaga ega va mamlakat bo‘ylab maktablar uchun o‘quv dasturlarini ishlab chiqqan.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Mariya Rodriges",
      role: "Sun'iy intellekt o‘quv dasturlari ishlab chiquvchisi",
      bio: "Mariya kompyuter fanlari bo‘yicha PhD darajasiga ega bo‘lib, mashinaviy o‘rganish sohasida tadqiqot olib borgan va yirik texnologik kompaniyalar uchun AI loyihalarida ishlagan.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Ahmad Hassan",
      role: "Robototexnika muhandisi",
      bio: "Ahmad o‘quvchilar uchun hamyonbop va samarali ta’lim beradigan robotlarni loyihalash va qurish bo‘yicha mutaxassis.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
    },
  ],
}

export default function AboutPage() {
  const { language } = useLanguage()

  const content = {
    title: {
      en: "About Us",
      ru: "О нас",
      uz: "Biz haqimizda",
    },
    subtitle: {
      en: "Empowering students through robotics and AI education",
      ru: "Расширение возможностей студентов через обучение робототехнике и ИИ",
      uz: "Robototexnika va sun'iy intellekt ta'limi orqali o'quvchilarni qo'llab-quvvatlash",
    },
    mission: {
      en: "Our mission is to make robotics and AI education accessible to all students...",
      ru: "Наша миссия — сделать образование в области робототехники и ИИ доступным...",
      uz: "Bizning vazifamiz robototexnika va sun'iy intellekt ta'limini qulay qilish...",
    },
    teamTitle: {
      en: "Our Team",
      ru: "Наша команда",
      uz: "Bizning jamoamiz",
    },
    // va hokazo...
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{content.title[language]}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{content.subtitle[language]}</p>
          </div>

          {/* Boshqa bo‘limlar… */}

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">{content.teamTitle[language]}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers[language].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

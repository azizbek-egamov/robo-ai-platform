"use client"

import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export default function Footer() {
  const { language } = useLanguage()

  const footerLinks = {
    en: {
      about: "About Us",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      copyright: "© 2023 RoboLearn. All rights reserved.",
    },
    ru: {
      about: "О нас",
      contact: "Контакты",
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
      copyright: "© 2023 RoboLearn. Все права защищены.",
    },
    uz: {
      about: "Biz haqimizda",
      contact: "Aloqa",
      privacy: "Maxfiylik siyosati",
      terms: "Xizmat ko'rsatish shartlari",
      copyright: "© 2023 RoboLearn. Barcha huquqlar himoyalangan.",
    },
  }

  const links = footerLinks[language as keyof typeof footerLinks]

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                RoboLearn
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              {language === "en" &&
                "An educational platform for students to learn robotics and artificial intelligence through practical projects."}
              {language === "ru" &&
                "Образовательная платформа для студентов, изучающих робототехнику и искусственный интеллект через практические проекты."}
              {language === "uz" &&
                "O'quvchilar uchun amaliy loyihalar orqali robototexnika va sun'iy intellektni o'rganish uchun ta'lim platformasi."}
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-4">
              {language === "en" && "Quick Links"}
              {language === "ru" && "Быстрые ссылки"}
              {language === "uz" && "Tezkor havolalar"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary">
                  {links.about}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary">
                  {language === "en" && "Courses"}
                  {language === "ru" && "Курсы"}
                  {language === "uz" && "Kurslar"}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary">
                  {language === "en" && "Projects"}
                  {language === "ru" && "Проекты"}
                  {language === "uz" && "Loyihalar"}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-primary">
                  {language === "en" && "Resources"}
                  {language === "ru" && "Ресурсы"}
                  {language === "uz" && "Resurslar"}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">
              {language === "en" && "Legal"}
              {language === "ru" && "Юридическая информация"}
              {language === "uz" && "Huquqiy ma'lumot"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  {links.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  {links.terms}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  {links.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">{links.copyright}</div>
      </div>
    </footer>
  )
}


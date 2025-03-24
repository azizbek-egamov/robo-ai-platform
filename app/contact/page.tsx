"use client"

import type React from "react"

import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const { language } = useLanguage()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const pageContent = {
    en: {
      title: "Contact Us",
      subtitle: "Have questions or feedback? We'd love to hear from you.",
      form: {
        name: "Your Name",
        email: "Your Email",
        subject: "Subject",
        message: "Your Message",
        submit: "Send Message",
        success: "Thank you for your message! We'll get back to you soon.",
      },
      contact: {
        title: "Contact Information",
        address: "123 Education Street, Technology Park, City",
        phone: "+1 (555) 123-4567",
        email: "info@robolearn.edu",
        hours: "Monday - Friday: 9:00 AM - 5:00 PM",
      },
    },
    ru: {
      title: "Свяжитесь с нами",
      subtitle: "Есть вопросы или отзывы? Мы будем рады услышать от вас.",
      form: {
        name: "Ваше имя",
        email: "Ваш Email",
        subject: "Тема",
        message: "Ваше сообщение",
        submit: "Отправить сообщение",
        success: "Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.",
      },
      contact: {
        title: "Контактная информация",
        address: "123 Образовательная улица, Технологический парк, Город",
        phone: "+1 (555) 123-4567",
        email: "info@robolearn.edu",
        hours: "Понедельник - Пятница: 9:00 - 17:00",
      },
    },
    uz: {
      title: "Biz bilan bog'laning",
      subtitle: "Savollaringiz yoki fikrlaringiz bormi? Sizdan eshitishni xohlaymiz.",
      form: {
        name: "Ismingiz",
        email: "Elektron pochtangiz",
        subject: "Mavzu",
        message: "Xabaringiz",
        submit: "Xabar yuborish",
        success: "Xabaringiz uchun rahmat! Tez orada siz bilan bog'lanamiz.",
      },
      contact: {
        title: "Aloqa ma'lumotlari",
        address: "123 Ta'lim ko'chasi, Texnologiya parki, Shahar",
        phone: "+1 (555) 123-4567",
        email: "info@robolearn.edu",
        hours: "Dushanba - Juma: 9:00 - 17:00",
      },
    },
  }

  const content = pageContent[language as keyof typeof pageContent]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    setFormSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{content.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{content.form.subject}</CardTitle>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">{content.form.success}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{content.form.name}</Label>
                      <Input id="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{content.form.email}</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{content.form.subject}</Label>
                      <Input id="subject" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{content.form.message}</Label>
                      <Textarea id="message" rows={5} required />
                    </div>
                    <Button type="submit" className="w-full">
                      {content.form.submit}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{content.contact.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">
                      {language === "en" && "Address"}
                      {language === "ru" && "Адрес"}
                      {language === "uz" && "Manzil"}
                    </h3>
                    <p className="text-muted-foreground">{content.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">
                      {language === "en" && "Phone"}
                      {language === "ru" && "Телефон"}
                      {language === "uz" && "Telefon"}
                    </h3>
                    <p className="text-muted-foreground">{content.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">
                      {language === "en" && "Email"}
                      {language === "ru" && "Email"}
                      {language === "uz" && "Elektron pochta"}
                    </h3>
                    <p className="text-muted-foreground">{content.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">
                      {language === "en" && "Working Hours"}
                      {language === "ru" && "Рабочие часы"}
                      {language === "uz" && "Ish vaqti"}
                    </h3>
                    <p className="text-muted-foreground">{content.contact.hours}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.0883624916537!2d69.2400392!3d41.2911298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE3JzI4LjEiTiA2OcKwMTQnMjQuMSJF!5e0!3m2!1sen!2sus!4v1616661315372!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      title="Map"
                    ></iframe>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 dark:from-blue-900/30 dark:to-green-900/30" />
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{t("heroTitle")}</h1>
            <p className="text-xl text-muted-foreground">{t("heroSubtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/courses">{t("getStarted")}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">{t("learnMore")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Carousel className="w-full h-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"
                      alt="Robotics and AI"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop"
                      alt="AI Technology"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2070&auto=format&fit=crop"
                      alt="Robotics Lab"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=2070&auto=format&fit=crop"
                      alt="AI Research"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=2070&auto=format&fit=crop"
                      alt="Robotics Engineering"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}


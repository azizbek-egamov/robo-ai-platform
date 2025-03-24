"use client"

import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function TermsPage() {
  const { language } = useLanguage()

  const pageContent = {
    en: {
      title: "Terms of Service",
      lastUpdated: "Last Updated: March 15, 2024",
      introduction: {
        title: "Introduction",
        content:
          "Welcome to RoboLearn. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use RoboLearn's website if you do not accept all of the terms and conditions stated on this page.",
      },
      intellectualProperty: {
        title: "Intellectual Property Rights",
        content:
          "Other than the content you own, under these terms, RoboLearn and/or its licensors own all the intellectual property rights and materials contained in this website. You are granted a limited license only for purposes of viewing the material contained on this website.",
      },
      restrictions: {
        title: "Restrictions",
        content: "You are specifically restricted from all of the following:",
        items: [
          "Publishing any website material in any other media",
          "Selling, sublicensing and/or otherwise commercializing any website material",
          "Publicly performing and/or showing any website material",
          "Using this website in any way that is or may be damaging to this website",
          "Using this website in any way that impacts user access to this website",
          "Using this website contrary to applicable laws and regulations, or in any way may cause harm to the website, or to any person or business entity",
          "Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this website",
        ],
      },
      userAccounts: {
        title: "Your Account",
        content:
          "If you create an account on our website, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with the account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security.",
      },
      courseEnrollment: {
        title: "Course Enrollment and Access",
        content:
          "When you enroll in a course, you gain a limited, non-exclusive, non-transferable license to access and view the course content for personal, non-commercial purposes. You may not share your account or course access with others. RoboLearn reserves the right to revoke access to courses at any time if terms are violated.",
      },
      payments: {
        title: "Payments and Refunds",
        content:
          "All payments are processed securely through our payment processors. Course fees are as stated at the time of purchase. Refunds are available within 14 days of purchase if you are not satisfied with the course, provided you have not completed more than 30% of the course content.",
      },
      userContent: {
        title: "User-Generated Content",
        content:
          "Users may post content such as project submissions, comments, and forum posts. By posting content, you grant RoboLearn a non-exclusive, worldwide, royalty-free license to use, reproduce, adapt, publish, and distribute such content. You are solely responsible for your content and must not post illegal, offensive, or infringing material.",
      },
      termination: {
        title: "Termination",
        content:
          "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.",
      },
      limitation: {
        title: "Limitation of Liability",
        content:
          "In no event shall RoboLearn, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort or otherwise. RoboLearn shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.",
      },
      indemnification: {
        title: "Indemnification",
        content:
          "You hereby indemnify to the fullest extent RoboLearn from and against any and all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.",
      },
      governing: {
        title: "Governing Law & Jurisdiction",
        content:
          "These Terms will be governed by and interpreted in accordance with the laws of the country/state where RoboLearn is based, and you submit to the non-exclusive jurisdiction of the courts located there for the resolution of any disputes.",
      },
    },
    ru: {
      title: "Условия использования",
      lastUpdated: "Последнее обновление: 15 марта 2024 г.",
      introduction: {
        title: "Введение",
        content:
          "Добро пожаловать в RoboLearn. Эти условия определяют правила и положения для использования нашего веб-сайта и услуг. Получая доступ к этому веб-сайту, мы предполагаем, что вы полностью принимаете эти условия. Не продолжайте использовать веб-сайт RoboLearn, если вы не принимаете все условия, указанные на этой странице.",
      },
      intellectualProperty: {
        title: "Права интеллектуальной собственности",
        content:
          "Кроме контента, который принадлежит вам, согласно этим условиям, RoboLearn и/или его лицензиары владеют всеми правами интеллектуальной собственности и материалами, содержащимися на этом веб-сайте. Вам предоставляется ограниченная лицензия только для просмотра материалов, содержащихся на этом веб-сайте.",
      },
      restrictions: {
        title: "Ограничения",
        content: "Вам конкретно запрещено следующее:",
        items: [
          "Публикация любых материалов веб-сайта в любых других медиа",
          "Продажа, сублицензирование и/или иная коммерциализация любых материалов веб-сайта",
          "Публичное исполнение и/или показ любых материалов веб-сайта",
          "Использование этого веб-сайта любым способом, который наносит или может нанести ущерб этому веб-сайту",
          "Использование этого веб-сайта любым способом, который влияет на доступ пользователей к этому веб-сайту",
          "Использование этого веб-сайта вопреки применимым законам и правилам или любым способом, который может причинить вред веб-сайту или любому лицу или бизнес-организации",
          "Участие в любом сборе данных, сборе урожая данных, извлечении данных или любой другой подобной деятельности в отношении этого веб-сайта",
        ],
      },
      userAccounts: {
        title: "Ваш аккаунт",
        content:
          "Если вы создаете учетную запись на нашем веб-сайте, вы несете ответственность за поддержание безопасности вашей учетной записи, и вы полностью отвечаете за все действия, которые происходят под учетной записью, и любые другие действия, предпринятые в связи с учетной записью. Вы должны немедленно уведомить нас о любом несанкционированном использовании вашей учетной записи или любых других нарушениях безопасности.",
      },
      courseEnrollment: {
        title: "Запись на курс и доступ",
        content:
          "Когда вы записываетесь на курс, вы получаете ограниченную, неисключительную, непередаваемую лицензию на доступ и просмотр содержания курса для личных, некоммерческих целей. Вы не можете делиться своей учетной записью или доступом к курсу с другими. RoboLearn оставляет за собой право отозвать доступ к курсам в любое время, если условия нарушены.",
      },
      payments: {
        title: "Платежи и возвраты",
        content:
          "Все платежи обрабатываются безопасно через наши платежные процессоры. Стоимость курса указана на момент покупки. Возврат средств доступен в течение 14 дней с момента покупки, если вы не удовлетворены курсом, при условии, что вы не завершили более 30% содержания курса.",
      },
      userContent: {
        title: "Пользовательский контент",
        content:
          "Пользователи могут публиковать контент, такой как проектные работы, комментарии и сообщения на форуме. Публикуя контент, вы предоставляете RoboLearn неисключительную, всемирную, безвозмездную лицензию на использование, воспроизведение, адаптацию, публикацию и распространение такого контента. Вы несете полную ответственность за свой контент и не должны публиковать незаконные, оскорбительные или нарушающие права материалы.",
      },
      termination: {
        title: "Прекращение",
        content:
          "Мы можем прекратить или приостановить действие вашей учетной записи и запретить доступ к Сервису немедленно, без предварительного уведомления или ответственности, по нашему собственному усмотрению, по любой причине и без ограничений, включая, но не ограничиваясь, нарушение Условий.",
      },
      limitation: {
        title: "Ограничение ответственности",
        content:
          "Ни при каких обстоятельствах RoboLearn, ни кто-либо из его должностных лиц, директоров и сотрудников не несет ответственности за что-либо, возникающее из или каким-либо образом связанное с вашим использованием этого веб-сайта, независимо от того, возникает ли такая ответственность по договору, деликту или иным образом. RoboLearn не несет ответственности за любую косвенную, последующую или специальную ответственность, возникающую из или каким-либо образом связанную с вашим использованием этого веб-сайта.",
      },
      indemnification: {
        title: "Возмещение ущерба",
        content:
          "Настоящим вы обязуетесь в полной мере возместить RoboLearn от и против любых и всех обязательств, затрат, требований, причин иска, убытков и расходов, возникающих каким-либо образом в связи с вашим нарушением любого из положений настоящих Условий.",
      },
      governing: {
        title: "Применимое право и юрисдикция",
        content:
          "Настоящие Условия регулируются и толкуются в соответствии с законами страны/штата, где базируется RoboLearn, и вы подчиняетесь неисключительной юрисдикции судов, расположенных там, для разрешения любых споров.",
      },
    },
    uz: {
      title: "Xizmat ko'rsatish shartlari",
      lastUpdated: "So'nggi yangilanish: 2024 yil 15 mart",
      introduction: {
        title: "Kirish",
        content:
          "RoboLearn'ga xush kelibsiz. Ushbu shartlar va qoidalar veb-saytimiz va xizmatlarimizdan foydalanish qoidalarini belgilaydi. Ushbu veb-saytga kirib, siz ushbu shartlar va qoidalarni to'liq qabul qilasiz deb hisoblaymiz. Agar siz ushbu sahifada ko'rsatilgan barcha shartlar va qoidalarni qabul qilmasangiz, RoboLearn veb-saytidan foydalanishni davom ettirmang.",
      },
      intellectualProperty: {
        title: "Intellektual mulk huquqlari",
        content:
          "Sizga tegishli bo'lgan kontentdan tashqari, ushbu shartlarga ko'ra, RoboLearn va/yoki uning litsenziya beruvchilari ushbu veb-saytda mavjud bo'lgan barcha intellektual mulk huquqlari va materiallariga egalik qiladi. Sizga faqat ushbu veb-saytda mavjud bo'lgan materiallarni ko'rish maqsadida cheklangan litsenziya beriladi.",
      },
      restrictions: {
        title: "Cheklovlar",
        content: "Sizga quyidagilarning barchasi maxsus taqiqlangan:",
        items: [
          "Veb-sayt materiallarini boshqa ommaviy axborot vositalarida nashr qilish",
          "Veb-sayt materiallarini sotish, sublitsenziyalash va/yoki boshqacha tijoratlashtirish",
          "Veb-sayt materiallarini ommaviy namoyish qilish va/yoki ko'rsatish",
          "Ushbu veb-saytdan unga zarar yetkazadigan yoki zarar yetkazishi mumkin bo'lgan har qanday usulda foydalanish",
          "Ushbu veb-saytdan foydalanuvchilarning unga kirishiga ta'sir qiladigan har qanday usulda foydalanish",
          "Ushbu veb-saytdan amaldagi qonunlar va qoidalarga zid ravishda yoki veb-saytga, yoki har qanday shaxs yoki biznes tashkilotiga zarar yetkazishi mumkin bo'lgan har qanday usulda foydalanish",
          "Ushbu veb-saytga nisbatan har qanday ma'lumotlarni qazib olish, ma'lumotlarni yig'ish, ma'lumotlarni ajratib olish yoki boshqa shunga o'xshash faoliyatda qatnashish",
        ],
      },
      userAccounts: {
        title: "Sizning hisobingiz",
        content:
          "Agar siz bizning veb-saytimizda hisob yaratgan bo'lsangiz, siz hisobingiz xavfsizligini saqlash uchun javobgarsiz va hisob ostida sodir bo'ladigan barcha faoliyatlar va hisob bilan bog'liq boshqa harakatlar uchun to'liq javobgarsiz. Siz hisobingizning har qanday ruxsatsiz ishlatilishi yoki xavfsizlikning boshqa buzilishlari haqida bizga darhol xabar berishingiz kerak.",
      },
      courseEnrollment: {
        title: "Kursga ro'yxatdan o'tish va kirish",
        content:
          "Kursga ro'yxatdan o'tganingizda, siz shaxsiy, tijorat bo'lmagan maqsadlarda kurs tarkibiga kirish va ko'rish uchun cheklangan, eksklyuziv bo'lmagan, o'tkazilmaydigan litsenziya olasiz. Siz o'z hisobingiz yoki kursga kirishingizni boshqalar bilan baham ko'ra olmaysiz. RoboLearn shartlar buzilgan taqdirda istalgan vaqtda kurslarga kirishni bekor qilish huquqini o'zida saqlab qoladi.",
      },
      payments: {
        title: "To'lovlar va qaytarishlar",
        content:
          "Barcha to'lovlar bizning to'lov protsessorlari orqali xavfsiz qayta ishlanadi. Kurs to'lovlari xarid qilish vaqtida ko'rsatilganidek. Agar siz kursdan qoniqmagan bo'lsangiz, kurs tarkibining 30% dan ko'pini tugatmagan bo'lsangiz, xarid qilinganidan keyin 14 kun ichida pulni qaytarish mumkin.",
      },
      userContent: {
        title: "Foydalanuvchi yaratgan kontent",
        content:
          "Foydalanuvchilar loyiha topshiriqlari, sharhlar va forum xabarlari kabi kontentlarni joylashtirishi mumkin. Kontentni joylashtirish orqali siz RoboLearn'ga bunday kontentdan foydalanish, ko'paytirish, moslashtirish, nashr qilish va tarqatish uchun eksklyuziv bo'lmagan, butun dunyo bo'ylab, royaltisiz litsenziya berasiz. Siz o'z kontentingiz uchun to'liq javobgarsiz va noqonuniy, haqoratli yoki huquqlarni buzadigan materiallarni joylashtirmasligingiz kerak.",
      },
      termination: {
        title: "Tugatish",
        content:
          "Biz sizning hisobingizni tugatishimiz yoki to'xtatishimiz va Xizmatga kirishni darhol, oldindan xabardor qilmasdan yoki javobgarliksiz, o'z ixtiyorimiz bilan, har qanday sababga ko'ra va cheklovsiz, shu jumladan, lekin Shartlarning buzilishi bilan cheklanmagan holda taqiqlashimiz mumkin.",
      },
      limitation: {
        title: "Javobgarlikni cheklash",
        content:
          "Hech qanday holatda RoboLearn, uning mansabdor shaxslari, direktorlari va xodimlari ushbu veb-saytdan foydalanishingiz natijasida yuzaga keladigan yoki har qanday tarzda bog'liq bo'lgan hech narsa uchun javobgar bo'lmaydi, bunday javobgarlik shartnoma, delikt yoki boshqa holatda bo'lishidan qat'i nazar. RoboLearn ushbu veb-saytdan foydalanishingiz natijasida yuzaga keladigan yoki har qanday tarzda bog'liq bo'lgan har qanday bilvosita, oqibatli yoki maxsus javobgarlik uchun javobgar bo'lmaydi.",
      },
      indemnification: {
        title: "Zararni qoplash",
        content:
          "Siz ushbu Shartlarning har qanday qoidalarini buzishingiz bilan bog'liq har qanday va barcha majburiyatlar, xarajatlar, talablar, da'vo sabablari, zararlar va xarajatlardan RoboLearn'ni to'liq himoya qilishni o'z zimmangizga olasiz.",
      },
      governing: {
        title: "Boshqaruvchi qonun va yurisdiksiya",
        content:
          "Ushbu Shartlar RoboLearn joylashgan mamlakat/shtat qonunlariga muvofiq boshqariladi va talqin qilinadi, va siz har qanday nizolarni hal qilish uchun u yerda joylashgan sudlarning eksklyuziv bo'lmagan yurisdiksiyasiga bo'ysunasiz.",
      },
    },
  }

  const content = pageContent[language as keyof typeof pageContent]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">{content.title}</h1>
            <p className="text-muted-foreground mb-8">{content.lastUpdated}</p>

            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold mb-4">{content.introduction.title}</h2>
                <p className="text-muted-foreground">{content.introduction.content}</p>
              </section>

              {/* Intellectual Property Rights */}
              <section>
                <h2 className="text-2xl font-bold mb-4">{content.intellectualProperty.title}</h2>
                <p className="text-muted-foreground">{content.intellectualProperty.content}</p>
              </section>

              {/* Restrictions */}
              <section>
                <h2 className="text-2xl font-bold mb-4">{content.restrictions.title}</h2>
                <p className="text-muted-foreground mb-4">{content.restrictions.content}</p>
                <ul className="list-disc pl-5 space-y-2">
                  {content.restrictions.items.map((item, index) => (
                    <li key={index} className="text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Your Account */}
              <section>
                <h2 className="text-2xl font-bold mb-4">{content.userAccounts.title}</h2>
                <p className="text-muted-foreground">{content.userAccounts.content}</p>
              </section>

              {/* Course Enrollment and Access */}
              <section>
                <h2 className="text-2xl font-bold mb-4">{content.courseEnrollment.title}</h2>
                <p className="text-muted-foreground">{content.courseEnrollment.content}</p>
              </section>

              {/* Payments and Refunds */}
              <section>
                <h2 className="text-2xl font-bold mb-4">{content.payments.title}</h2>
                <p className="text-muted-foreground">{content.payments.content}</p>
              </section>

              {/* User-Generated Content */}
              <section>
                <h2 className="text-2xl font-bold mb-4">{content.userContent.title}</h2>
                <p className="text-muted-foreground">{content.userContent.content}</p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-bold mb-4">{content.termination.title}</h2>
                <p className="text-muted-foreground">{content.termination.content}</p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-bold mb-4">{content.limitation.title}</h2>
                <p className="text-muted-foreground">{content.limitation.content}</p>
              </section>

              {/* Indemnification */}
              <section>
                <h2 className="text-2xl font-bold mb-4">{content.indemnification.title}</h2>
                <p className="text-muted-foreground">{content.indemnification.content}</p>
              </section>

              {/* Governing Law & Jurisdiction */}
              <section>
                <h2 className="text-2xl font-bold mb-4">{content.governing.title}</h2>
                <p className="text-muted-foreground">{content.governing.content}</p>
              </section>
            </div>

            <div className="mt-12 border-t pt-6">
              <Link href="/" className="text-primary hover:underline">
                {language === "en" && "Back to Home"}
                {language === "ru" && "Вернуться на главную"}
                {language === "uz" && "Bosh sahifaga qaytish"}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
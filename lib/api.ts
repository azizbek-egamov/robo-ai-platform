// API URL ni olish
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Helper function to create a fetch request with timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 8000) {
  try {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    console.log(`Fetching from: ${url}`)
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)

    console.log(`Response status: ${response.status}`)
    return response
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error)
    throw error
  }
}

// Kurslar ro'yxatini olish
export async function fetchCourses(difficulty?: string) {
  try {
    const endpoint = difficulty ? `/courses/?difficulty=${difficulty}` : "/courses/"
    console.log(`Fetching courses from: ${API_URL}${endpoint}`)

    const res = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      cache: "no-store", // Keshni o'chirib qo'yish
    })

    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`)
      throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json()
    console.log("API response for courses:", data)

    // Check if the API returns data in the expected format
    // If it's an array, use it directly; if it has a results property, use that
    let results = []
    if (Array.isArray(data)) {
      console.log("Data is an array, using directly")
      results = data
    } else if (data && typeof data === "object") {
      // If data has a results property, use it; otherwise, wrap the data in a results array
      if (data.results) {
        console.log("Data has results property, using data.results")
        results = data.results
      } else {
        console.log("Data is an object without results property, wrapping in array")
        results = [data]
      }
    }

    console.log(`Processed ${results.length} courses:`, results)
    return { results }
  } catch (error) {
    console.error("Error fetching courses:", error)
    // Return empty results
    return { results: [] }
  }
}

// Kurs tafsilotlarini olish
export async function fetchCourse(id: string) {
  try {
    console.log(`Fetching course ${id} from: ${API_URL}/courses/${id}/`)
    const res = await fetchWithTimeout(`${API_URL}/courses/${id}/`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json()
    console.log(`Course ${id} data:`, data)
    return data
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error)
    // Return null instead of mock data
    return null
  }
}

// Ro'yxatdan o'tish
export async function submitEnrollment(data: any) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/enrollments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error("Error submitting enrollment:", error)
    // Return error object instead of mock response
    throw error
  }
}

// Loyihalar ro'yxatini olish
export async function fetchProjects(difficulty?: string, tag?: string) {
  try {
    let endpoint = "/projects/"
    const params = []

    if (difficulty) params.push(`difficulty=${difficulty}`)
    if (tag) params.push(`tag=${tag}`)

    if (params.length > 0) {
      endpoint += `?${params.join("&")}`
    }

    console.log(`Fetching projects from: ${API_URL}${endpoint}`)
    const res = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json()
    console.log("API response for projects:", data)

    // Process data similar to fetchCourses
    let results = []
    if (Array.isArray(data)) {
      results = data
    } else if (data && typeof data === "object") {
      if (data.results) {
        results = data.results
      } else {
        results = [data]
      }
    }

    console.log(`Processed ${results.length} projects`)
    return { results }
  } catch (error) {
    console.error("Error fetching projects:", error)
    return { results: [] }
  }
}

// Loyiha tafsilotlarini olish
export async function fetchProject(id: string) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/projects/${id}/`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error)
    // Return null instead of mock data
    return null
  }
}

// Topshiriqlar ro'yxatini olish
export async function fetchTasks(difficulty?: string, courseId?: string, status?: string) {
  try {
    let endpoint = "/tasks/"
    const params = []

    if (difficulty) params.push(`difficulty=${difficulty}`)
    if (courseId) params.push(`course=${courseId}`)
    if (status) params.push(`status=${status}`)

    if (params.length > 0) {
      endpoint += `?${params.join("&")}`
    }

    console.log(`Fetching tasks from: ${API_URL}${endpoint}`)
    const res = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json()
    console.log("API response for tasks:", data)

    // Process data similar to fetchCourses
    let results = []
    if (Array.isArray(data)) {
      results = data
    } else if (data && typeof data === "object") {
      if (data.results) {
        results = data.results
      } else {
        results = [data]
      }
    }

    console.log(`Processed ${results.length} tasks`)
    return { results }
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return { results: [] }
  }
}

// Topshiriq tafsilotlarini olish
export async function fetchTask(id: string) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/tasks/${id}/`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error)
    // Return null instead of mock data
    return null
  }
}

// Resurslar ro'yxatini olish
export async function fetchResources(category?: string) {
  try {
    const endpoint = category ? `/resources/?category=${category}` : "/resources/"
    console.log(`Fetching resources from: ${API_URL}${endpoint}`)
    const res = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json()
    console.log("API response for resources:", data)

    // Process data similar to fetchCourses
    let results = []
    if (Array.isArray(data)) {
      results = data
    } else if (data && typeof data === "object") {
      if (data.results) {
        results = data.results
      } else {
        results = [data]
      }
    }

    console.log(`Processed ${results.length} resources`)
    return { results }
  } catch (error) {
    console.error("Error fetching resources:", error)
    return { results: [] }
  }
}

// Resurs tafsilotlarini olish
export async function fetchResource(id: string) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/resources/${id}/`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error(`Error fetching resource ${id}:`, error)
    // Return null instead of mock data
    return null
  }
}

// Yangiliklar ro'yxatini olish
export async function fetchNews() {
  try {
    console.log(`Fetching news from: ${API_URL}/news/`)
    const res = await fetchWithTimeout(`${API_URL}/news/`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json()
    console.log("API response for news:", data)

    // Process data similar to fetchCourses
    let results = []
    if (Array.isArray(data)) {
      results = data
    } else if (data && typeof data === "object") {
      if (data.results) {
        results = data.results
      } else {
        results = [data]
      }
    }

    console.log(`Processed ${results.length} news items`)
    return { results }
  } catch (error) {
    console.error("Error fetching news:", error)
    // API xatosi bo'lganda mock ma'lumotlarni qaytarish
    return {
      results: [
        {
          id: 1,
          title_en: "New Robotics Course Available",
          title_ru: "Доступен новый курс по робототехнике",
          title_uz: "Yangi robototexnika kursi mavjud",
          date: "2023-12-15",
          content_en:
            "<p>We are excited to announce our new robotics course for beginners! This course will cover the basics of robotics, including sensors, motors, and programming.</p><p>The course will start on January 15, 2024. Registration is now open!</p>",
          content_ru:
            "<p>Мы рады объявить о нашем новом курсе по робототехнике для начинающих! Этот курс охватит основы робототехники, включая датчики, двигатели и программирование.</p><p>Курс начнется 15 января 2024 года. Регистрация уже открыта!</p>",
          content_uz:
            "<p>Biz boshlang'ichlar uchun yangi robototexnika kursimizni e'lon qilishdan mamnunmiz! Bu kurs sensorlar, motorlar va dasturlashni o'z ichiga olgan robototexnika asoslarini qamrab oladi.</p><p>Kurs 2024 yil 15 yanvarda boshlanadi. Ro'yxatdan o'tish ochiq!</p>",
          summary_en: "Join our new robotics course for beginners starting January 15, 2024!",
          summary_ru:
            "Присоединяйтесь к нашему новому курсу по робототехнике для начинающих, который начнется 15 января 2024 года!",
          summary_uz:
            "2024 yil 15 yanvarda boshlanadigan boshlang'ichlar uchun yangi robototexnika kursimizga qo'shiling!",
          author: "Admin",
        },
        {
          id: 2,
          title_en: "Robotics Competition Announcement",
          title_ru: "Объявление о соревновании по робототехнике",
          title_uz: "Robototexnika musobaqasi e'loni",
          date: "2023-12-10",
          content_en:
            "<p>We are organizing a robotics competition for students of all ages. The competition will test your skills in building and programming robots to complete specific tasks.</p><p>The competition will be held on February 20, 2024. Registration deadline is February 1, 2024.</p>",
          content_ru:
            "<p>Мы организуем соревнование по робототехнике для студентов всех возрастов. Соревнование проверит ваши навыки в создании и программировании роботов для выполнения определенных задач.</p><p>Соревнование состоится 20 февраля 2024 года. Крайний срок регистрации - 1 февраля 2024 года.</p>",
          content_uz:
            "<p>Biz barcha yoshdagi o'quvchilar uchun robototexnika musobaqasini tashkil qilmoqdamiz. Musobaqa ma'lum vazifalarni bajarish uchun robotlarni qurish va dasturlash bo'yicha ko'nikmalaringizni sinab ko'radi.</p><p>Musobaqa 2024 yil 20 fevralda o'tkaziladi. Ro'yxatdan o'tish muddati 2024 yil 1 fevral.</p>",
          summary_en: "Join our robotics competition on February 20, 2024!",
          summary_ru: "Присоединяйтесь к нашему соревнованию по робототехнике 20 февраля 2024 года!",
          summary_uz: "2024 yil 20 fevralda o'tkaziladigan robototexnika musobaqamizga qo'shiling!",
          author: "Admin",
        },
        {
          id: 3,
          title_en: "Workshop on AI in Robotics",
          title_ru: "Семинар по ИИ в робототехнике",
          title_uz: "Robototexnikada sun'iy intellekt bo'yicha seminar",
          date: "2023-12-05",
          content_en:
            "<p>We are hosting a workshop on Artificial Intelligence in Robotics. The workshop will cover the basics of AI and how it can be applied to robotics.</p><p>The workshop will be held on January 5, 2024. Registration is required.</p>",
          content_ru:
            "<p>Мы проводим семинар по искусственному интеллекту в робототехнике. Семинар охватит основы ИИ и то, как его можно применить в робототехнике.</p><p>Семинар состоится 5 января 2024 года. Требуется регистрация.</p>",
          content_uz:
            "<p>Biz robototexnikada sun'iy intellekt bo'yicha seminar o'tkazmoqdamiz. Seminar sun'iy intellekt asoslarini va uni robototexnikada qanday qo'llash mumkinligini qamrab oladi.</p><p>Seminar 2024 yil 5 yanvarda o'tkaziladi. Ro'yxatdan o'tish talab qilinadi.</p>",
          summary_en: "Learn about AI in robotics at our workshop on January 5, 2024!",
          summary_ru: "Узнайте об ИИ в робототехнике на нашем семинаре 5 января 2024 года!",
          summary_uz:
            "2024 yil 5 yanvarda o'tkaziladigan seminarimizda robototexnikada sun'iy intellekt haqida bilib oling!",
          author: "Admin",
        },
      ],
    }
  }
}

// Yangilik tafsilotlarini olish
export async function fetchNewsItem(id: string) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/news/${id}/`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error(`Error fetching news item ${id}:`, error)
    // API xatosi bo'lganda mock ma'lumotlarni qaytarish
    const mockNews = [
      {
        id: "1",
        title_en: "New Robotics Course Available",
        title_ru: "Доступен новый курс по робототехнике",
        title_uz: "Yangi robototexnika kursi mavjud",
        date: "2023-12-15",
        content_en:
          "<p>We are excited to announce our new robotics course for beginners! This course will cover the basics of robotics, including sensors, motors, and programming.</p><p>The course will start on January 15, 2024. Registration is now open!</p>",
        content_ru:
          "<p>Мы рады объявить о нашем новом курсе по робототехнике для начинающих! Этот курс охватит основы робототехники, включая датчики, двигатели и программирование.</p><p>Курс начнется 15 января 2024 года. Регистрация уже открыта!</p>",
        content_uz:
          "<p>Biz boshlang'ichlar uchun yangi robototexnika kursimizni e'lon qilishdan mamnunmiz! Bu kurs sensorlar, motorlar va dasturlashni o'z ichiga olgan robototexnika asoslarini qamrab oladi.</p><p>Kurs 2024 yil 15 yanvarda boshlanadi. Ro'yxatdan o'tish ochiq!</p>",
        author: "Admin",
      },
      {
        id: "2",
        title_en: "Robotics Competition Announcement",
        title_ru: "Объявление о соревновании по робототехнике",
        title_uz: "Robototexnika musobaqasi e'loni",
        date: "2023-12-10",
        content_en:
          "<p>We are organizing a robotics competition for students of all ages. The competition will test your skills in building and programming robots to complete specific tasks.</p><p>The competition will be held on February 20, 2024. Registration deadline is February 1, 2024.</p>",
        content_ru:
          "<p>Мы организуем соревнование по робототехнике для студентов всех возрастов. Соревнование проверит ваши навыки в создании и программировании роботов для выполнения определенных задач.</p><p>Соревнование состоится 20 февраля 2024 года. Крайний срок регистрации - 1 февраля 2024 года.</p>",
        content_uz:
          "<p>Biz barcha yoshdagi o'quvchilar uchun robototexnika musobaqasini tashkil qilmoqdamiz. Musobaqa ma'lum vazifalarni bajarish uchun robotlarni qurish va dasturlash bo'yicha ko'nikmalaringizni sinab ko'radi.</p><p>Musobaqa 2024 yil 20 fevralda o'tkaziladi. Ro'yxatdan o'tish muddati 2024 yil 1 fevral.</p>",
        author: "Admin",
      },
      {
        id: "3",
        title_en: "Workshop on AI in Robotics",
        title_ru: "Семинар по ИИ в робототехнике",
        title_uz: "Robototexnikada sun'iy intellekt bo'yicha seminar",
        date: "2023-12-05",
        content_en:
          "<p>We are hosting a workshop on Artificial Intelligence in Robotics. The workshop will cover the basics of AI and how it can be applied to robotics.</p><p>The workshop will be held on January 5, 2024. Registration is required.</p>",
        content_ru:
          "<p>Мы проводим семинар по искусственному интеллекту в робототехнике. Семинар охватит основы ИИ и то, как его можно применить в робототехнике.</p><p>Семинар состоится 5 января 2024 года. Требуется регистрация.</p>",
        content_uz:
          "<p>Biz robototexnikada sun'iy intellekt bo'yicha seminar o'tkazmoqdamiz. Seminar sun'iy intellekt asoslarini va uni robototexnikada qanday qo'llash mumkinligini qamrab oladi.</p><p>Seminar 2024 yil 5 yanvarda o'tkaziladi. Ro'yxatdan o'tish talab qilinadi.</p>",
        author: "Admin",
      },
    ]

    return mockNews.find((item) => item.id === id) || null
  }
}

// O'qituvchilar ro'yxatini olish
export async function fetchInstructors() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/instructors/`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error("Error fetching instructors:", error)
    // Return empty results instead of mock data
    return { results: [] }
  }
}

// O'qituvchi tafsilotlarini olish
export async function fetchInstructor(id: string) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/instructors/${id}/`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error(`Error fetching instructor ${id}:`, error)
    // Return null instead of mock data
    return null
  }
}


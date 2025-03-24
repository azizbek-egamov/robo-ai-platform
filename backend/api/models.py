
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

class Course(models.Model):
    """Model for courses"""
    DIFFICULTY_CHOICES = [
        ('beginner', _('Boshlang\'ich')),
        ('intermediate', _('O\'rta')),
        ('advanced', _('Yuqori')),
    ]
    
    title_en = models.CharField(_('Sarlavha (Inglizcha)'), max_length=200)
    title_ru = models.CharField(_('Sarlavha (Ruscha)'), max_length=200)
    title_uz = models.CharField(_('Sarlavha (O\'zbekcha)'), max_length=200)
    description_en = models.TextField(_('Tavsif (Inglizcha)'))
    description_ru = models.TextField(_('Tavsif (Ruscha)'))
    description_uz = models.TextField(_('Tavsif (O\'zbekcha)'))
    detailed_description_en = models.TextField(_('Batafsil Tavsif (Inglizcha)'))
    detailed_description_ru = models.TextField(_('Batafsil Tavsif (Ruscha)'))
    detailed_description_uz = models.TextField(_('Batafsil Tavsif (O\'zbekcha)'))
    image = models.ImageField(_('Rasm'), upload_to='courses/')
    difficulty = models.CharField(_('Qiyinchilik'), max_length=20, choices=DIFFICULTY_CHOICES)
    duration_en = models.CharField(_('Davomiylik (Inglizcha)'), max_length=50)
    duration_ru = models.CharField(_('Davomiylik (Ruscha)'), max_length=50)
    duration_uz = models.CharField(_('Davomiylik (O\'zbekcha)'), max_length=50)
    schedule_en = models.CharField(_('Jadval (Inglizcha)'), max_length=100)
    schedule_ru = models.CharField(_('Jadval (Ruscha)'), max_length=100)
    schedule_uz = models.CharField(_('Jadval (O\'zbekcha)'), max_length=100)
    start_date_en = models.CharField(_('Boshlanish Sanasi (Inglizcha)'), max_length=50)
    start_date_ru = models.CharField(_('Boshlanish Sanasi (Ruscha)'), max_length=50)
    start_date_uz = models.CharField(_('Boshlanish Sanasi (O\'zbekcha)'), max_length=50)
    max_students = models.PositiveIntegerField(_('Maksimal Talabalar'))
    price_en = models.CharField(_('Narx (Inglizcha)'), max_length=50)
    price_ru = models.CharField(_('Narx (Ruscha)'), max_length=50)
    price_uz = models.CharField(_('Narx (O\'zbekcha)'), max_length=50)
    created_at = models.DateTimeField(_('Yaratilgan Vaqt'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Yangilangan Vaqt'), auto_now=True)
    
    def __str__(self):
        return self.title_en
    
    class Meta:
        verbose_name = _('Kurs')
        verbose_name_plural = _('Kurslar')
        ordering = ['-created_at']

class Instructor(models.Model):
    """Model for instructors"""
    name = models.CharField(_('Ism'), max_length=100)
    title_en = models.CharField(_('Unvon (Inglizcha)'), max_length=100)
    title_ru = models.CharField(_('Unvon (Ruscha)'), max_length=100)
    title_uz = models.CharField(_('Unvon (O\'zbekcha)'), max_length=100)
    bio_en = models.TextField(_('Biografiya (Inglizcha)'))
    bio_ru = models.TextField(_('Biografiya (Ruscha)'))
    bio_uz = models.TextField(_('Biografiya (O\'zbekcha)'))
    photo = models.ImageField(_('Rasm'), upload_to='instructors/')
    courses = models.ManyToManyField(Course, related_name='instructors')
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = _('O\'qituvchi')
        verbose_name_plural = _('O\'qituvchilar')

class CourseSyllabus(models.Model):
    """Model for course syllabus"""
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='syllabus_items')
    week = models.PositiveIntegerField(_('Hafta'))
    title_en = models.CharField(_('Sarlavha (Inglizcha)'), max_length=200)
    title_ru = models.CharField(_('Sarlavha (Ruscha)'), max_length=200)
    title_uz = models.CharField(_('Sarlavha (O\'zbekcha)'), max_length=200)
    
    def __str__(self):
        return f"{self.course.title_en} - Hafta {self.week}: {self.title_en}"
    
    class Meta:
        verbose_name = _('Kurs Sillabusi')
        verbose_name_plural = _('Kurs Sillabuslari')
        ordering = ['course', 'week']
        unique_together = ['course', 'week']

class SyllabusTopics(models.Model):
    """Model for syllabus topics"""
    syllabus = models.ForeignKey(CourseSyllabus, on_delete=models.CASCADE, related_name='topics')
    topic_en = models.CharField(_('Mavzu (Inglizcha)'), max_length=200)
    topic_ru = models.CharField(_('Mavzu (Ruscha)'), max_length=200)
    topic_uz = models.CharField(_('Mavzu (O\'zbekcha)'), max_length=200)
    
    def __str__(self):
        return self.topic_en
    
    class Meta:
        verbose_name = _('Sillabus Mavzusi')
        verbose_name_plural = _('Sillabus Mavzulari')

class Enrollment(models.Model):
    """Model for course enrollments"""
    STATUS_CHOICES = [
        ('pending', _('Kutilmoqda')),
        ('approved', _('Tasdiqlangan')),
        ('rejected', _('Rad etilgan')),
    ]
    
    first_name = models.CharField(_('Ism'), max_length=100)
    last_name = models.CharField(_('Familiya'), max_length=100)
    phone = models.CharField(_('Telefon'), max_length=20)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    comments = models.TextField(_('Izohlar'), blank=True)
    status = models.CharField(_('Holat'), max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(_('Yaratilgan Vaqt'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Yangilangan Vaqt'), auto_now=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.course.title_en}"
    
    class Meta:
        verbose_name = _('Ro\'yxatdan o\'tish')
        verbose_name_plural = _('Ro\'yxatdan o\'tishlar')
        ordering = ['-created_at']

class Project(models.Model):
    """Model for projects"""
    DIFFICULTY_CHOICES = [
        ('beginner', _('Boshlang\'ich')),
        ('intermediate', _('O\'rta')),
        ('advanced', _('Yuqori')),
    ]
    
    title_en = models.CharField(_('Sarlavha (Inglizcha)'), max_length=200)
    title_ru = models.CharField(_('Sarlavha (Ruscha)'), max_length=200)
    title_uz = models.CharField(_('Sarlavha (O\'zbekcha)'), max_length=200)
    description_en = models.TextField(_('Tavsif (Inglizcha)'))
    description_ru = models.TextField(_('Tavsif (Ruscha)'))
    description_uz = models.TextField(_('Tavsif (O\'zbekcha)'))
    detailed_description_en = models.TextField(_('Batafsil Tavsif (Inglizcha)'))
    detailed_description_ru = models.TextField(_('Batafsil Tavsif (Ruscha)'))
    detailed_description_uz = models.TextField(_('Batafsil Tavsif (O\'zbekcha)'))
    image = models.ImageField(_('Rasm'), upload_to='projects/')
    difficulty = models.CharField(_('Qiyinchilik'), max_length=20, choices=DIFFICULTY_CHOICES)
    tags = models.CharField(_('Teglar'), max_length=255, help_text=_('Vergul bilan ajratilgan teglar'))
    code_snippet = models.TextField(_('Kod Bo\'lagi'), blank=True)
    created_at = models.DateTimeField(_('Yaratilgan Vaqt'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Yangilangan Vaqt'), auto_now=True)
    
    def __str__(self):
        return self.title_en
    
    class Meta:
        verbose_name = _('Loyiha')
        verbose_name_plural = _('Loyihalar')
        ordering = ['-created_at']
    
    def get_tags_list(self):
        return [tag.strip() for tag in self.tags.split(',')]

class ProjectMaterial(models.Model):
    """Model for project materials"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='materials')
    material_en = models.CharField(_('Material (Inglizcha)'), max_length=200)
    material_ru = models.CharField(_('Material (Ruscha)'), max_length=200)
    material_uz = models.CharField(_('Material (O\'zbekcha)'), max_length=200)
    
    def __str__(self):
        return f"{self.project.title_en} - {self.material_en}"
    
    class Meta:
        verbose_name = _('Loyiha Materiali')
        verbose_name_plural = _('Loyiha Materiallari')

class ProjectStep(models.Model):
    """Model for project steps"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='steps')
    order = models.PositiveIntegerField(_('Tartib'))
    title_en = models.CharField(_('Sarlavha (Inglizcha)'), max_length=200)
    title_ru = models.CharField(_('Sarlavha (Ruscha)'), max_length=200)
    title_uz = models.CharField(_('Sarlavha (O\'zbekcha)'), max_length=200)
    description_en = models.TextField(_('Tavsif (Inglizcha)'))
    description_ru = models.TextField(_('Tavsif (Ruscha)'))
    description_uz = models.TextField(_('Tavsif (O\'zbekcha)'))
    
    def __str__(self):
        return f"{self.project.title_en} - Qadam {self.order}: {self.title_en}"
    
    class Meta:
        verbose_name = _('Loyiha Qadami')
        verbose_name_plural = _('Loyiha Qadamlar')
        ordering = ['project', 'order']
        unique_together = ['project', 'order']

class Task(models.Model):
    """Model for tasks"""
    DIFFICULTY_CHOICES = [
        ('beginner', _('Boshlang\'ich')),
        ('intermediate', _('O\'rta')),
        ('advanced', _('Yuqori')),
    ]
    
    STATUS_CHOICES = [
        ('not_started', _('Boshlanmagan')),
        ('in_progress', _('Jarayonda')),
        ('completed', _('Tugallangan')),
    ]
    
    title_en = models.CharField(_('Sarlavha (Inglizcha)'), max_length=200)
    title_ru = models.CharField(_('Sarlavha (Ruscha)'), max_length=200)
    title_uz = models.CharField(_('Sarlavha (O\'zbekcha)'), max_length=200)
    description_en = models.TextField(_('Tavsif (Inglizcha)'))
    description_ru = models.TextField(_('Tavsif (Ruscha)'))
    description_uz = models.TextField(_('Tavsif (O\'zbekcha)'))
    detailed_description_en = models.TextField(_('Batafsil Tavsif (Inglizcha)'))
    detailed_description_ru = models.TextField(_('Batafsil Tavsif (Ruscha)'))
    detailed_description_uz = models.TextField(_('Batafsil Tavsif (O\'zbekcha)'))
    points = models.PositiveIntegerField(_('Ballar'))
    estimated_time_en = models.CharField(_('Taxminiy Vaqt (Inglizcha)'), max_length=50)
    estimated_time_ru = models.CharField(_('Taxminiy Vaqt (Ruscha)'), max_length=50)
    estimated_time_uz = models.CharField(_('Taxminiy Vaqt (O\'zbekcha)'), max_length=50)
    difficulty = models.CharField(_('Qiyinchilik'), max_length=20, choices=DIFFICULTY_CHOICES)
    related_course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='tasks')
    status = models.CharField(_('Holat'), max_length=20, choices=STATUS_CHOICES, default='not_started')
    sample_code = models.TextField(_('Namuna Kodi'), blank=True)
    created_at = models.DateTimeField(_('Yaratilgan Vaqt'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Yangilangan Vaqt'), auto_now=True)
    
    def __str__(self):
        return self.title_en
    
    class Meta:
        verbose_name = _('Vazifa')
        verbose_name_plural = _('Vazifalar')
        ordering = ['-created_at']

class TaskRequirement(models.Model):
    """Model for task requirements"""
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='requirements')
    requirement_en = models.CharField(_('Talab (Inglizcha)'), max_length=255)
    requirement_ru = models.CharField(_('Talab (Ruscha)'), max_length=255)
    requirement_uz = models.CharField(_('Talab (O\'zbekcha)'), max_length=255)
    
    def __str__(self):
        return f"{self.task.title_en} - {self.requirement_en[:50]}"
    
    class Meta:
        verbose_name = _('Vazifa Talabi')
        verbose_name_plural = _('Vazifa Talablari')

class TaskHint(models.Model):
    """Model for task hints"""
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='hints')
    hint_en = models.TextField(_('Maslahat (Inglizcha)'))
    hint_ru = models.TextField(_('Maslahat (Ruscha)'))
    hint_uz = models.TextField(_('Maslahat (O\'zbekcha)'))
    
    def __str__(self):
        return f"{self.task.title_en} - {self.hint_en[:50]}"
    
    class Meta:
        verbose_name = _('Vazifa Maslahati')
        verbose_name_plural = _('Vazifa Maslahatlari')

class Resource(models.Model):
    """Model for resources"""
    CATEGORY_CHOICES = [
        ('tutorials', _('Qo\'llanmalar')),
        ('videos', _('Videolar')),
        ('books', _('Kitoblar')),
        ('downloads', _('Yuklamalar')),
    ]
    
    title_en = models.CharField(_('Sarlavha (Inglizcha)'), max_length=200)
    title_ru = models.CharField(_('Sarlavha (Ruscha)'), max_length=200)
    title_uz = models.CharField(_('Sarlavha (O\'zbekcha)'), max_length=200)
    description_en = models.TextField(_('Tavsif (Inglizcha)'))
    description_ru = models.TextField(_('Tavsif (Ruscha)'))
    description_uz = models.TextField(_('Tavsif (O\'zbekcha)'))
    content_en = models.TextField(_('Kontent (Inglizcha)'), blank=True)
    content_ru = models.TextField(_('Kontent (Ruscha)'), blank=True)
    content_uz = models.TextField(_('Kontent (O\'zbekcha)'), blank=True)
    image = models.ImageField(_('Rasm'), upload_to='resources/', blank=True)
    category = models.CharField(_('Kategoriya'), max_length=20, choices=CATEGORY_CHOICES)
    file = models.FileField(_('Fayl'), upload_to='resources/files/', blank=True)
    external_link = models.URLField(_('Tashqi Havola'), blank=True)
    is_external = models.BooleanField(_('Tashqi'), default=False)
    is_downloadable = models.BooleanField(_('Yuklab Olinadigan'), default=False)
    created_at = models.DateTimeField(_('Yaratilgan Vaqt'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Yangilangan Vaqt'), auto_now=True)
    
    def __str__(self):
        return self.title_en
    
    class Meta:
        verbose_name = _('Resurs')
        verbose_name_plural = _('Resurslar')
        ordering = ['-created_at']

class News(models.Model):
    """Model for news"""
    title_en = models.CharField(_('Sarlavha (Inglizcha)'), max_length=200)
    title_ru = models.CharField(_('Sarlavha (Ruscha)'), max_length=200)
    title_uz = models.CharField(_('Sarlavha (O\'zbekcha)'), max_length=200)
    content_en = models.TextField(_('Kontent (Inglizcha)'))
    content_ru = models.TextField(_('Kontent (Ruscha)'))
    content_uz = models.TextField(_('Kontent (O\'zbekcha)'))
    image = models.ImageField(_('Rasm'), upload_to='news/', blank=True)
    date = models.DateField(_('Sana'))
    created_at = models.DateTimeField(_('Yaratilgan Vaqt'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Yangilangan Vaqt'), auto_now=True)
    
    def __str__(self):
        return self.title_en
    
    class Meta:
        verbose_name = _('Yangilik')
        verbose_name_plural = _('Yangiliklar')
        ordering = ['-date']


# from django.db import models
# from django.contrib.auth.models import User
# from django.utils.translation import gettext_lazy as _

# class Course(models.Model):
#     """Model for courses"""
#     DIFFICULTY_CHOICES = [
#         ('beginner', _('Beginner')),
#         ('intermediate', _('Intermediate')),
#         ('advanced', _('Advanced')),
#     ]
    
#     title_en = models.CharField(_('Title (English)'), max_length=200)
#     title_ru = models.CharField(_('Title (Russian)'), max_length=200)
#     title_uz = models.CharField(_('Title (Uzbek)'), max_length=200)
#     description_en = models.TextField(_('Description (English)'))
#     description_ru = models.TextField(_('Description (Russian)'))
#     description_uz = models.TextField(_('Description (Uzbek)'))
#     detailed_description_en = models.TextField(_('Detailed Description (English)'))
#     detailed_description_ru = models.TextField(_('Detailed Description (Russian)'))
#     detailed_description_uz = models.TextField(_('Detailed Description (Uzbek)'))
#     image = models.ImageField(_('Image'), upload_to='courses/')
#     difficulty = models.CharField(_('Difficulty'), max_length=20, choices=DIFFICULTY_CHOICES)
#     duration_en = models.CharField(_('Duration (English)'), max_length=50)
#     duration_ru = models.CharField(_('Duration (Russian)'), max_length=50)
#     duration_uz = models.CharField(_('Duration (Uzbek)'), max_length=50)
#     schedule_en = models.CharField(_('Schedule (English)'), max_length=100)
#     schedule_ru = models.CharField(_('Schedule (Russian)'), max_length=100)
#     schedule_uz = models.CharField(_('Schedule (Uzbek)'), max_length=100)
#     start_date_en = models.CharField(_('Start Date (English)'), max_length=50)
#     start_date_ru = models.CharField(_('Start Date (Russian)'), max_length=50)
#     start_date_uz = models.CharField(_('Start Date (Uzbek)'), max_length=50)
#     max_students = models.PositiveIntegerField(_('Maximum Students'))
#     price_en = models.CharField(_('Price (English)'), max_length=50)
#     price_ru = models.CharField(_('Price (Russian)'), max_length=50)
#     price_uz = models.CharField(_('Price (Uzbek)'), max_length=50)
#     created_at = models.DateTimeField(_('Created At'), auto_now_add=True)
#     updated_at = models.DateTimeField(_('Updated At'), auto_now=True)
    
#     def __str__(self):
#         return self.title_en
    
#     class Meta:
#         verbose_name = _('Course')
#         verbose_name_plural = _('Courses')
#         ordering = ['-created_at']

# class Instructor(models.Model):
#     """Model for instructors"""
#     name = models.CharField(_('Name'), max_length=100)
#     title_en = models.CharField(_('Title (English)'), max_length=100)
#     title_ru = models.CharField(_('Title (Russian)'), max_length=100)
#     title_uz = models.CharField(_('Title (Uzbek)'), max_length=100)
#     bio_en = models.TextField(_('Bio (English)'))
#     bio_ru = models.TextField(_('Bio (Russian)'))
#     bio_uz = models.TextField(_('Bio (Uzbek)'))
#     photo = models.ImageField(_('Photo'), upload_to='instructors/')
#     courses = models.ManyToManyField(Course, related_name='instructors')
    
#     def __str__(self):
#         return self.name
    
#     class Meta:
#         verbose_name = _('Instructor')
#         verbose_name_plural = _('Instructors')

# class CourseSyllabus(models.Model):
#     """Model for course syllabus"""
#     course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='syllabus_items')
#     week = models.PositiveIntegerField(_('Week'))
#     title_en = models.CharField(_('Title (English)'), max_length=200)
#     title_ru = models.CharField(_('Title (Russian)'), max_length=200)
#     title_uz = models.CharField(_('Title (Uzbek)'), max_length=200)
    
#     def __str__(self):
#         return f"{self.course.title_en} - Week {self.week}: {self.title_en}"
    
#     class Meta:
#         verbose_name = _('Course Syllabus')
#         verbose_name_plural = _('Course Syllabi')
#         ordering = ['course', 'week']
#         unique_together = ['course', 'week']

# class SyllabusTopics(models.Model):
#     """Model for syllabus topics"""
#     syllabus = models.ForeignKey(CourseSyllabus, on_delete=models.CASCADE, related_name='topics')
#     topic_en = models.CharField(_('Topic (English)'), max_length=200)
#     topic_ru = models.CharField(_('Topic (Russian)'), max_length=200)
#     topic_uz = models.CharField(_('Topic (Uzbek)'), max_length=200)
    
#     def __str__(self):
#         return self.topic_en
    
#     class Meta:
#         verbose_name = _('Syllabus Topic')
#         verbose_name_plural = _('Syllabus Topics')

# class Enrollment(models.Model):
#     """Model for course enrollments"""
#     STATUS_CHOICES = [
#         ('pending', _('Pending')),
#         ('approved', _('Approved')),
#         ('rejected', _('Rejected')),
#     ]
    
#     first_name = models.CharField(_('First Name'), max_length=100)
#     last_name = models.CharField(_('Last Name'), max_length=100)
#     phone = models.CharField(_('Phone'), max_length=20)
#     course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
#     comments = models.TextField(_('Comments'), blank=True)
#     status = models.CharField(_('Status'), max_length=20, choices=STATUS_CHOICES, default='pending')
#     created_at = models.DateTimeField(_('Created At'), auto_now_add=True)
#     updated_at = models.DateTimeField(_('Updated At'), auto_now=True)
    
#     def __str__(self):
#         return f"{self.first_name} {self.last_name} - {self.course.title_en}"
    
#     class Meta:
#         verbose_name = _('Enrollment')
#         verbose_name_plural = _('Enrollments')
#         ordering = ['-created_at']

# class Project(models.Model):
#     """Model for projects"""
#     DIFFICULTY_CHOICES = [
#         ('beginner', _('Beginner')),
#         ('intermediate', _('Intermediate')),
#         ('advanced', _('Advanced')),
#     ]
    
#     title_en = models.CharField(_('Title (English)'), max_length=200)
#     title_ru = models.CharField(_('Title (Russian)'), max_length=200)
#     title_uz = models.CharField(_('Title (Uzbek)'), max_length=200)
#     description_en = models.TextField(_('Description (English)'))
#     description_ru = models.TextField(_('Description (Russian)'))
#     description_uz = models.TextField(_('Description (Uzbek)'))
#     detailed_description_en = models.TextField(_('Detailed Description (English)'))
#     detailed_description_ru = models.TextField(_('Detailed Description (Russian)'))
#     detailed_description_uz = models.TextField(_('Detailed Description (Uzbek)'))
#     image = models.ImageField(_('Image'), upload_to='projects/')
#     difficulty = models.CharField(_('Difficulty'), max_length=20, choices=DIFFICULTY_CHOICES)
#     tags = models.CharField(_('Tags'), max_length=255, help_text=_('Comma-separated tags'))
#     code_snippet = models.TextField(_('Code Snippet'), blank=True)
#     created_at = models.DateTimeField(_('Created At'), auto_now_add=True)
#     updated_at = models.DateTimeField(_('Updated At'), auto_now=True)
    
#     def __str__(self):
#         return self.title_en
    
#     class Meta:
#         verbose_name = _('Project')
#         verbose_name_plural = _('Projects')
#         ordering = ['-created_at']
    
#     def get_tags_list(self):
#         return [tag.strip() for tag in self.tags.split(',')]

# class ProjectMaterial(models.Model):
#     """Model for project materials"""
#     project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='materials')
#     material_en = models.CharField(_('Material (English)'), max_length=200)
#     material_ru = models.CharField(_('Material (Russian)'), max_length=200)
#     material_uz = models.CharField(_('Material (Uzbek)'), max_length=200)
    
#     def __str__(self):
#         return f"{self.project.title_en} - {self.material_en}"
    
#     class Meta:
#         verbose_name = _('Project Material')
#         verbose_name_plural = _('Project Materials')

# class ProjectStep(models.Model):
#     """Model for project steps"""
#     project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='steps')
#     order = models.PositiveIntegerField(_('Order'))
#     title_en = models.CharField(_('Title (English)'), max_length=200)
#     title_ru = models.CharField(_('Title (Russian)'), max_length=200)
#     title_uz = models.CharField(_('Title (Uzbek)'), max_length=200)
#     description_en = models.TextField(_('Description (English)'))
#     description_ru = models.TextField(_('Description (Russian)'))
#     description_uz = models.TextField(_('Description (Uzbek)'))
    
#     def __str__(self):
#         return f"{self.project.title_en} - Step {self.order}: {self.title_en}"
    
#     class Meta:
#         verbose_name = _('Project Step')
#         verbose_name_plural = _('Project Steps')
#         ordering = ['project', 'order']
#         unique_together = ['project', 'order']

# class Task(models.Model):
#     """Model for tasks"""
#     DIFFICULTY_CHOICES = [
#         ('beginner', _('Beginner')),
#         ('intermediate', _('Intermediate')),
#         ('advanced', _('Advanced')),
#     ]
    
#     STATUS_CHOICES = [
#         ('not_started', _('Not Started')),
#         ('in_progress', _('In Progress')),
#         ('completed', _('Completed')),
#     ]
    
#     title_en = models.CharField(_('Title (English)'), max_length=200)
#     title_ru = models.CharField(_('Title (Russian)'), max_length=200)
#     title_uz = models.CharField(_('Title (Uzbek)'), max_length=200)
#     description_en = models.TextField(_('Description (English)'))
#     description_ru = models.TextField(_('Description (Russian)'))
#     description_uz = models.TextField(_('Description (Uzbek)'))
#     detailed_description_en = models.TextField(_('Detailed Description (English)'))
#     detailed_description_ru = models.TextField(_('Detailed Description (Russian)'))
#     detailed_description_uz = models.TextField(_('Detailed Description (Uzbek)'))
#     points = models.PositiveIntegerField(_('Points'))
#     estimated_time_en = models.CharField(_('Estimated Time (English)'), max_length=50)
#     estimated_time_ru = models.CharField(_('Estimated Time (Russian)'), max_length=50)
#     estimated_time_uz = models.CharField(_('Estimated Time (Uzbek)'), max_length=50)
#     difficulty = models.CharField(_('Difficulty'), max_length=20, choices=DIFFICULTY_CHOICES)
#     related_course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='tasks')
#     status = models.CharField(_('Status'), max_length=20, choices=STATUS_CHOICES, default='not_started')
#     sample_code = models.TextField(_('Sample Code'), blank=True)
#     created_at = models.DateTimeField(_('Created At'), auto_now_add=True)
#     updated_at = models.DateTimeField(_('Updated At'), auto_now=True)
    
#     def __str__(self):
#         return self.title_en
    
#     class Meta:
#         verbose_name = _('Task')
#         verbose_name_plural = _('Tasks')
#         ordering = ['-created_at']

# class TaskRequirement(models.Model):
#     """Model for task requirements"""
#     task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='requirements')
#     requirement_en = models.CharField(_('Requirement (English)'), max_length=255)
#     requirement_ru = models.CharField(_('Requirement (Russian)'), max_length=255)
#     requirement_uz = models.CharField(_('Requirement (Uzbek)'), max_length=255)
    
#     def __str__(self):
#         return f"{self.task.title_en} - {self.requirement_en[:50]}"
    
#     class Meta:
#         verbose_name = _('Task Requirement')
#         verbose_name_plural = _('Task Requirements')

# class TaskHint(models.Model):
#     """Model for task hints"""
#     task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='hints')
#     hint_en = models.TextField(_('Hint (English)'))
#     hint_ru = models.TextField(_('Hint (Russian)'))
#     hint_uz = models.TextField(_('Hint (Uzbek)'))
    
#     def __str__(self):
#         return f"{self.task.title_en} - {self.hint_en[:50]}"
    
#     class Meta:
#         verbose_name = _('Task Hint')
#         verbose_name_plural = _('Task Hints')

# class Resource(models.Model):
#     """Model for resources"""
#     CATEGORY_CHOICES = [
#         ('tutorials', _('Tutorials')),
#         ('videos', _('Videos')),
#         ('books', _('Books')),
#         ('downloads', _('Downloads')),
#     ]
    
#     title_en = models.CharField(_('Title (English)'), max_length=200)
#     title_ru = models.CharField(_('Title (Russian)'), max_length=200)
#     title_uz = models.CharField(_('Title (Uzbek)'), max_length=200)
#     description_en = models.TextField(_('Description (English)'))
#     description_ru = models.TextField(_('Description (Russian)'))
#     description_uz = models.TextField(_('Description (Uzbek)'))
#     content_en = models.TextField(_('Content (English)'), blank=True)
#     content_ru = models.TextField(_('Content (Russian)'), blank=True)
#     content_uz = models.TextField(_('Content (Uzbek)'), blank=True)
#     image = models.ImageField(_('Image'), upload_to='resources/', blank=True)
#     category = models.CharField(_('Category'), max_length=20, choices=CATEGORY_CHOICES)
#     file = models.FileField(_('File'), upload_to='resources/files/', blank=True)
#     external_link = models.URLField(_('External Link'), blank=True)
#     is_external = models.BooleanField(_('Is External'), default=False)
#     is_downloadable = models.BooleanField(_('Is Downloadable'), default=False)
#     created_at = models.DateTimeField(_('Created At'), auto_now_add=True)
#     updated_at = models.DateTimeField(_('Updated At'), auto_now=True)
    
#     def __str__(self):
#         return self.title_en
    
#     class Meta:
#         verbose_name = _('Resource')
#         verbose_name_plural = _('Resources')
#         ordering = ['-created_at']

# class News(models.Model):
#     """Model for news"""
#     title_en = models.CharField(_('Title (English)'), max_length=200)
#     title_ru = models.CharField(_('Title (Russian)'), max_length=200)
#     title_uz = models.CharField(_('Title (Uzbek)'), max_length=200)
#     content_en = models.TextField(_('Content (English)'))
#     content_ru = models.TextField(_('Content (Russian)'))
#     content_uz = models.TextField(_('Content (Uzbek)'))
#     image = models.ImageField(_('Image'), upload_to='news/', blank=True)
#     date = models.DateField(_('Date'))
#     created_at = models.DateTimeField(_('Created At'), auto_now_add=True)
#     updated_at = models.DateTimeField(_('Updated At'), auto_now=True)
    
#     def __str__(self):
#         return self.title_en
    
#     class Meta:
#         verbose_name = _('News')
#         verbose_name_plural = _('News')
#         ordering = ['-date']



from django.contrib import admin
from .models import (
    Course, Instructor, CourseSyllabus, SyllabusTopics, 
    Enrollment, Project, ProjectMaterial, ProjectStep,
    Task, TaskRequirement, TaskHint, Resource, News
)

from unfold.admin import ModelAdmin, TabularInline

class SyllabusTopicsInline(TabularInline):
    model = SyllabusTopics
    extra = 3

class CourseSyllabusInline(TabularInline):
    model = CourseSyllabus
    extra = 4
    show_change_link = True

class InstructorInline(TabularInline):
    model = Instructor.courses.through
    extra = 1

@admin.register(Course)
class CourseAdmin(ModelAdmin):
    list_display = ('title_en', 'difficulty', 'max_students', 'created_at')
    list_filter = ('difficulty', 'created_at')
    search_fields = ('title_en', 'title_ru', 'title_uz')
    inlines = [CourseSyllabusInline, InstructorInline]
    fieldsets = (
        (None, {
            'fields': ('difficulty', 'max_students', 'image')
        }),
        ('English Content', {
            'fields': ('title_en', 'description_en', 'detailed_description_en', 
                      'duration_en', 'schedule_en', 'start_date_en', 'price_en')
        }),
        ('Russian Content', {
            'fields': ('title_ru', 'description_ru', 'detailed_description_ru', 
                      'duration_ru', 'schedule_ru', 'start_date_ru', 'price_ru')
        }),
        ('Uzbek Content', {
            'fields': ('title_uz', 'description_uz', 'detailed_description_uz', 
                      'duration_uz', 'schedule_uz', 'start_date_uz', 'price_uz')
        }),
    )

@admin.register(CourseSyllabus)
class CourseSyllabusAdmin(ModelAdmin):
    list_display = ('course', 'week', 'title_en')
    list_filter = ('course',)
    search_fields = ('title_en', 'title_ru', 'title_uz')
    inlines = [SyllabusTopicsInline]

@admin.register(Instructor)
class InstructorAdmin(ModelAdmin):
    list_display = ('name', 'title_en')
    search_fields = ('name', 'title_en', 'title_ru', 'title_uz')
    filter_horizontal = ('courses',)
    exclude = ('courses',)

class ProjectMaterialInline(TabularInline):
    model = ProjectMaterial
    extra = 3

class ProjectStepInline(TabularInline):
    model = ProjectStep
    extra = 3

@admin.register(Project)
class ProjectAdmin(ModelAdmin):
    list_display = ('title_en', 'difficulty', 'created_at')
    list_filter = ('difficulty', 'created_at')
    search_fields = ('title_en', 'title_ru', 'title_uz', 'tags')
    inlines = [ProjectMaterialInline, ProjectStepInline]
    fieldsets = (
        (None, {
            'fields': ('difficulty', 'tags', 'image', 'code_snippet')
        }),
        ('English Content', {
            'fields': ('title_en', 'description_en', 'detailed_description_en')
        }),
        ('Russian Content', {
            'fields': ('title_ru', 'description_ru', 'detailed_description_ru')
        }),
        ('Uzbek Content', {
            'fields': ('title_uz', 'description_uz', 'detailed_description_uz')
        }),
    )

class TaskRequirementInline(TabularInline):
    model = TaskRequirement
    extra = 3

class TaskHintInline(TabularInline):
    model = TaskHint
    extra = 2

@admin.register(Task)
class TaskAdmin(ModelAdmin):
    list_display = ('title_en', 'difficulty', 'points', 'related_course', 'status')
    list_filter = ('difficulty', 'status', 'related_course')
    search_fields = ('title_en', 'title_ru', 'title_uz')
    inlines = [TaskRequirementInline, TaskHintInline]
    fieldsets = (
        (None, {
            'fields': ('difficulty', 'points', 'related_course', 'status', 'sample_code')
        }),
        ('English Content', {
            'fields': ('title_en', 'description_en', 'detailed_description_en', 'estimated_time_en')
        }),
        ('Russian Content', {
            'fields': ('title_ru', 'description_ru', 'detailed_description_ru', 'estimated_time_ru')
        }),
        ('Uzbek Content', {
            'fields': ('title_uz', 'description_uz', 'detailed_description_uz', 'estimated_time_uz')
        }),
    )

@admin.register(Resource)
class ResourceAdmin(ModelAdmin):
    list_display = ('title_en', 'category', 'is_external', 'is_downloadable')
    list_filter = ('category', 'is_external', 'is_downloadable', 'created_at')
    search_fields = ('title_en', 'title_ru', 'title_uz')
    fieldsets = (
        (None, {
            'fields': ('category', 'image', 'file', 'external_link', 'is_external', 'is_downloadable')
        }),
        ('English Content', {
            'fields': ('title_en', 'description_en', 'content_en')
        }),
        ('Russian Content', {
            'fields': ('title_ru', 'description_ru', 'content_ru')
        }),
        ('Uzbek Content', {
            'fields': ('title_uz', 'description_uz', 'content_uz')
        }),
    )

@admin.register(News)
class NewsAdmin(ModelAdmin):
    list_display = ('title_en', 'date', 'created_at')
    list_filter = ('date', 'created_at')
    search_fields = ('title_en', 'title_ru', 'title_uz')
    fieldsets = (
        (None, {
            'fields': ('date', 'image')
        }),
        ('English Content', {
            'fields': ('title_en', 'content_en')
        }),
        ('Russian Content', {
            'fields': ('title_ru', 'content_ru')
        }),
        ('Uzbek Content', {
            'fields': ('title_uz', 'content_uz')
        }),
    )

@admin.register(Enrollment)
class EnrollmentAdmin(ModelAdmin):
    list_display = ('first_name', 'last_name', 'phone', 'course', 'status', 'created_at')
    list_filter = ('status', 'course', 'created_at')
    search_fields = ('first_name', 'last_name', 'phone')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('first_name', 'last_name', 'phone', 'course', 'comments', 'status')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

# Register remaining models
admin.site.register(SyllabusTopics)
admin.site.register(ProjectMaterial)
admin.site.register(ProjectStep)
admin.site.register(TaskRequirement)
admin.site.register(TaskHint)


from rest_framework import serializers
from .models import (
    Course, Instructor, CourseSyllabus, SyllabusTopics, 
    Enrollment, Project, ProjectMaterial, ProjectStep,
    Task, TaskRequirement, TaskHint, Resource, News
)

class SyllabusTopicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SyllabusTopics
        fields = ['id', 'topic_en', 'topic_ru', 'topic_uz']

class CourseSyllabusSerializer(serializers.ModelSerializer):
    topics = SyllabusTopicsSerializer(many=True, read_only=True)
    
    class Meta:
        model = CourseSyllabus
        fields = ['id', 'week', 'title_en', 'title_ru', 'title_uz', 'topics']

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = [
            'id', 'name', 'title_en', 'title_ru', 'title_uz',
            'bio_en', 'bio_ru', 'bio_uz', 'photo'
        ]

class CourseSerializer(serializers.ModelSerializer):
    instructors = InstructorSerializer(many=True, read_only=True)
    syllabus_items = CourseSyllabusSerializer(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = [
            'id', 'title_en', 'title_ru', 'title_uz',
            'description_en', 'description_ru', 'description_uz',
            'detailed_description_en', 'detailed_description_ru', 'detailed_description_uz',
            'image', 'difficulty', 
            'duration_en', 'duration_ru', 'duration_uz',
            'schedule_en', 'schedule_ru', 'schedule_uz',
            'start_date_en', 'start_date_ru', 'start_date_uz',
            'max_students', 
            'price_en', 'price_ru', 'price_uz',
            'instructors', 'syllabus_items',
            'created_at', 'updated_at'
        ]

class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.SerializerMethodField()
    
    class Meta:
        model = Enrollment
        fields = [
            'id', 'first_name', 'last_name', 'phone',
            'course', 'course_title', 'comments', 'status',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['status']
    
    def get_course_title(self, obj):
        return {
            'en': obj.course.title_en,
            'ru': obj.course.title_ru,
            'uz': obj.course.title_uz
        }

class ProjectMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMaterial
        fields = ['id', 'material_en', 'material_ru', 'material_uz']

class ProjectStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectStep
        fields = [
            'id', 'order', 'title_en', 'title_ru', 'title_uz',
            'description_en', 'description_ru', 'description_uz'
        ]

class ProjectSerializer(serializers.ModelSerializer):
    materials = ProjectMaterialSerializer(many=True, read_only=True)
    steps = ProjectStepSerializer(many=True, read_only=True)
    tags_list = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title_en', 'title_ru', 'title_uz',
            'description_en', 'description_ru', 'description_uz',
            'detailed_description_en', 'detailed_description_ru', 'detailed_description_uz',
            'image', 'difficulty', 'tags', 'tags_list', 'code_snippet',
            'materials', 'steps', 'created_at', 'updated_at'
        ]
    
    def get_tags_list(self, obj):
        return obj.get_tags_list()

class TaskRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskRequirement
        fields = ['id', 'requirement_en', 'requirement_ru', 'requirement_uz']

class TaskHintSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskHint
        fields = ['id', 'hint_en', 'hint_ru', 'hint_uz']

class TaskSerializer(serializers.ModelSerializer):
    requirements = TaskRequirementSerializer(many=True, read_only=True)
    hints = TaskHintSerializer(many=True, read_only=True)
    related_course_title = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = [
            'id', 'title_en', 'title_ru', 'title_uz',
            'description_en', 'description_ru', 'description_uz',
            'detailed_description_en', 'detailed_description_ru', 'description_uz',
            'detailed_description_en', 'detailed_description_ru', 'detailed_description_uz',
            'points', 'estimated_time_en', 'estimated_time_ru', 'estimated_time_uz',
            'difficulty', 'related_course', 'related_course_title', 'status', 'sample_code',
            'requirements', 'hints', 'created_at', 'updated_at'
        ]
    
    def get_related_course_title(self, obj):
        return {
            'en': obj.related_course.title_en,
            'ru': obj.related_course.title_ru,
            'uz': obj.related_course.title_uz
        }

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = [
            'id', 'title_en', 'title_ru', 'title_uz',
            'description_en', 'description_ru', 'description_uz',
            'content_en', 'content_ru', 'content_uz',
            'image', 'category', 'file', 'external_link',
            'is_external', 'is_downloadable', 'created_at', 'updated_at'
        ]

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = [
            'id', 'title_en', 'title_ru', 'title_uz',
            'content_en', 'content_ru', 'content_uz',
            'image', 'date', 'created_at', 'updated_at'
        ]


from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet, InstructorViewSet, EnrollmentViewSet,
    ProjectViewSet, TaskViewSet, ResourceViewSet, NewsViewSet,
    health_check  # Add this import
)

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'instructors', InstructorViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'resources', ResourceViewSet)
router.register(r'news', NewsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('health-check/', health_check, name='health_check'),  # Add this line
]


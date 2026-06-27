from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ContentView,
    HeroViewSet, 
    FeatureViewSet, 
    AboutViewSet, 
    TestimonialViewSet
)

# Create a router for our API viewsets
router = DefaultRouter()
router.register(r'hero', HeroViewSet)
router.register(r'features', FeatureViewSet)
router.register(r'about', AboutViewSet)
router.register(r'testimonials', TestimonialViewSet)

urlpatterns = [
    # Main API route to get all content in one request
    path('content/', ContentView.as_view(), name='content'),
    
    # Individual model routes
    path('', include(router.urls)),
]
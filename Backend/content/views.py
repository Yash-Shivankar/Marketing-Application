from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Hero, Feature, About, Testimonial
from .serializers import (
    HeroSerializer, 
    FeatureSerializer, 
    AboutSerializer, 
    TestimonialSerializer,
    ContentSerializer
)

class ContentView(APIView):
    """View to get all content sections in one request"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        serializer = ContentSerializer({})
        return Response(serializer.data)

class HeroViewSet(viewsets.ModelViewSet):
    """ViewSet for the Hero model"""
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class FeatureViewSet(viewsets.ModelViewSet):
    """ViewSet for the Feature model"""
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

class AboutViewSet(viewsets.ModelViewSet):
    """ViewSet for the About model"""
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class TestimonialViewSet(viewsets.ModelViewSet):
    """ViewSet for the Testimonial model"""
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
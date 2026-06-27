from rest_framework import serializers
from .models import Hero, Feature, About, Testimonial

class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ['id', 'title', 'subtitle', 'image', 'updated_at']

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ['id', 'title', 'description', 'icon', 'updated_at']

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = ['id', 'title', 'content', 'image', 'updated_at']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'quote', 'author', 'company', 'image', 'updated_at']

class ContentSerializer(serializers.Serializer):
    """Serializer that combines all content sections"""
    hero = serializers.SerializerMethodField()
    features = serializers.SerializerMethodField()
    about = serializers.SerializerMethodField()
    testimonials = serializers.SerializerMethodField()
    
    def get_hero(self, obj):
        hero = Hero.objects.first()
        if hero:
            return HeroSerializer(hero).data
        return None
    
    def get_features(self, obj):
        features = Feature.objects.all()
        return FeatureSerializer(features, many=True).data
    
    def get_about(self, obj):
        about = About.objects.first()
        if about:
            return AboutSerializer(about).data
        return None
    
    def get_testimonials(self, obj):
        testimonials = Testimonial.objects.all()
        return TestimonialSerializer(testimonials, many=True).data
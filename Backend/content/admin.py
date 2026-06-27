from django.contrib import admin
from .models import Hero, Feature, About, Testimonial

@admin.register(Hero)
class HeroAdmin(admin.ModelAdmin):
    list_display = ('title', 'updated_at')

@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon', 'updated_at')

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ('title', 'updated_at')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('author', 'company', 'updated_at')
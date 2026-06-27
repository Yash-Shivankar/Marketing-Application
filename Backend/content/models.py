from django.db import models

class BaseContentModel(models.Model):
    """Base model for all content types with common fields"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Hero(BaseContentModel):
    """Model for the hero section content"""
    title = models.CharField(max_length=200)
    subtitle = models.TextField()
    image = models.ImageField(upload_to='hero/')
    
    def __str__(self):
        return self.title

class Feature(BaseContentModel):
    """Model for individual features"""
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50)
    
    def __str__(self):
        return self.title

class About(BaseContentModel):
    """Model for the about section content"""
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='about/')
    
    def __str__(self):
        return self.title

class Testimonial(BaseContentModel):
    """Model for client testimonials"""
    quote = models.TextField()
    author = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    image = models.ImageField(upload_to='testimonials/')
    
    def __str__(self):
        return f"Testimonial by {self.author}"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { ContentType } from '../types';

const HomePage: React.FC = () => {
  const [content, setContent] = useState<ContentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get('/api/content/');
        setContent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch content', error);
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Fallback content if API fails
  const fallbackContent = {
    hero: {
      title: 'Transform Your Business with Our Solutions',
      subtitle: 'Innovative software to help you grow and succeed',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    features: [
      {
        title: 'Powerful Analytics',
        description: 'Gain insights from your data with our powerful analytics tools',
        icon: 'BarChart'
      },
      {
        title: 'Cloud Integration',
        description: 'Seamlessly integrate with cloud services for maximum efficiency',
        icon: 'Cloud'
      },
      {
        title: 'Security First',
        description: 'Your data is protected with enterprise-grade security',
        icon: 'Shield'
      }
    ],
    about: {
      title: 'About Us',
      content: 'We are a team of passionate developers dedicated to creating solutions that help businesses succeed.',
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    testimonials: [
      {
        quote: 'This solution transformed our business processes completely!',
        author: 'Jane Smith',
        company: 'Tech Innovations',
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection data={content?.hero || fallbackContent.hero} />
        <FeaturesSection data={content?.features || fallbackContent.features} />
        <AboutSection data={content?.about || fallbackContent.about} />
        <TestimonialsSection data={content?.testimonials || fallbackContent.testimonials} />
        <ContactSection />
        <Footer />
      </motion.div>
    </div>
  );
};

export default HomePage;
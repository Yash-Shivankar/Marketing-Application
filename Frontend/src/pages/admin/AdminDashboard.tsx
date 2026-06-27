import { motion } from 'framer-motion';
import { Edit, Home, LogOut, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { ContentType } from '../../types';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [content, setContent] = useState<ContentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchContent = async () => {
    try {
      setRefreshing(true);
      const response = await api.get('/api/content/');
      setContent(response.data);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Failed to fetch content', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleRefresh = () => {
    fetchContent();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Fallback content if API fails
  const fallbackContent = {
    hero: {
      id: 'hero',
      title: 'Transform Your Business with Our Solutions',
      subtitle: 'Innovative software to help you grow and succeed',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
    },
    features: [
      {
        id: 'feature-1',
        title: 'Powerful Analytics',
        description: 'Gain insights from your data with our powerful analytics tools',
        icon: 'BarChart'
      },
      {
        id: 'feature-2',
        title: 'Cloud Integration',
        description: 'Seamlessly integrate with cloud services for maximum efficiency',
        icon: 'Cloud'
      },
      {
        id: 'feature-3',
        title: 'Security First',
        description: 'Your data is protected with enterprise-grade security',
        icon: 'Shield'
      }
    ],
    about: {
      id: 'about',
      title: 'About Us',
      content: 'We are a team of passionate developers dedicated to creating solutions that help businesses succeed.',
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg'
    },
    testimonials: [
      {
        id: 'testimonial-1',
        quote: 'This solution transformed our business processes completely!',
        author: 'Jane Smith',
        company: 'Tech Innovations',
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
      }
    ]
  };

  const displayContent = {
  hero: content?.hero ?? fallbackContent.hero,
  features: content?.features?.length ? content.features : fallbackContent.features,
  about: content?.about ?? fallbackContent.about,
  testimonials: content?.testimonials?.length
    ? content.testimonials
    : fallbackContent.testimonials
};

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                className={`p-2 rounded-full hover:bg-gray-100 focus:outline-none ${
                  refreshing ? 'animate-spin text-blue-600' : 'text-gray-600'
                }`}
                disabled={refreshing}
              >
                <RefreshCw size={20} />
              </button>
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Home size={20} className="mr-1" /> View Site
              </Link>
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut size={20} className="mr-1" /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome, {user?.username || 'Admin'}!</h2>
            <p className="text-gray-600">
              This dashboard allows you to manage your website content. Select a section below to edit.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Sections</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Hero Section Card */}
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-40 bg-gray-200 relative">
                <img
                  src={displayContent.hero.image}
                  alt="Hero Section"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Hero Section</h3>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate">{displayContent.hero.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{displayContent.hero.subtitle}</p>
                <Link
                  to={`/admin/edit/hero`}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Edit size={16} className="mr-2" /> Edit Section
                </Link>
              </div>
            </motion.div>

            {/* About Section Card */}
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-40 bg-gray-200 relative">
                <img
                  src={displayContent.about.image}
                  alt="About Section"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">About Section</h3>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate">{displayContent.about.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{displayContent.about.content}</p>
                <Link
                  to={`/admin/edit/about`}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Edit size={16} className="mr-2" /> Edit Section
                </Link>
              </div>
            </motion.div>

            {/* Features Section Card */}
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-40 bg-gray-200 relative flex items-center justify-center">
                <div className="grid grid-cols-3 gap-2 w-full px-4">
                  {displayContent.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="bg-white p-2 rounded shadow text-center">
                      <div className="text-blue-500 flex justify-center">
                        {/* Icon representation */}
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs">{feature.icon}</span>
                        </div>
                      </div>
                      <p className="text-xs mt-1 font-medium truncate">{feature.title}</p>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Features Section</h3>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">Features ({displayContent.features.length})</h3>
                <p className="text-sm text-gray-600 mt-1">Manage your feature highlights</p>
                <Link
                  to={`/admin/edit/features`}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Edit size={16} className="mr-2" /> Edit Features
                </Link>
              </div>
            </motion.div>

            {/* Testimonials Section Card */}
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-40 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center overflow-hidden">
                    {displayContent.testimonials[0]?.image && (
                      <img
                        src={displayContent.testimonials[0].image}
                        alt="Testimonial"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Testimonials</h3>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">Testimonials ({displayContent.testimonials.length})</h3>
                <p className="text-sm text-gray-600 mt-1">Manage client testimonials and reviews</p>
                <Link
                  to={`/admin/edit/testimonials`}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Edit size={16} className="mr-2" /> Edit Testimonials
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
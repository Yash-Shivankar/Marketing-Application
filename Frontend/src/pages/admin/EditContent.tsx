import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Trash, Plus, Image as ImageIcon, Upload } from 'lucide-react';
import api from '../../services/api';
import * as LucideIcons from 'lucide-react';

// This component handles editing for all content section types
const EditContent: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm();
  
  // For features and testimonials which are arrays
  const { fields, append, remove } = useFieldArray({
    control,
    name: sectionId === 'features' ? 'features' : sectionId === 'testimonials' ? 'testimonials' : '',
  });

  // Load content for the specific section
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // This would be a real API call in production
        // const response = await api.get(`/api/content/${sectionId}/`);
        
        // For demo purposes, we'll use mock data
        const mockData = getMockData();
        reset(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch content', error);
        setError('Failed to load content. Please try again.');
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [sectionId, reset]);

  // Mock data function - in production this would come from the API
  const getMockData = () => {
    switch (sectionId) {
      case 'hero':
        return {
          title: 'Transform Your Business with Our Solutions',
          subtitle: 'Innovative software to help you grow and succeed',
          image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
        };
      case 'about':
        return {
          title: 'About Us',
          content: 'We are a team of passionate developers dedicated to creating solutions that help businesses succeed.',
          image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg'
        };
      case 'features':
        return {
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
          ]
        };
      case 'testimonials':
        return {
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
      default:
        return {};
    }
  };

  const onSubmit = async (data: any) => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      // This would be a real API call in production
      // await api.put(`/api/content/${sectionId}/`, data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage('Content updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Failed to update content', error);
      setError('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Add a new feature or testimonial
  const handleAddItem = () => {
    if (sectionId === 'features') {
      append({ 
        id: `feature-${Date.now()}`,
        title: 'New Feature',
        description: 'Description for the new feature',
        icon: 'Star'
      });
    } else if (sectionId === 'testimonials') {
      append({
        id: `testimonial-${Date.now()}`,
        quote: 'New testimonial quote',
        author: 'Author Name',
        company: 'Company Name',
        image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
      });
    }
  };

  // For image upload preview
  const watchedImages = watch();

  // Get available Lucide icons for the feature icon selector
  const iconOptions = Object.keys(LucideIcons)
    .filter(key => typeof (LucideIcons as any)[key] === 'function' && key !== 'default')
    .slice(0, 30); // Limit to first 30 icons for simplicity

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/admin" className="text-gray-600 hover:text-blue-600 mr-2">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Edit {sectionId?.charAt(0).toUpperCase()}{sectionId?.slice(1)} Section
              </h1>
            </div>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-r-transparent rounded-full"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400\" viewBox="0 0 20 20\" fill="currentColor">
                    <path fillRule="evenodd\" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z\" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Hero Section Form */}
            {sectionId === 'hero' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hero Title
                  </label>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'Title is required' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter hero title"
                      />
                    )}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{(errors.title as any).message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hero Subtitle
                  </label>
                  <Controller
                    name="subtitle"
                    control={control}
                    rules={{ required: 'Subtitle is required' }}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter hero subtitle"
                      />
                    )}
                  />
                  {errors.subtitle && (
                    <p className="mt-1 text-sm text-red-600">{(errors.subtitle as any).message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hero Background Image
                  </label>
                  <div className="mt-1 flex items-center">
                    <Controller
                      name="image"
                      control={control}
                      rules={{ required: 'Image URL is required' }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter image URL"
                        />
                      )}
                    />
                    <div className="ml-3 flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Upload size={16} className="mr-2" /> Upload
                      </button>
                    </div>
                  </div>
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{(errors.image as any).message}</p>
                  )}
                </div>

                {watchedImages?.image && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Preview
                    </label>
                    <div className="mt-1 border border-gray-300 rounded-md p-2">
                      <img
                        src={watchedImages.image}
                        alt="Preview"
                        className="h-48 w-full object-cover rounded"
                        onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+Not+Available'}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* About Section Form */}
            {sectionId === 'about' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About Title
                  </label>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'Title is required' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter about title"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About Content
                  </label>
                  <Controller
                    name="content"
                    control={control}
                    rules={{ required: 'Content is required' }}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter about content"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About Image
                  </label>
                  <div className="mt-1 flex items-center">
                    <Controller
                      name="image"
                      control={control}
                      rules={{ required: 'Image URL is required' }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter image URL"
                        />
                      )}
                    />
                    <div className="ml-3 flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Upload size={16} className="mr-2" /> Upload
                      </button>
                    </div>
                  </div>
                </div>

                {watchedImages?.image && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Preview
                    </label>
                    <div className="mt-1 border border-gray-300 rounded-md p-2">
                      <img
                        src={watchedImages.image}
                        alt="Preview"
                        className="h-48 w-full object-cover rounded"
                        onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+Not+Available'}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Features Section Form */}
            {sectionId === 'features' && (
              <div className="space-y-8">
                {fields.map((field, index) => (
                  <div 
                    key={field.id} 
                    className="p-4 border border-gray-300 rounded-md relative bg-gray-50"
                  >
                    <h3 className="font-medium text-lg mb-4">Feature {index + 1}</h3>
                    
                    <div className="absolute top-4 right-4">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Feature Title
                        </label>
                        <Controller
                          name={`features.${index}.title`}
                          control={control}
                          rules={{ required: 'Title is required' }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter feature title"
                            />
                          )}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Icon
                        </label>
                        <Controller
                          name={`features.${index}.icon`}
                          control={control}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {iconOptions.map(icon => (
                                <option key={icon} value={icon}>
                                  {icon}
                                </option>
                              ))}
                            </select>
                          )}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <Controller
                          name={`features.${index}.description`}
                          control={control}
                          rules={{ required: 'Description is required' }}
                          render={({ field }) => (
                            <textarea
                              {...field}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter feature description"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus size={16} className="mr-2" /> Add Feature
                  </button>
                </div>
              </div>
            )}

            {/* Testimonials Section Form */}
            {sectionId === 'testimonials' && (
              <div className="space-y-8">
                {fields.map((field, index) => (
                  <div 
                    key={field.id} 
                    className="p-4 border border-gray-300 rounded-md relative bg-gray-50"
                  >
                    <h3 className="font-medium text-lg mb-4">Testimonial {index + 1}</h3>
                    
                    <div className="absolute top-4 right-4">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quote
                        </label>
                        <Controller
                          name={`testimonials.${index}.quote`}
                          control={control}
                          rules={{ required: 'Quote is required' }}
                          render={({ field }) => (
                            <textarea
                              {...field}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter testimonial quote"
                            />
                          )}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Author Name
                        </label>
                        <Controller
                          name={`testimonials.${index}.author`}
                          control={control}
                          rules={{ required: 'Author name is required' }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter author name"
                            />
                          )}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <Controller
                          name={`testimonials.${index}.company`}
                          control={control}
                          rules={{ required: 'Company name is required' }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter company name"
                            />
                          )}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Author Image
                        </label>
                        <div className="flex items-center">
                          <Controller
                            name={`testimonials.${index}.image`}
                            control={control}
                            rules={{ required: 'Image URL is required' }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter image URL"
                              />
                            )}
                          />
                          <div className="ml-3 flex-shrink-0">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <Upload size={16} className="mr-2" /> Upload
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {watchedImages?.testimonials?.[index]?.image && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image Preview
                          </label>
                          <div className="mt-1 border border-gray-300 rounded-md p-2 w-24 h-24">
                            <img
                              src={watchedImages.testimonials[index].image}
                              alt="Preview"
                              className="h-full w-full object-cover rounded"
                              onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Error'}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus size={16} className="mr-2" /> Add Testimonial
                  </button>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default EditContent;
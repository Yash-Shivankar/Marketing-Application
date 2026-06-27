import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  image: string;
}

interface TestimonialsSectionProps {
  data: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };


  if (!Array.isArray(data) || data.length === 0) {
    return (
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="text-center text-gray-500">No testimonials available.</div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from some of our satisfied clients.
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row items-center mb-6">
              <img
                src={data[currentIndex].image}
                alt={data[currentIndex].author}
                className="w-20 h-20 rounded-full object-cover mr-0 md:mr-6 mb-4 md:mb-0"
              />
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-gray-900">{data[currentIndex].author}</h4>
                <p className="text-gray-600">{data[currentIndex].company}</p>
              </div>
            </div>
            <blockquote className="text-lg md:text-xl italic text-gray-800 leading-relaxed">
              "{data[currentIndex].quote}"
            </blockquote>
          </motion.div>

          {/* Navigation Buttons (only show if there are multiple testimonials) */}
          {data.length > 1 && (
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors focus:outline-none"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} className="text-blue-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors focus:outline-none"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} className="text-blue-600" />
              </button>
            </div>
          )}

          {/* Dots indicator */}
          {data.length > 1 && (
            <div className="flex justify-center mt-4">
              {data.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 mx-1 rounded-full focus:outline-none ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
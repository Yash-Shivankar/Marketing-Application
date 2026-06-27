import { motion } from 'framer-motion';
import React from 'react';

interface AboutProps {
  data: {
    title: string;
    content: string;
    image: string;
  };
}

const AboutSection: React.FC<AboutProps> = ({ data }) => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {data.title}
            </h2>
            <div className="text-gray-600 space-y-4">
              <p className="text-lg leading-relaxed">{data.content}</p>
              <p className="text-lg leading-relaxed">
                Our team of experts brings years of industry experience to every project, ensuring you receive the highest quality service and support.
              </p>
            </div>
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Learn More About Us
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <img
              src={data.image}
              alt="About Our Company"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              style={{ maxHeight: '500px' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
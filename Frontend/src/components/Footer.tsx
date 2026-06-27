import React from 'react';
import { ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="ml-2 font-bold text-xl text-white">
                MarketCMS
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Creating beautiful, dynamic marketing websites with powerful content management.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-blue-400 flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-1" /> Features
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-blue-400 flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-1" /> About Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-blue-400 flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-1" /> Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-blue-400 flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-1" /> Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-1" /> Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-1" /> Digital Marketing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-1" /> SEO Optimization
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-1" /> Content Creation
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest news and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg flex-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {currentYear} MarketCMS. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-12 mt-16 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-brand-600">ProjectMarket</h3>
            <p className="text-gray-600 mb-4">
              The premier marketplace for college final-year projects. Connect with talented students and acquire innovative solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-brand-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-600">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Projects', 'Categories', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-gray-600 hover:text-brand-600"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {[
                'Web Development', 
                'Mobile Apps', 
                'AI & Machine Learning', 
                'IoT Projects', 
                'Blockchain', 
                'Data Science'
              ].map((category) => (
                <li key={category}>
                  <Link 
                    to={`/categories/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
                    className="text-gray-600 hover:text-brand-600"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Support */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact & Support</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-gray-600" />
                <a href="mailto:support@projectmarket.com" className="text-gray-600 hover:text-brand-600">
                  support@projectmarket.com
                </a>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-brand-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-brand-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-brand-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t mt-12 pt-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} ProjectMarket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

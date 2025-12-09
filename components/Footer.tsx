import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="bg-primary-600 p-2 rounded-xl text-white shadow-lg shadow-primary-900/50">
                <GraduationCap size={20} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                UpSkill<span className="text-primary-400">Hub</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering learners worldwide to master new technologies and achieve their career goals through structured, high-quality education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/skills" className="text-gray-400 hover:text-primary-400 text-sm">Browse Courses</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary-400 text-sm">Mentorship</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-primary-400 text-sm">Resources</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-400 text-sm">About Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-4">Top Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/skills?cat=Development" className="text-gray-400 hover:text-primary-400 text-sm">Development</Link></li>
              <li><Link to="/skills?cat=Data Science" className="text-gray-400 hover:text-primary-400 text-sm">Data Science</Link></li>
              <li><Link to="/skills?cat=Design" className="text-gray-400 hover:text-primary-400 text-sm">UI/UX Design</Link></li>
              <li><Link to="/skills?cat=Cloud" className="text-gray-400 hover:text-primary-400 text-sm">Cloud Computing</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest course alerts and tech news.</p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-primary-500"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2024 UpSkillHub. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
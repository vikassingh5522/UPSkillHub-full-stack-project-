import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, CheckCircle } from 'lucide-react';
import { subscribeNewsletter } from '../services/newsletter';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    const result = await subscribeNewsletter(email.trim());
    
    if (result.data) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    } else if (result.error) {
      setError(result.error);
    }
    
    setIsSubmitting(false);
  };
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
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-green-400 text-sm py-2">
                  <CheckCircle size={16} />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="text-red-400 text-xs mb-1">{error}</div>
                  )}
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    placeholder="Enter your email" 
                    required
                    className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-primary-500"
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </>
              )}
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
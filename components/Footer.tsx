import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook, Twitter, Instagram, Linkedin, Mail, CheckCircle,
  Github, Youtube, ArrowRight, Heart, MapPin, Phone, Send,
  BookOpen, Users, Award, Sparkles
} from 'lucide-react';
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

  // Navigation links matching the Navbar
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Courses', path: '/skills' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  // Course categories
  const categories = [
    { name: 'Web Development', path: '/skills?category=Development' },
    { name: 'Data Science', path: '/skills?category=Data%20Science' },
    { name: 'UI/UX Design', path: '/skills?category=Design' },
    { name: 'Machine Learning', path: '/skills?category=AI' },
    { name: 'Cloud Computing', path: '/skills?category=Cloud' },
    { name: 'Cybersecurity', path: '/skills?category=Security' },
  ];

  // Stats
  const stats = [
    { icon: <BookOpen size={18} />, value: '200+', label: 'Courses' },
    { icon: <Users size={18} />, value: '50K+', label: 'Students' },
    { icon: <Award size={18} />, value: '15K+', label: 'Certificates' },
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-primary-900/50 via-purple-900/50 to-indigo-900/50 rounded-2xl p-8 md:p-10 backdrop-blur-sm border border-gray-700/50">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 mb-4">
                  <Sparkles size={14} className="text-yellow-400" />
                  <span className="text-xs text-gray-300">Stay Updated</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-gray-400">
                  Get the latest course updates, tech news, and exclusive offers delivered to your inbox.
                </p>
              </div>
              <div>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  {isSubscribed ? (
                    <div className="flex items-center gap-2 text-green-400 py-3 px-4 bg-green-500/10 rounded-xl border border-green-500/30">
                      <CheckCircle size={20} />
                      <span>Subscribed successfully! Check your inbox.</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1">
                        {error && (
                          <div className="text-red-400 text-xs mb-2">{error}</div>
                        )}
                        <div className="relative">
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setError(null);
                            }}
                            placeholder="Enter your email address"
                            required
                            className="w-full bg-gray-800/80 border border-gray-700 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all"
                      >
                        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            {/* Logo - Same as Navbar */}
            <Link to="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="relative">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                >
                  <defs>
                    <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="50%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                  <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#footerLogoGradient)" />
                  <path d="M32 16L42 28H36V36H28V28H22L32 16Z" fill="white" opacity="0.95" />
                  <path d="M20 38H44V46C44 47.1046 43.1046 48 42 48H22C20.8954 48 20 47.1046 20 46V38Z" fill="white" opacity="0.9" />
                  <path d="M24 42H40" stroke="url(#footerLogoGradient)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M24 45H36" stroke="url(#footerLogoGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                  <circle cx="46" cy="18" r="3" fill="white" opacity="0.8" />
                  <circle cx="48" cy="16" r="1.5" fill="#FCD34D" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none">
                  <span className="text-white group-hover:text-gray-100 transition-colors">Up</span>
                  <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Skill</span>
                </span>
                <span className="text-[9px] text-gray-500 tracking-[0.15em] uppercase font-medium">
                  Learn • Grow • Succeed
                </span>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering learners worldwide to master new technologies and achieve their career goals through structured, high-quality education and mentorship.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mb-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center gap-1 text-primary-400 mb-1">
                    {stat.icon}
                    <span className="text-lg font-bold text-white">{stat.value}</span>
                  </div>
                  <span className="text-xs text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
                { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
                { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
                { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
                { icon: <Github size={18} />, href: '#', label: 'GitHub' },
                { icon: <Youtube size={18} />, href: '#', label: 'YouTube' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 text-sm flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Categories</h4>
            <ul className="space-y-3">
              {categories.map((cat, i) => (
                <li key={i}>
                  <Link
                    to={cat.path}
                    className="text-gray-400 hover:text-primary-400 text-sm flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:support@upskillhub.com" className="flex items-start gap-3 text-gray-400 hover:text-primary-400 transition-colors">
                  <Mail size={18} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">support@upskillhub.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="flex items-start gap-3 text-gray-400 hover:text-primary-400 transition-colors">
                  <Phone size={18} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    123 Tech Avenue,<br />
                    Silicon Valley, CA 94025
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright & Author */}
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} UpSkill. All rights reserved.
              </p>
              <span className="hidden sm:block text-gray-700">•</span>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                Made with <Heart size={14} className="text-red-500 fill-red-500" /> by{' '}
                <span className="text-primary-400 font-medium">Vikas Singh</span>
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/privacy" className="text-gray-500 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-500 hover:text-primary-400 text-sm transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onLoginClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { isAuthenticated, user, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Courses', path: '/skills' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getUserDisplayName = () => {
    if (user?.name) {
      return user.name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Student';
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            {/* Modern SVG Logo */}
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
                  <linearGradient id="navLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="50%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                {/* Rounded square background */}
                <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#navLogoGradient)" />
                {/* Upward arrow / growth symbol */}
                <path d="M32 16L42 28H36V36H28V28H22L32 16Z" fill="white" opacity="0.95" />
                {/* Book / knowledge base */}
                <path d="M20 38H44V46C44 47.1046 43.1046 48 42 48H22C20.8954 48 20 47.1046 20 46V38Z" fill="white" opacity="0.9" />
                {/* Book lines */}
                <path d="M24 42H40" stroke="url(#navLogoGradient)" strokeWidth="2" strokeLinecap="round" />
                <path d="M24 45H36" stroke="url(#navLogoGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                {/* Sparkle accent */}
                <circle cx="46" cy="18" r="3" fill="white" opacity="0.8" />
                <circle cx="48" cy="16" r="1.5" fill="#FCD34D" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-none">
                <span className="text-white group-hover:text-gray-100 transition-colors">Up</span>
                <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Skill</span>
              </span>
              <span className="text-[9px] text-gray-500 tracking-[0.15em] uppercase font-medium hidden sm:block">
                Learn • Grow • Succeed
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-400 ${
                  isActive(link.path) ? 'text-primary-400 font-bold' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-200">
                  Welcome, {getUserDisplayName()}
                </span>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-red-400 bg-red-900/20 hover:bg-red-900/30 transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="text-gray-300 hover:text-primary-400 font-medium text-sm"
                >
                  Sign In
                </button>
                <button
                  onClick={onLoginClick}
                  className="px-5 py-2.5 rounded-full bg-primary-600 text-white font-medium text-sm shadow-md hover:bg-primary-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary-900/30 text-primary-400'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-800 mt-4">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-400">
                    Signed in as {getUserDisplayName()}
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-red-400 hover:bg-red-900/20"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-base font-medium text-primary-400 hover:bg-primary-900/30"
                >
                  Sign In / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

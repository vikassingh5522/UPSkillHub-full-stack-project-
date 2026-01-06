import React, { useState, Suspense } from 'react';
import {
  X, Mail, Lock, User, ArrowRight, Loader2, AlertCircle,
  Eye, EyeOff, Sparkles, CheckCircle, Github, Chrome
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Auth3DScene } from './Auth3DScene';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { signUp, signIn } = useAuth();

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError(null);
    setShowPassword(false);
    setAgreedToTerms(false);
  };

  const handleModeSwitch = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  const validateForm = (): string | null => {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address';
    }
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (isSignUp && name && name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      let result;

      if (isSignUp) {
        result = await signUp(email.trim(), password, name.trim() || undefined);
      } else {
        result = await signIn(email.trim(), password);
      }

      if (result.success) {
        resetForm();
        onClose();
      } else {
        setError(result.error || 'An error occurred. Please try again.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: '', color: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

    return {
      strength,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || ''
    };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden transform transition-all border border-gray-700/50">
        <div className="grid md:grid-cols-2">
          {/* Left Side - 3D Scene */}
          <div className="hidden md:block relative bg-gradient-to-br from-primary-900 via-purple-900 to-indigo-900 min-h-[500px]">
            {/* Background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl" />
            </div>

            {/* 3D Scene */}
            <div className="absolute inset-0">
              <Suspense fallback={null}>
                <Auth3DScene variant={isSignUp ? 'signup' : 'signin'} />
              </Suspense>
            </div>

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
                  <Sparkles size={14} className="text-yellow-400" />
                  <span className="text-xs text-gray-300">
                    {isSignUp ? 'Start Your Journey' : 'Welcome Back'}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isSignUp ? 'Join 50,000+ Learners' : 'Continue Learning'}
                </h3>
                <p className="text-gray-300 text-sm">
                  {isSignUp
                    ? 'Create your account and unlock unlimited access to courses, resources, and a supportive community.'
                    : 'Pick up right where you left off. Your progress is saved and waiting for you.'}
                </p>

                {/* Features list */}
                <div className="mt-6 space-y-2">
                  {(isSignUp
                    ? ['Access to 200+ courses', 'Earn certificates', 'Join our community']
                    : ['Track your progress', 'Resume courses', 'Access your certificates']
                  ).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle size={14} className="text-green-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="relative p-8 md:p-10">
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              aria-label="Close authentication modal"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </h2>
              <p className="text-gray-400">
                {isSignUp
                  ? 'Fill in your details to get started'
                  : 'Enter your credentials to continue'}
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white transition-all border border-gray-700"
              >
                <Chrome size={18} />
                <span className="text-sm font-medium">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white transition-all border border-gray-700"
              >
                <Github size={18} />
                <span className="text-sm font-medium">GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-500">or continue with email</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 animate-slide-up">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={16} className="text-red-400" />
                </div>
                <p className="text-sm text-red-400 pt-1">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field (Sign Up only) */}
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                      className="block w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="block w-full pl-11 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password strength indicator (Sign Up only) */}
                {isSignUp && password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            level <= passwordStrength.strength
                              ? passwordStrength.color
                              : 'bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Password strength: <span className="text-gray-300">{passwordStrength.label}</span>
                    </p>
                  </div>
                )}

                {!isSignUp && (
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>

              {/* Terms checkbox (Sign Up only) */}
              {isSignUp && (
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-700 bg-gray-800 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-400">
                    I agree to the{' '}
                    <button type="button" className="text-primary-400 hover:underline">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-primary-400 hover:underline">
                      Privacy Policy
                    </button>
                  </label>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || (isSignUp && !agreedToTerms)}
                className="w-full group flex justify-center items-center gap-2 py-4 px-6 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold rounded-xl hover:from-primary-500 hover:to-purple-500 hover:shadow-lg hover:shadow-primary-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </>
                ) : (
                  <>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Mode switch */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={handleModeSwitch}
                  disabled={isSubmitting}
                  className="font-medium text-primary-400 hover:text-primary-300 transition-colors disabled:opacity-50"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

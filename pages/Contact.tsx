import React, { useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, AlertCircle,
  ArrowRight, Clock, Globe, Users, MessageCircle, Sparkles, Star,
  ChevronDown, Zap, Shield, Heart
} from 'lucide-react';
import { submitContactForm } from '../services/contact';
import { Contact3DScene } from '../components/Contact3DScene';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage(null);

    const result = await submitContactForm({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message,
    });

    if (result.data) {
      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } else if (result.error) {
      setSubmitStatus('error');
      setErrorMessage(result.error);
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Contact methods
  const contactMethods = [
    {
      icon: <Mail size={28} />,
      title: "Email Us",
      description: "Get a response within 24 hours",
      value: "support@upskillhub.com",
      link: "mailto:support@upskillhub.com",
      gradient: "from-blue-500 to-cyan-500",
      bgGlow: "bg-blue-500/20"
    },
    {
      icon: <Phone size={28} />,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm EST",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      gradient: "from-green-500 to-emerald-500",
      bgGlow: "bg-green-500/20"
    },
    {
      icon: <MessageCircle size={28} />,
      title: "Live Chat",
      description: "Chat with our support team",
      value: "Start a conversation",
      link: "#",
      gradient: "from-purple-500 to-pink-500",
      bgGlow: "bg-purple-500/20"
    },
    {
      icon: <Globe size={28} />,
      title: "Social Media",
      description: "Follow us for updates",
      value: "@upskillhub",
      link: "#",
      gradient: "from-orange-500 to-red-500",
      bgGlow: "bg-orange-500/20"
    }
  ];

  // FAQ data
  const faqs = [
    {
      q: "Can I access the courses forever?",
      a: "Yes! Once you purchase a course, you have lifetime access to all its materials, including any future updates and additions. Your learning journey has no expiration date.",
      icon: <Clock size={20} />
    },
    {
      q: "Do you offer certificates?",
      a: "Absolutely! Every completed course comes with a verified digital certificate that you can add to your LinkedIn profile, resume, or portfolio to showcase your new skills.",
      icon: <Star size={20} />
    },
    {
      q: "What if I'm not satisfied with a course?",
      a: "We offer a 30-day money-back guarantee. If you don't feel you're learning or the course doesn't meet your expectations, we'll refund you completely, no questions asked.",
      icon: <Shield size={20} />
    },
    {
      q: "Is there a student community?",
      a: "Yes! We have an active Discord server with over 50,000 members where students help each other, share job opportunities, collaborate on projects, and network with industry professionals.",
      icon: <Users size={20} />
    },
    {
      q: "How do I get help if I'm stuck on a lesson?",
      a: "You can ask questions directly in the course Q&A section, reach out to our support team via email or live chat, or post in our Discord community for peer support.",
      icon: <HelpCircle size={20} />
    },
    {
      q: "Do you offer corporate training?",
      a: "Yes! We offer customized corporate training programs with dedicated support, progress tracking, and team management features. Contact us for a custom quote.",
      icon: <Zap size={20} />
    }
  ];

  // Stats
  const stats = [
    { value: "50K+", label: "Happy Students", icon: <Users size={20} /> },
    { value: "24/7", label: "Support Available", icon: <Clock size={20} /> },
    { value: "< 2hrs", label: "Response Time", icon: <Zap size={20} /> },
    { value: "98%", label: "Satisfaction Rate", icon: <Heart size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden">
      {/* Hero Section with 3D */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" />

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* 3D Scene */}
        <div className="absolute inset-0 opacity-60">
          <Suspense fallback={null}>
            <Contact3DScene variant="hero" />
          </Suspense>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 animate-slide-up">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="text-sm text-gray-300">We'd love to hear from you</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight animate-slide-up stagger-1">
            Let's Start a
            <span className="block bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Conversation
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 animate-slide-up stagger-2">
            Whether you have questions about courses, need career guidance, or want to share your success story — we're here to help you succeed.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-slide-up stagger-3">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="flex items-center justify-center gap-2 text-primary-400 mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gray-800/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium mb-4">
              Multiple Ways to Reach Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Choose Your Preferred Channel
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, i) => (
              <a
                key={i}
                href={method.link}
                className={`group relative p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-slide-up stagger-${i + 1}`}
              >
                {/* Background glow */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 ${method.bgGlow} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {method.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{method.description}</p>
                <span className="text-primary-400 font-medium group-hover:text-primary-300 transition-colors flex items-center gap-1">
                  {method.value}
                  <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left Side - Info */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium mb-4">
                  Get in Touch
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  We're Here to <span className="text-primary-400">Help</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Have a question or need assistance? Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              {/* Office Location Card */}
              <div className="p-6 bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Global Headquarters</h3>
                    <p className="text-gray-400 mb-4">
                      123 Tech Avenue, Innovation District,<br />
                      Silicon Valley, CA 94025, USA
                    </p>
                    <p className="text-sm text-gray-500 italic border-l-2 border-primary-500 pl-3">
                      "We love visitors! Drop by for a coffee and a chat about the future of learning."
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-6 bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-primary-400" />
                  Working Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-400">
                    <span>Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/skills"
                  className="px-4 py-2 bg-gray-800 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-colors text-sm"
                >
                  Browse Courses
                </Link>
                <Link
                  to="/resources"
                  className="px-4 py-2 bg-gray-800 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-colors text-sm"
                >
                  Resources
                </Link>
                <Link
                  to="/about"
                  className="px-4 py-2 bg-gray-800 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-colors text-sm"
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="relative">
              {/* Form background glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50" />

              <div className="relative bg-gray-800/90 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Send size={24} className="text-primary-400" />
                  Send a Message
                </h3>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3 animate-slide-up">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle size={20} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-green-400 font-medium">Message sent successfully!</p>
                      <p className="text-green-400/70 text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 animate-slide-up">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <AlertCircle size={20} className="text-red-400" />
                    </div>
                    <p className="text-red-400">{errorMessage || 'Failed to send message. Please try again.'}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      title="Select a topic for your inquiry"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="courses">Course Information</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="corporate">Corporate Training</option>
                      <option value="partnership">Partnership Opportunities</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      placeholder="How can we help you today?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group flex justify-center items-center gap-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-primary-500 hover:to-purple-500 hover:shadow-lg hover:shadow-primary-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Frequently Asked <span className="text-primary-400">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Find quick answers to common questions about our platform
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-gray-800/80 backdrop-blur-sm rounded-2xl border transition-all duration-300 overflow-hidden ${
                  expandedFAQ === i ? 'border-primary-500/50' : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      expandedFAQ === i ? 'bg-primary-500 text-white' : 'bg-gray-700 text-primary-400'
                    }`}>
                      {faq.icon}
                    </div>
                    <h3 className="font-bold text-lg text-white">{faq.q}</h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    expandedFAQ === i ? 'bg-primary-500 rotate-180' : 'bg-gray-700'
                  }`}>
                    <ChevronDown size={18} className="text-white" />
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedFAQ === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 pl-20">
                    <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <a
              href="mailto:support@upskillhub.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-500 transition-colors"
            >
              <Mail size={18} />
              Contact Support
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 via-purple-900/50 to-blue-900/50" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of students who have already transformed their careers with UpSkillHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/skills"
              className="group px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-white/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Browse Courses
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

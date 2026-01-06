import React, { useState, useEffect, Suspense } from 'react';
import { SERVICES } from '../constants';
import {
  BookOpen, Users, Award, Briefcase, CheckCircle2, Rocket, MonitorPlay,
  MessageSquare, TrendingUp, Star, Play, Building2, Bell, Zap,
  ArrowRight, Code, Target, Lightbulb, Shield, ChevronRight, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Services3DScene } from '../components/Services3DScene';
import { VideoModal } from '../components/VideoPlayer';

export const Services: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    'BookOpen': <BookOpen size={32} />,
    'Users': <Users size={32} />,
    'Award': <Award size={32} />,
    'Briefcase': <Briefcase size={32} />
  };

  const gradientMap: Record<string, string> = {
    'BookOpen': 'from-blue-500 to-cyan-500',
    'Users': 'from-purple-500 to-pink-500',
    'Award': 'from-orange-500 to-red-500',
    'Briefcase': 'from-green-500 to-emerald-500'
  };

  // Live Feed Simulation
  const [activityIndex, setActivityIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const activities = [
    { text: "Sarah J. just enrolled in React Masterclass", icon: <Zap size={16} className="text-yellow-500" /> },
    { text: "Michael Chen got hired at Google as L4 Engineer", icon: <Briefcase size={16} className="text-green-500" /> },
    { text: "Jessica T. completed the Full Stack Path", icon: <Award size={16} className="text-purple-500" /> },
    { text: "David R. posted a question in Python Community", icon: <MessageSquare size={16} className="text-blue-500" /> },
    { text: "New success story: From Cashier to Data Scientist (+140% Salary)", icon: <TrendingUp size={16} className="text-green-500" /> },
    { text: "Maria G. earned her AWS Solutions Architect Certificate", icon: <Award size={16} className="text-orange-500" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActivityIndex((prev) => (prev + 1) % activities.length);
        setFade(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Short motivational videos for testimonials
  const testimonials = [
    {
      name: "Elena Rodriguez",
      role: "Product Designer @ Spotify",
      prevRole: "Graphic Designer",
      salaryHike: "+120%",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      videoThumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoId: "Tn6-PIqc4UM",
      duration: "1:02",
      quote: "The mentorship I received was life-changing. I went from making logos to designing complex interfaces for millions of users."
    },
    {
      name: "Marcus Johnson",
      role: "Senior Dev @ Microsoft",
      prevRole: "IT Support",
      salaryHike: "+200%",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      videoThumb: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoId: "x28v7iKR8x0",
      duration: "1:28",
      quote: "UpSkillHub didn't just teach me code; they taught me how to think like an engineer. The career support was phenomenal."
    },
    {
      name: "Aisha Patel",
      role: "ML Engineer @ Tesla",
      prevRole: "Math Teacher",
      salaryHike: "+150%",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      videoThumb: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoId: "rqVLrZFgIjM",
      duration: "1:15",
      quote: "I thought AI was out of reach. The step-by-step curriculum made complex topics accessible. Now I work on self-driving cars!"
    }
  ];

  // Process steps
  const processSteps = [
    { icon: <Target size={28} />, title: "Choose Your Path", description: "Select from curated learning paths designed by industry experts" },
    { icon: <Code size={28} />, title: "Learn & Practice", description: "Master skills through interactive lessons and hands-on projects" },
    { icon: <Users size={28} />, title: "Get Mentored", description: "Receive guidance from experienced professionals in your field" },
    { icon: <Rocket size={28} />, title: "Launch Career", description: "Land your dream job with our career support and job placement" }
  ];

  // Features with icons
  const features = [
    { icon: <MonitorPlay size={32} />, title: "HD Video Content", description: "Crystal clear video lessons recorded by industry experts", gradient: "from-blue-500 to-cyan-500" },
    { icon: <Code size={32} />, title: "Interactive Coding", description: "Practice coding in real-time with instant feedback", gradient: "from-purple-500 to-pink-500" },
    { icon: <Rocket size={32} />, title: "Real Projects", description: "Build portfolio-worthy projects with real-world applications", gradient: "from-orange-500 to-red-500" },
    { icon: <Award size={32} />, title: "Certifications", description: "Earn industry-recognized certificates to boost your resume", gradient: "from-green-500 to-emerald-500" },
    { icon: <Shield size={32} />, title: "Job Guarantee", description: "Get hired or get your money back with our job guarantee", gradient: "from-indigo-500 to-purple-500" },
    { icon: <Lightbulb size={32} />, title: "24/7 Support", description: "Access help anytime with our round-the-clock support team", gradient: "from-yellow-500 to-orange-500" }
  ];

  return (
    <div className="bg-gray-900 transition-colors duration-300 overflow-hidden">

      {/* Live Activity Feed */}
      <div className="bg-black text-white py-3 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center sm:justify-between">
          <div className="hidden sm:flex items-center gap-2 text-primary-400 font-bold text-xs uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live Community Activity
          </div>
          <div className={`flex items-center gap-3 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            {activities[activityIndex].icon}
            <span className="text-sm font-medium">{activities[activityIndex].text}</span>
          </div>
        </div>
      </div>

      {/* Hero Section with 3D */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <Suspense fallback={<div className="absolute inset-0 bg-gray-900" />}>
          <Services3DScene variant="hero" className="opacity-60" />
        </Suspense>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-transparent to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 via-transparent to-purple-900/30" />

        {/* Animated Background Blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-6 border border-white/10">
              <Sparkles size={16} className="animate-pulse" />
              Holistic Learning Ecosystem
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 animate-slide-up stagger-1">
            Transform Your
            <span className="block bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              Career Journey
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 animate-slide-up stagger-2">
            We provide more than just video lectures. Experience a complete ecosystem designed to accelerate your growth through mentorship, hands-on practice, and industry validation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-3">
            <Link
              to="/skills"
              className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Start Learning
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setActiveVideoId('5MgBikgcWnY')}
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Play size={20} className="group-hover:scale-110 transition-transform" />
              Watch Overview
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-slide-up stagger-4">
            {[
              { value: "50K+", label: "Students" },
              { value: "200+", label: "Courses" },
              { value: "95%", label: "Job Placement" },
              { value: "4.9", label: "Rating" }
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-900/50 rounded-full text-primary-400 text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Your Path to Success
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Follow our proven 4-step process to transform your career
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="relative group">
                {/* Connector Line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 opacity-30" />
                )}

                <div className="relative bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-primary-500/50 transition-all group-hover:-translate-y-2 duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {i + 1}
                  </div>

                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-primary-400 mb-6 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-900/50 rounded-full text-primary-400 text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive services designed to support your learning journey from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((service, idx) => (
              <div
                key={idx}
                className="group relative bg-gray-800 rounded-3xl p-8 border border-gray-700 hover:border-primary-500/50 transition-all duration-500 overflow-hidden"
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientMap[service.icon]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="relative z-10 flex gap-6">
                  <div className="flex-shrink-0">
                    <div className={`flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br ${gradientMap[service.icon]} text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {iconMap[service.icon]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Animated Border */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-purple-500 w-0 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-900/50 rounded-full text-primary-400 text-sm font-medium mb-4">
              Platform Features
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`group p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 animate-slide-up stagger-${i + 1}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-gradient-to-br from-primary-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-200 text-sm font-medium mb-4">
              Real Results
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Career Transformations
            </h2>
            <p className="text-xl text-primary-200 max-w-2xl mx-auto">
              Watch how our students transformed their careers and landed jobs at top tech companies
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((story, i) => (
              <div
                key={i}
                className={`bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:-translate-y-2 transition-all duration-300 group animate-slide-up stagger-${i + 1}`}
              >
                {/* Video Thumbnail */}
                <div
                  onClick={() => setActiveVideoId(story.videoId)}
                  className="relative h-48 bg-gray-900 cursor-pointer overflow-hidden"
                >
                  <img
                    src={story.videoThumb}
                    alt={`${story.name}'s success story`}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play size={28} className="text-primary-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                    {story.duration}
                  </div>
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <TrendingUp size={12} /> {story.salaryHike}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 -mt-10 relative z-10">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-14 h-14 rounded-full border-4 border-gray-900 shadow-lg object-cover"
                    />
                    <div className="mt-4">
                      <h3 className="font-bold text-white">{story.name}</h3>
                      <div className="flex text-yellow-400 gap-0.5">
                        {[1,2,3,4,5].map(star => <Star key={star} size={12} fill="currentColor" />)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-primary-200">Before</span>
                      <span className="text-white/80">{story.prevRole}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-200">After</span>
                      <span className="text-primary-400 font-bold">{story.role}</span>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm italic">"{story.quote}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* Companies Strip */}
          <div className="mt-16 pt-10 border-t border-white/10">
            <p className="text-center text-sm font-semibold text-white/50 uppercase tracking-widest mb-8">Our Alumni Work At</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {["Google", "Microsoft", "Amazon", "Netflix", "Spotify", "Tesla", "Meta"].map((company) => (
                <span key={company} className="text-xl md:text-2xl font-black text-white/30 hover:text-white/80 transition-colors cursor-default">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community & Forum Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-900/50 rounded-full text-primary-400 text-sm font-medium mb-6">
                <Users size={16} /> Vibrant Community
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Never Learn Alone
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Join a thriving ecosystem of learners and experts. Stuck on a bug? Need career advice? Our community is active 24/7.
              </p>

              <ul className="space-y-6">
                {[
                  { icon: <MessageSquare size={24} />, title: "Course Discussion Boards", desc: "Dedicated Q&A sections for every single lecture", color: "bg-blue-500/20 text-blue-400" },
                  { icon: <Users size={24} />, title: "Peer-to-Peer Learning", desc: "Collaborate on projects and build your network", color: "bg-purple-500/20 text-purple-400" },
                  { icon: <Bell size={24} />, title: "Instructor Feedback", desc: "Direct access to experts during live office hours", color: "bg-pink-500/20 text-pink-400" }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 group">
                    <div className={`${item.color} p-3 rounded-xl h-fit group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              {/* Mock Forum UI */}
              <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-4">
                  <span className="font-bold text-white">Recent Discussions</span>
                  <span className="text-xs text-primary-400 font-bold cursor-pointer hover:underline">View All</span>
                </div>
                {[
                  { user: "Alex M.", title: "Help with React useEffect hook dependency", tags: ["React", "Bug"], replies: 12 },
                  { user: "Sarah K.", title: "Best resources for System Design interview?", tags: ["Career", "Interview"], replies: 24 },
                  { user: "DevBot", title: "Weekly Coding Challenge #45 is live!", tags: ["Announcement"], replies: 56 }
                ].map((post, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors cursor-pointer mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {post.user.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{post.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-gray-600 text-gray-300 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MessageSquare size={12} /> {post.replies}
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-500/30 to-purple-500/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Training Section */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 md:p-16 border border-gray-700 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />

            <div className="flex-1 relative z-10">
              <span className="inline-block px-4 py-2 bg-blue-900/50 text-blue-400 rounded-full font-bold text-xs uppercase tracking-wider mb-6">
                For Business
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Upskill Your Workforce</h2>
              <p className="text-xl text-gray-400 mb-8">
                Stay competitive in the digital age. We provide tailored training programs for teams of all sizes.
              </p>
              <ul className="space-y-4 mb-8">
                {['Custom Learning Paths', 'Progress Tracking Dashboards', 'Hands-on Workshops', 'Dedicated Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={20} className="text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact?subject=corporate-training"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-primary-500/30 transition-all transform hover:-translate-y-1"
              >
                Request a Demo
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="flex-1 relative z-10">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Corporate training"
                className="rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-gray-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 via-purple-900/50 to-pink-900/50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of learners who have successfully transitioned into high-paying tech roles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/skills"
              className="group px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-white/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Explore All Courses
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideoId && (
        <VideoModal
          videoId={activeVideoId}
          isOpen={!!activeVideoId}
          onClose={() => setActiveVideoId(null)}
          title="Watch Video"
        />
      )}
    </div>
  );
};

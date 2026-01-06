import React, { useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, PlayCircle, Star, TrendingUp, Shield, Zap, Award, Briefcase, Play, Code, Database, Palette, Cloud } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { Course } from '../types';
import { getCourses } from '../services/courses';
import { FloatingShapes3D } from '../components/FloatingShapes3D';
import { VideoModal } from '../components/VideoPlayer';
import { VideoTestimonials } from '../components/VideoTestimonials';
import { InspirationVideos } from '../components/InspirationVideos';

interface HomeProps {
  onEnroll: (course: Course) => void;
}

export const Home: React.FC<HomeProps> = ({ onEnroll }) => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isIntroVideoOpen, setIsIntroVideoOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      const result = await getCourses({ limit: 3 });
      if (result.data) {
        setFeaturedCourses(result.data);
      }
      setIsLoading(false);
    };
    fetchCourses();
  }, []);

  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64",
    "https://images.unsplash.com/photo-1521119989659-a83eee488058?auto=format&fit=crop&w=64&h=64"
  ];

  const stats = [
    { value: '50K+', label: 'Active Learners' },
    { value: '500+', label: 'Expert Courses' },
    { value: '95%', label: 'Success Rate' },
    { value: '4.9', label: 'Average Rating' },
  ];

  const techCategories = [
    { name: 'Web Development', icon: <Code size={24} />, color: 'from-blue-500 to-cyan-500' },
    { name: 'Data Science', icon: <Database size={24} />, color: 'from-green-500 to-emerald-500' },
    { name: 'UI/UX Design', icon: <Palette size={24} />, color: 'from-pink-500 to-rose-500' },
    { name: 'Cloud Computing', icon: <Cloud size={24} />, color: 'from-purple-500 to-violet-500' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with 3D Background */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden flex items-center">
        {/* 3D Floating Shapes Background */}
        <Suspense fallback={null}>
          <FloatingShapes3D className="opacity-60" />
        </Suspense>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900 z-[1]" />

        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Over 500+ New Courses Added
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                Master the
                <span className="block bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                  Future of Tech
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                Build career-ready skills in coding, data science, AI, and design.
                Join 50,000+ learners transforming their careers with industry-leading courses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/skills"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 transition-all shadow-lg shadow-primary-500/30 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/40"
                >
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() => setIsIntroVideoOpen(true)}
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all transform hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 group-hover:bg-white/30 transition-colors">
                    <Play size={18} fill="currentColor" className="ml-0.5" />
                  </div>
                  Watch Demo
                </button>
              </div>

              {/* Social Proof */}
              <div className="pt-6 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {avatars.map((src, i) => (
                    <img key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-gray-900 object-cover" src={src} alt="User avatar"/>
                  ))}
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-gray-900 bg-primary-600 text-white text-xs font-bold">
                    +50K
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <span className="text-sm text-gray-400">Trusted by 50k+ learners worldwide</span>
                </div>
              </div>
            </div>

            {/* Right Content - Video Preview Card */}
            <div className="relative animate-fade-in-left hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-3xl blur-2xl opacity-30 animate-pulse" />
              <div className="relative">
                {/* Main Video Card */}
                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group animate-float-3d"
                  onClick={() => setIsIntroVideoOpen(true)}
                >
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Students learning"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform animate-glow-pulse">
                      <Play size={32} className="text-primary-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-semibold text-lg">Why Start Learning Today?</p>
                    <p className="text-gray-300 text-sm">1 min motivation</p>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Course Completed</p>
                      <p className="font-bold text-gray-900 dark:text-white">Web Development</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Hired As</p>
                      <p className="font-bold text-gray-900 dark:text-white">Full Stack Developer</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 -right-12 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Certified</p>
                      <p className="font-bold text-sm text-gray-900 dark:text-white">Data Scientist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 animate-slide-up stagger-${i + 1}`}
              >
                <div className="text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Categories Showcase */}
      <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              Learning Paths
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Tech Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Structured learning paths designed by industry experts to take you from beginner to job-ready
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategories.map((category, i) => (
              <Link
                key={i}
                to="/skills"
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${category.color} overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <div className="flex items-center text-white/80 text-sm">
                    <span>Explore courses</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration Videos Section */}
      <InspirationVideos />

      {/* Investment Value Section */}
      <section className="py-20 bg-primary-50 dark:bg-gray-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              An Investment in Knowledge Pays the Best Interest
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              When you invest in learning on UpSkillHub, you're investing in your future earning potential.
              A small investment today can lead to a 10x salary increase tomorrow.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Career Growth", icon: <TrendingUp size={32} />, desc: "Unlock new job roles and promotions with in-demand skills that employers are actively seeking." },
              { title: "Secure Future", icon: <Shield size={32} />, desc: "Tech skills are recession-proof. Build a safety net for your career in any economic climate." },
              { title: "Fast Learning", icon: <Zap size={32} />, desc: "Structured learning paths save you hundreds of hours compared to self-guided learning." }
            ].map((item, i) => (
              <div key={i} className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 text-center group animate-slide-up stagger-${i + 1}`}>
                <div className="bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 w-20 h-20 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
                Top Rated
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Popular Courses</h2>
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
                Start with our most enrolled courses designed for beginners and professionals alike.
              </p>
            </div>
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 group"
            >
              View all courses
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course, i) => (
                <div key={course.id} className={`animate-slide-up stagger-${i + 1}`}>
                  <CourseCard course={course} onEnroll={onEnroll} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Testimonials Section */}
      <VideoTestimonials />

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Path to Mastery</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">We make learning simple, structured, and effective with a proven 4-step process.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discover", desc: "Browse our curated catalog to find the perfect skill for your goals.", color: "from-blue-500 to-cyan-500" },
              { step: "02", title: "Enroll", desc: "Make a commitment to yourself. Choose a course and start instantly.", color: "from-purple-500 to-pink-500" },
              { step: "03", title: "Learn", desc: "Watch high-quality videos, complete assignments, and build projects.", color: "from-orange-500 to-red-500" },
              { step: "04", title: "Succeed", desc: "Earn your certificate, update your resume, and land your dream job.", color: "from-green-500 to-emerald-500" }
            ].map((item, i) => (
              <div key={i} className={`relative group animate-slide-up stagger-${i + 1}`}>
                {/* Connector Line */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-200 dark:from-gray-700 dark:to-gray-700 z-0" />
                )}
                <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <Award size={40} className="text-yellow-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-primary-200 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join 50,000+ learners who have already started their journey to mastering the skills of tomorrow.
            Your future self will thank you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/skills"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-primary-900 font-bold rounded-xl shadow-lg hover:bg-gray-100 hover:scale-105 transition-all"
            >
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Video Modal - Short motivational video about learning */}
      <VideoModal
        videoId="Dv7gLpW91DM"
        isOpen={isIntroVideoOpen}
        onClose={() => setIsIntroVideoOpen(false)}
        title="Why Start Learning Today?"
      />
    </div>
  );
};

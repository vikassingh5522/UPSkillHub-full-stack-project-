import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, PlayCircle, Star, TrendingUp, Shield, Zap, Award, Briefcase } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { Course } from '../types';
import { getCourses } from '../services/courses';

interface HomeProps {
  onEnroll: (course: Course) => void;
}

export const Home: React.FC<HomeProps> = ({ onEnroll }) => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
  
  // Reliable avatar images
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64",
    "https://images.unsplash.com/photo-1521119989659-a83eee488058?auto=format&fit=crop&w=64&h=64"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                Over 500+ New Courses Added
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                 UpSkillHub the <span className="text-primary-600 dark:text-primary-400">Future</span> of Tech
              </h1>
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
                Build career-ready skills in coding, data, AI, and design. 
                Invest in yourself today to reap exponential rewards tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/skills"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-1"
                >
                  Explore Courses
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-200 dark:border-gray-700 text-base font-bold rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:-translate-y-1"
                >
                  <PlayCircle className="mr-2 -ml-1 h-5 w-5 text-gray-400" />
                  How it Works
                </Link>
              </div>
              
              <div className="pt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex -space-x-2">
                   {avatars.map((src, i) => (
                       <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900 object-cover" src={src} alt="User avatar"/>
                   ))}
                </div>
                <div className="flex flex-col">
                    <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <span>Trusted by 50k+ ambitious learners</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in-left">
              <div className="absolute inset-0 bg-primary-200 dark:bg-primary-900/40 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Students learning" 
                className="relative rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
              
              {/* Floating Badge 1: Web Development (Bottom Left) */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 hidden md:block animate-bounce" style={{ animationDuration: '3s' }}>
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

              {/* Floating Badge 2: Full Stack Developer (Top Right) */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 hidden md:block animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
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

               {/* Floating Badge 3: Data Scientist (Middle Right) */}
               <div className="absolute top-1/2 -right-12 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 hidden lg:block animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>
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
      </section>

      {/* Investment Value Section */}
      <section className="py-16 bg-primary-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">An Investment in Knowledge Pays the Best Interest</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    When you buy a course on UpSkillHub, you aren't just spending money; you are investing in your future earning potential. 
                    A small investment today can lead to a 10x salary hike tomorrow.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "Career Growth", icon: <TrendingUp size={32} />, desc: "Unlock new job roles and promotions with in-demand skills." },
                    { title: "Secure Future", icon: <Shield size={32} />, desc: "Tech skills are recession-proof. Build a safety net for your career." },
                    { title: "Fast Learning", icon: <Zap size={32} />, desc: "Structured learning paths save you hundreds of hours of trial and error." }
                ].map((item, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 text-center group">
                        <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Popular Courses</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Start with our most enrolled courses designed for beginners and professionals alike.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map(course => (
                <CourseCard key={course.id} course={course} onEnroll={onEnroll} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/skills" className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center justify-center gap-1 group">
                View all courses <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Path to Mastery</h2>
                <p className="text-gray-600 dark:text-gray-400">We make learning simple, structured, and effective.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
                {[
                    { step: "01", title: "Discover", desc: "Browse our curated catalog to find the perfect skill for your goals." },
                    { step: "02", title: "Enroll", desc: "Make a commitment to yourself. Choose a course and start instantly." },
                    { step: "03", title: "Learn", desc: "Watch high-quality videos, complete assignments, and build projects." },
                    { step: "04", title: "Succeed", desc: "Earn your certificate, update your resume, and land your dream job." }
                ].map((item, i) => (
                    <div key={i} className="relative p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                        <span className="text-6xl font-black text-gray-100 dark:text-gray-700 absolute -top-4 -right-4 z-0 opacity-50">{item.step}</span>
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </section>
      
      {/* Motivation Section */}
      <section className="py-24 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-block p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <Award size={32} className="text-yellow-400" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight">
                "The only way to do great work is to love what you do."
            </h2>
            <p className="text-xl text-primary-200 mb-8 italic">- Steve Jobs</p>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                Technology is the pen we use to write the future. Don't just watch the revolution happen—be a part of it. 
                Your journey to mastering the skills of tomorrow starts with a single click today.
            </p>
            <Link 
                to="/skills" 
                className="inline-block px-10 py-4 bg-white text-primary-900 font-bold rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all"
            >
                Start Learning Now
            </Link>
        </div>
      </section>
    </div>
  );
};
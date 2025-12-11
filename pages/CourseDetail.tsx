import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Course } from '../types';
import { Star, User, Clock, CheckCircle, Globe, PlayCircle, ShieldCheck, ArrowLeft, ChevronDown, ChevronUp, Zap, CreditCard, Layout, ArrowRight, BookOpen, X, Loader2 } from 'lucide-react';
import { getCourseById } from '../services/courses';
import { getEnrollmentByCourseId } from '../services/enrollments';
import { useAuth } from '../contexts/AuthContext';

interface CourseDetailProps {
  onEnroll: (course: Course) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ onEnroll }) => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [pricingPlan, setPricingPlan] = useState<'one-time' | 'subscription'>('one-time');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      setIsLoading(true);
      const result = await getCourseById(id);
      if (result.data) {
        setCourse(result.data);
      }
      setIsLoading(false);
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!id || !isAuthenticated || !course) return;
      const result = await getEnrollmentByCourseId(parseInt(id));
      if (result.data) {
        setIsEnrolled(true);
      }
    };

    checkEnrollment();
  }, [id, isAuthenticated, course]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 size={48} className="text-primary-600 dark:text-primary-400 animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Course not found</h1>
        <Link to="/skills" className="text-primary-600 hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Courses
        </Link>
      </div>
    );
  }

  const toggleModule = (index: number) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  const currentPrice = pricingPlan === 'one-time' ? course.price : 29.99;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16 transition-colors duration-300">
      
      {/* Hero Header */}
      <div className="bg-gray-900 text-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <Link to="/skills" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Courses
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-4 flex-wrap">
                 <span className="bg-primary-500/20 text-primary-200 border border-primary-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {course.category}
                 </span>
                 <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                    <Clock size={14} /> Last updated {course.lastUpdated || 'Recently'}
                 </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
                {course.title}
              </h1>
              
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                {course.description ? course.description.substring(0, 150) + "..." : "Master this skill with our comprehensive course."}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm pt-4">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">
                  <span className="font-bold text-yellow-400">{course.rating}</span>
                  <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < Math.floor(course.rating) ? "currentColor" : "none"} className={i >= Math.floor(course.rating) ? "text-gray-500" : ""} />
                      ))}
                  </div>
                  <span className="text-gray-400 border-l border-gray-600 pl-2 ml-1">{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-xs font-bold">
                    {course.instructor.charAt(0)}
                  </div>
                  <span className="font-medium">Created by <span className="text-white">{course.instructor}</span></span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Globe size={16} />
                  <span>{course.language || 'English'}</span>
                </div>
              </div>
            </div>
            
            {/* Video Placeholder (Desktop) */}
            <div className="hidden lg:block relative group cursor-pointer" onClick={() => setIsPreviewOpen(true)}>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 relative">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white pl-1 border-2 border-white/50 group-hover:scale-110 transition-transform">
                            <PlayCircle size={32} fill="currentColor" />
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                        <span className="text-sm font-bold text-white shadow-black drop-shadow-md">Preview Course</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* What you'll learn */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <CheckCircle className="text-primary-600 dark:text-primary-400" /> What you'll learn
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {course.whatYouWillLearn?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="min-w-[5px] h-[5px] rounded-full bg-gray-300 dark:bg-gray-600 mt-2"></div>
                    <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item}</span>
                  </div>
                )) || <p className="text-gray-500">Content details coming soon.</p>}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <BookOpen className="text-primary-600 dark:text-primary-400" /> Prerequisites
               </h2>
               <div className="space-y-3">
                  {course.prerequisites && course.prerequisites.length > 0 ? (
                      course.prerequisites.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="min-w-[6px] h-[6px] rounded-full bg-primary-500 mt-2"></div>
                            <span className="text-gray-600 dark:text-gray-300 text-sm">{req}</span>
                        </div>
                      ))
                  ) : (
                      <p className="text-gray-500 text-sm">No specific prerequisites. Just bring your passion to learn!</p>
                  )}
               </div>
            </div>

            {/* Course Content / Syllabus Accordion */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Layout className="text-primary-600 dark:text-primary-400" /> Course Content
                 </h2>
                 <span className="text-sm text-gray-500 dark:text-gray-400">
                    {course.syllabus?.length || 0} Modules • {course.duration} Total
                 </span>
              </div>
              
              <div className="space-y-3">
                {course.syllabus?.map((module, idx) => {
                    const isOpen = openModuleIndex === idx;
                    return (
                        <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300">
                            <button 
                                onClick={() => toggleModule(idx)}
                                className={`w-full px-6 py-4 flex justify-between items-center text-left transition-colors ${isOpen ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-1 rounded transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                        <ChevronDown size={18} className="text-gray-400" />
                                    </div>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{module.title}</span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{module.items.length} lectures</span>
                            </button>
                            
                            <div className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                                    <ul className="space-y-3">
                                        {module.items.map((lecture, lIdx) => (
                                        <li key={lIdx} className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 group cursor-pointer hover:text-primary-600 dark:hover:text-primary-400">
                                            <div className="flex items-center gap-3">
                                                <PlayCircle size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                                                <span>{lecture}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">10:00</span>
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                }) || <p className="text-gray-500">Syllabus details coming soon.</p>}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
              <div className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                <p>{course.description}</p>
                <p>Join thousands of students learning {course.title} today and start your journey towards a new career.</p>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
                
                {/* Mobile/Tablet Video Placeholder */}
                <div 
                    className="lg:hidden aspect-video rounded-xl overflow-hidden shadow-lg relative mb-4 cursor-pointer" 
                    onClick={() => setIsPreviewOpen(true)}
                >
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <PlayCircle size={48} className="text-white opacity-90" />
                    </div>
                </div>

                {/* Enrollment Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-6">
                        {/* Pricing Toggle */}
                        {course.price > 0 && (
                            <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-6">
                                <button 
                                    onClick={() => setPricingPlan('one-time')}
                                    className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${pricingPlan === 'one-time' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                                >
                                    One-Time
                                </button>
                                <button 
                                    onClick={() => setPricingPlan('subscription')}
                                    className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${pricingPlan === 'subscription' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                                >
                                    Subscription
                                </button>
                            </div>
                        )}

                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                                {currentPrice === 0 ? 'Free' : `$${currentPrice}`}
                            </span>
                            {currentPrice > 0 && <span className="text-gray-400 line-through mb-1.5 text-sm">${(currentPrice * 1.5).toFixed(2)}</span>}
                        </div>
                        
                        {pricingPlan === 'subscription' && (
                            <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mb-6">
                                Includes access to all courses *
                            </p>
                        )}
                        {pricingPlan === 'one-time' && course.price > 0 && (
                            <p className="text-xs text-gray-500 mb-6">One-time payment. Lifetime access.</p>
                        )}

                        <button
                            onClick={() => onEnroll(course)}
                            disabled={isEnrolled}
                            className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all mb-4 flex items-center justify-center gap-2 group ${
                              isEnrolled 
                                ? 'bg-green-600 cursor-not-allowed' 
                                : 'bg-primary-600 hover:bg-primary-700 hover:shadow-primary-500/30'
                            }`}
                        >
                            {isEnrolled ? (
                              <>
                                <CheckCircle size={18} />
                                Enrolled
                              </>
                            ) : (
                              <>
                                {pricingPlan === 'subscription' ? 'Start Free Trial' : (course.price === 0 ? 'Enroll Now' : 'Buy Now')}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                        </button>
                        
                        <p className="text-center text-[10px] text-gray-400 mb-6">30-Day Money-Back Guarantee</p>
                        
                        <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">This course includes:</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <Clock size={16} className="text-primary-500" />
                                    <span>{course.duration} on-demand video</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <Globe size={16} className="text-primary-500" />
                                    <span>Full lifetime access</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <ShieldCheck size={16} className="text-primary-500" />
                                    <span>Certificate of completion</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <Zap size={16} className="text-primary-500" />
                                    <span>Access on mobile and TV</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Training for Team (Ad) */}
                <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Training 5 or more people?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Get your team access to 5,000+ top courses anytime, anywhere.</p>
                    <button 
                        onClick={() => {
                            window.location.href = '/services#corporate-training';
                        }}
                        aria-label="Learn about UpSkillHub Business"
                        className="text-sm font-bold text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg w-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    >
                        Get UpSkillHub Business
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <button 
                    onClick={() => setIsPreviewOpen(false)}
                    aria-label="Close video preview"
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                >
                    <X size={24} />
                </button>
                <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${course.previewVideoId || 'LXb3EKWsInQ'}?autoplay=1`}
                    title="Course Preview" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
        </div>
      )}
    </div>
  );
};
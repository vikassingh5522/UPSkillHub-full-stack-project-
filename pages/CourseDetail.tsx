import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Course } from '../types';
import { Star, User, Clock, CheckCircle, Globe, PlayCircle, ShieldCheck, ArrowLeft, ChevronDown, ChevronUp, Zap, CreditCard, Layout, ArrowRight, BookOpen, X, Loader2, Lock } from 'lucide-react';
import { getCourseById } from '../services/courses';
import { getEnrollmentByCourseId } from '../services/enrollments';
import { useAuth } from '../contexts/AuthContext';

type EnrollResult =
  | { success?: boolean }
  | boolean
  | void
  | Promise<{ success?: boolean } | boolean | void>;

interface CourseDetailProps {
  onEnroll: (course: Course) => EnrollResult;
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
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    module?: string;
    videoId?: string;
    videoUrl?: string;
  } | null>(null);

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
    const canInitVideo = course && isAuthenticated && isEnrolled;
    if (!canInitVideo) {
      setActiveVideo(null);
      return;
    }

    const findFirstLecture = () => {
      if (!Array.isArray(course?.syllabus)) return null;
      for (const module of course!.syllabus) {
        const lectures =
          (module?.lectures ?? []) ||
          (module?.items?.map(title => ({ title, duration: '10:00' })) ?? []);
        if (lectures.length > 0) {
          return { ...lectures[0], module: module.title };
        }
      }
      return null;
    };

    const initialLecture = findFirstLecture();
    setActiveVideo(
      initialLecture || {
        title: 'Course Preview',
        videoId: course?.previewVideoId || 'LXb3EKWsInQ',
      },
    );
  }, [course, isAuthenticated, isEnrolled]);

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

  const toggleModule = (index: number) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  const getLecturesForModule = (module: any) => {
    if (module && Array.isArray(module.lectures) && module.lectures.length > 0) {
      return module.lectures as Array<{
        title: string;
        duration?: string;
        videoId?: string;
        videoUrl?: string;
      }>;
    }
    if (module && Array.isArray(module.items)) {
      return (module.items as string[]).map(title => ({
        title,
        duration: '10:00',
      }));
    }
    return [];
  };

  const normalizeYoutubeUrl = (url: string) => {
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    return url;
  };

  const getVideoSrc = (video = activeVideo) => {
    if (video?.videoUrl) {
      return normalizeYoutubeUrl(video.videoUrl);
    }
    if (video?.videoId) {
      return `https://www.youtube.com/embed/${video.videoId}`;
    }
    if (course?.previewVideoId) {
      return `https://www.youtube.com/embed/${course.previewVideoId}`;
    }
    return 'https://www.youtube.com/embed/LXb3EKWsInQ';
  };

  const handleLectureSelect = (
    moduleTitle: string,
    lecture: { title: string; duration?: string; videoId?: string; videoUrl?: string },
  ) => {
    setActiveVideo({ ...lecture, module: moduleTitle });
    const videoContainer = document.getElementById('course-video-player');
    if (videoContainer) {
      videoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentPrice = pricingPlan === 'one-time' ? course.price : 29.99;
  const canAccessContent = isAuthenticated && isEnrolled;
  const isPaidCourse = course.price > 0;

  const handleAccessClick = async () => {
    try {
      const result = onEnroll(course);
      const awaited = result instanceof Promise ? await result : result;
      const success =
        awaited === true ||
        (typeof awaited === 'object' && awaited !== null && awaited.success !== false && awaited.success !== undefined)
        ? Boolean((awaited as any).success ?? true)
        : false;
      if (success) {
        setIsEnrolled(true);
      }
    } catch (err) {
      console.error('Enroll/Buy failed', err);
    }
  };

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

  if (!canAccessContent) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-300 flex items-center justify-center mx-auto">
            <Lock size={26} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isAuthenticated
              ? 'Enroll to unlock all course content and videos.'
              : 'Please sign in and enroll to view this course.'}
          </p>
          <button
            onClick={handleAccessClick}
            className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
          >
            {course.price === 0 ? 'Enroll Now' : 'Buy Now'}
            <ArrowRight size={18} />
          </button>
          <p className="text-xs text-gray-400">Access granted after successful enrollment.</p>
        </div>
      </div>
    );
  }

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
            <div
              className={`hidden lg:block relative group ${canAccessContent ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'}`}
              onClick={() => {
                if (!canAccessContent) return;
                setIsPreviewOpen(true);
              }}
            >
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 relative">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white pl-1 border-2 border-white/50 group-hover:scale-110 transition-transform">
                            <PlayCircle size={32} fill="currentColor" />
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                        <span className="text-sm font-bold text-white shadow-black drop-shadow-md">
                          {canAccessContent ? 'Preview Course' : 'Locked - Enroll to unlock'}
                        </span>
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
            {/* Active Video Player */}
            {canAccessContent ? (
              <div id="course-video-player" className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-primary-600 dark:text-primary-400 font-semibold">Now playing</p>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                      {activeVideo?.title || 'Course Preview'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activeVideo?.module ? `Module: ${activeVideo.module}` : 'Course preview lesson'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/40 transition-colors"
                  >
                    <PlayCircle size={16} />
                    Open full screen
                  </button>
                </div>
                <div className="aspect-video bg-black rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg">
                  <iframe
                    key={getVideoSrc(activeVideo)}
                    width="100%"
                    height="100%"
                    src={`${getVideoSrc(activeVideo)}?autoplay=1&rel=0`}
                    title={activeVideo?.title || 'Course Video'}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-200">
                  <ShieldCheck size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Unlock course videos</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isPaidCourse ? 'Buy the course to watch all lectures.' : 'Enroll to access all lectures.'}
                  </p>
                </div>
                <button
                  onClick={handleAccessClick}
                  className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {isPaidCourse ? 'Buy Now' : 'Enroll Now'}
                </button>
              </div>
            )}
            
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
              {!canAccessContent && (
                <div className="mt-4 text-sm text-primary-700 dark:text-primary-300 font-semibold">
                  Enroll to unlock the detailed modules and videos.
                </div>
              )}
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
              
              {canAccessContent ? (
                <div className="space-y-3">
                  {course.syllabus?.map((module, idx) => {
                      const isOpen = openModuleIndex === idx;
                      const lectures = getLecturesForModule(module);
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
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {(module.items?.length || module.lectures?.length || 0)} lectures
                                  </span>
                              </button>
                              
                              <div className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                                      <ul className="space-y-3">
                                          {lectures.map((lecture, lIdx) => {
                                            const isActive = activeVideo?.title === lecture.title && activeVideo?.module === module.title;
                                            return (
                                              <li
                                                key={lIdx}
                                                onClick={() => handleLectureSelect(module.title, lecture)}
                                                className={`flex items-center justify-between text-sm group cursor-pointer px-2 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-200' : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300 hover:bg-gray-50 dark:hover:bg-gray-700/40'}`}
                                              >
                                                <div className="flex items-center gap-3">
                                                  <div className={`p-2 rounded-full ${isActive ? 'bg-primary-100 dark:bg-primary-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                                    <PlayCircle
                                                      size={16}
                                                      className={isActive ? 'text-primary-600 dark:text-primary-200' : 'text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-300'}
                                                    />
                                                  </div>
                                                  <div className="flex flex-col">
                                                    <span className={`font-medium ${isActive ? 'text-primary-700 dark:text-primary-100' : ''}`}>{lecture.title}</span>
                                                    {lecture.duration && (
                                                      <span className="text-[11px] text-gray-400 dark:text-gray-500">
                                                        {lecture.duration}
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                                <span className={`text-xs ${isActive ? 'text-primary-600 dark:text-primary-200 font-semibold' : 'text-gray-400'}`}>
                                                  {lecture.duration || '10:00'}
                                                </span>
                                              </li>
                                            );
                                          })}
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      );
                  }) || <p className="text-gray-500">Syllabus details coming soon.</p>}
                </div>
              ) : (
                <div className="flex flex-col items-start gap-3 p-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/60">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-primary-600" size={20} />
                    <span className="font-semibold text-gray-900 dark:text-white">Course content locked</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isPaidCourse
                      ? 'Purchase this course to view all modules and lecture videos.'
                      : 'Enroll for free to unlock the full syllabus and videos.'}
                  </p>
                  <button
                    onClick={handleAccessClick}
                    className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {isPaidCourse ? 'Buy Now' : 'Enroll Now'}
                  </button>
                </div>
              )}
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
                    onClick={() => {
                      if (!canAccessContent) return;
                      setIsPreviewOpen(true);
                    }}
                >
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <PlayCircle size={48} className={`text-white opacity-90 ${canAccessContent ? '' : 'opacity-40'}`} />
                    </div>
                    {!canAccessContent && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold bg-black/60 px-3 py-1 rounded-lg">Enroll to unlock</span>
                      </div>
                    )}
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
                            onClick={handleAccessClick}
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
                                {pricingPlan === 'subscription'
                                  ? 'Start Free Trial'
                                  : course.price === 0
                                  ? 'Enroll Now'
                                  : 'Buy Now'}
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
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
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
                    src={`${getVideoSrc(activeVideo)}?autoplay=1&rel=0`}
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
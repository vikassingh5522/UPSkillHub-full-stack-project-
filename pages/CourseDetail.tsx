import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSES } from '../constants';
import { Course } from '../types';
import { Star, User, Clock, CheckCircle, Globe, Calendar, PlayCircle, ShieldCheck, ArrowLeft } from 'lucide-react';

interface CourseDetailProps {
  onEnroll: (course: Course) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ onEnroll }) => {
  const { id } = useParams<{ id: string }>();
  const course = COURSES.find(c => c.id === id);

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

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16 transition-colors duration-300">
      {/* Hero Header */}
      <div className="bg-gray-900 dark:bg-black text-white pt-10 pb-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/skills" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Courses
          </Link>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                 <span className="bg-primary-600/20 text-primary-300 border border-primary-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {course.category}
                 </span>
                 <span className="text-xs font-medium text-gray-400">Last updated {course.lastUpdated || 'Recently'}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
                {course.title}
              </h1>
              
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                {course.description ? course.description.substring(0, 150) + "..." : "Master this skill with our comprehensive course."}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1.5 text-yellow-400">
                  <Star fill="currentColor" size={16} />
                  <span className="font-bold text-white">{course.rating}</span>
                  <span className="text-gray-400">({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <User size={16} />
                  <span>Created by <span className="text-white underline decoration-gray-600 underline-offset-4">{course.instructor}</span></span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Globe size={16} />
                  <span>{course.language || 'English'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* What you'll learn */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What you'll learn</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {course.whatYouWillLearn?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item}</span>
                  </div>
                )) || <p className="text-gray-500">Content details coming soon.</p>}
              </div>
            </div>

            {/* Course Content / Syllabus */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Course Content</h2>
              <div className="space-y-4">
                {course.syllabus?.map((module, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{module.title}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{module.items.length} lectures</span>
                    </div>
                    <div className="p-6 bg-white dark:bg-gray-800">
                      <ul className="space-y-3">
                        {module.items.map((lecture, lIdx) => (
                          <li key={lIdx} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <PlayCircle size={16} className="text-gray-400 dark:text-gray-500" />
                            {lecture}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )) || <p className="text-gray-500">Syllabus details coming soon.</p>}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
              <div className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>{course.description}</p>
                <p>Join thousands of students learning {course.title} today and start your journey towards a new career.</p>
              </div>
            </div>
            
            {/* Instructor Bio Mock */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Instructor</h2>
                <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
                         {/* Placeholder for instructor image if not available in course object */}
                         <div className="w-full h-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-3xl font-bold">
                             {course.instructor.charAt(0)}
                         </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">{course.instructor}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Senior Developer & Instructor</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {course.instructor} is a top-rated instructor with over 10 years of experience in the industry. 
                            Passionate about teaching and helping students achieve their potential.
                        </p>
                    </div>
                </div>
            </div>

          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden sticky top-24 transition-colors">
              <div className="h-48 overflow-hidden relative">
                 <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/10"></div>
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm rounded-full p-4 cursor-pointer hover:scale-110 transition-transform">
                     <PlayCircle size={32} className="text-white fill-white/20" />
                 </div>
              </div>
              <div className="p-6">
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </span>
                  {course.price > 0 && <span className="text-gray-400 line-through mb-1 text-sm">${(course.price * 1.5).toFixed(2)}</span>}
                </div>
                
                <button
                  onClick={() => onEnroll(course)}
                  className="w-full py-3.5 bg-primary-600 text-white font-bold rounded-lg shadow-lg hover:bg-primary-700 hover:shadow-primary-500/30 transition-all mb-4"
                >
                  {course.price === 0 ? 'Enroll Now' : 'Buy Now'}
                </button>
                
                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-6">30-Day Money-Back Guarantee</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <Clock size={18} className="text-gray-400" />
                    <span>{course.duration} on-demand video</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <Globe size={18} className="text-gray-400" />
                    <span>Full lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <ShieldCheck size={18} className="text-gray-400" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
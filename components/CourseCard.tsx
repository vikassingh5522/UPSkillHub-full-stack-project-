import React from 'react';
import { Star, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEnroll: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-500 transition-all duration-300 flex flex-col h-full relative transform hover:-translate-y-1">
      <Link to={`/course/${course.id}`} className="block relative h-52 overflow-hidden cursor-pointer">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm z-10 uppercase tracking-wide">
          {course.level}
        </div>
        {course.price === 0 && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
            FREE
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
            <div className="flex items-center gap-1 text-xs font-medium bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                <Clock size={12} /> {course.duration}
            </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-md uppercase tracking-wider">
                {course.category}
            </span>
        </div>
        
        <Link to={`/course/${course.id}`} className="block mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {course.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
            {course.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-5 gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold">
                {course.instructor.charAt(0)}
            </div>
            <span className="truncate max-w-[100px] text-xs font-medium">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            <Star size={14} fill="currentColor" />
            <span className="text-gray-700 dark:text-gray-300 font-bold text-xs">{course.rating}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-4">
            <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-medium">Price</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                </span>
            </div>
            <Link 
                to={`/course/${course.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 group/btn text-sm shadow-md hover:bg-primary-700 hover:shadow-lg transform active:scale-[0.98]"
            >
                View Details
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </div>
  );
};
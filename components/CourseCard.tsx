import React from 'react';
import { Star, Clock, User, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEnroll: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-500 transition-all duration-300 flex flex-col h-full relative">
      <Link to={`/course/${course.id}`} className="block relative h-48 overflow-hidden cursor-pointer">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm z-10">
          {course.level}
        </div>
        {course.price === 0 && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
            FREE
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded">
                {course.category}
            </span>
        </div>
        
        <Link to={`/course/${course.id}`} className="block">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors cursor-pointer">
            {course.title}
          </h3>
        </Link>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 gap-4">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span className="truncate max-w-[100px]">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">{course.rating}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400">Price</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                </span>
            </div>
            <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEnroll(course);
                }}
                className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-primary-600 dark:hover:bg-primary-400 dark:hover:text-white transition-colors shadow-sm z-20 relative"
            >
                {course.price === 0 ? 'Enroll Now' : 'Buy Now'}
            </button>
        </div>
      </div>
    </div>
  );
};
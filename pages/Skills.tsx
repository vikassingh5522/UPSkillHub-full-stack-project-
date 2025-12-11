import React, { useState, useEffect } from 'react';
import { CourseCard } from '../components/CourseCard';
import { Course, Category } from '../types';
import { Search, TrendingUp, Code, Database, Lock, X, Filter, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getCourses } from '../services/courses';

interface SkillsProps {
  onEnroll: (course: Course) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onEnroll }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('cat') as Category | 'All' || 'All';

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(initialCategory);
  const [priceFilter, setPriceFilter] = useState<'All' | 'Free' | 'Paid'>('All');
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories: (Category | 'All')[] = ['All', 'Development', 'Data Science', 'AI', 'Robotics', 'Future Tech', 'Design', 'Cloud', 'Cybersecurity', 'Business', 'Marketing'];

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      
      const filters: any = {};
      if (selectedCategory !== 'All') {
        filters.category = selectedCategory;
      }
      if (priceFilter !== 'All') {
        filters.price = priceFilter.toLowerCase();
      }
      if (searchTerm.trim()) {
        filters.search = searchTerm.trim();
      }

      const result = await getCourses(filters);
      if (result.data) {
        setCourses(result.data);
      } else if (result.error) {
        setError(result.error);
      }
      setIsLoading(false);
    };

    fetchCourses();
  }, [selectedCategory, priceFilter, searchTerm]);

  const filteredCourses = courses;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 lg:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 lg:mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-4">
                <TrendingUp size={16} /> Future-Proof Your Career
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 lg:mb-6">Master In-Demand Skills</h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                The tech landscape is evolving rapidly. Whether you are a complete beginner or looking to specialize, 
                our curriculum is designed to keep you ahead of the curve.
            </p>
        </div>

        {/* Trending Skills Quick Links */}
        <div className="mb-10 hidden sm:flex flex-wrap justify-center gap-3">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest self-center mr-2">Trending:</span>
            {[
                { name: 'Generative AI', icon: <TrendingUp size={14} /> },
                { name: 'Robotics', icon: <Code size={14} /> },
                { name: 'Python', icon: <Database size={14} /> },
                { name: 'Cybersecurity', icon: <Lock size={14} /> }
            ].map((skill, i) => (
                <button 
                    key={i} 
                    onClick={() => { 
                        setSearchTerm(skill.name); 
                        setSelectedCategory('All'); // Reset category to ensure global search
                        setIsSearchOpen(true); 
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all shadow-sm hover:shadow-md"
                >
                    {skill.icon} {skill.name}
                </button>
            ))}
        </div>

        {/* Perfect UI Filter Bar - Demultibar */}
        <div className="sticky top-20 z-30 mb-8 mx-auto max-w-full">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-black/50 rounded-2xl px-2 flex items-center relative h-16 transition-all duration-300">
                
                {/* Search Interaction */}
                <div className={`flex items-center h-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSearchOpen ? 'absolute inset-0 z-50 bg-white dark:bg-gray-800 rounded-2xl px-2 w-full' : 'w-12 shrink-0 justify-center'}`}>
                    {isSearchOpen ? (
                        <div className="flex items-center w-full h-full px-2">
                             <Search size={20} className="text-primary-600 dark:text-primary-400 shrink-0 mr-3" />
                             <input 
                                type="text"
                                autoFocus
                                placeholder="Search for skills, topics, or software..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-base h-full text-gray-900 dark:text-white placeholder-gray-400"
                             />
                             <button 
                                onClick={() => {
                                    setSearchTerm('');
                                    setIsSearchOpen(false);
                                }} 
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ml-2"
                             >
                                <X size={18} />
                             </button>
                        </div>
                    ) : (
                         <button 
                            onClick={() => setIsSearchOpen(true)}
                            className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-all"
                            aria-label="Open Search"
                         >
                            <Search size={20} />
                         </button>
                    )}
                </div>

                {/* Vertical Separator */}
                <div className={`w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1 shrink-0 ${isSearchOpen ? 'opacity-0' : 'opacity-100'}`}></div>

                {/* Categories - Centered and Scrollable */}
                <div className={`flex-1 flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 h-full ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`flex items-center justify-center whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all select-none ${
                                selectedCategory === cat
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Price Filter - Desktop Integrated */}
                <div className={`hidden md:flex items-center gap-3 pl-4 pr-2 h-full border-l border-gray-200 dark:border-gray-700 ml-1 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</span>
                     <div className="flex bg-gray-100 dark:bg-gray-900/50 rounded-xl p-1">
                        {[
                            { label: 'All', value: 'All' },
                            { label: 'Free', value: 'Free' },
                            { label: 'Paid', value: 'Paid' }
                        ].map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setPriceFilter(option.value as any)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    priceFilter === option.value
                                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                     </div>
                </div>

            </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={48} className="text-primary-600 dark:text-primary-400 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 mx-auto max-w-2xl text-center px-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mb-6">
              <X size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error loading courses</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">{error}</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} onEnroll={onEnroll} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 mx-auto max-w-2xl text-center px-4">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-400 mb-6">
                <Filter size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No courses match your filters</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                We couldn't find any courses matching "{searchTerm}" {selectedCategory !== 'All' ? `in ${selectedCategory}` : ''} {priceFilter !== 'All' ? `with ${priceFilter} price` : ''}.
            </p>
            <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setPriceFilter('All');}}
                className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-600/20"
            >
                Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
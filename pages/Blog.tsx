import React from 'react';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, ArrowRight, Zap, Mail } from 'lucide-react';

export const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 font-bold tracking-wider uppercase text-sm">Our Blog</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-6">Tech Insights & Career Advice</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Stay updated with the latest industry trends, coding tutorials, and soft-skill guides to help you scale your career.
            </p>
        </div>

        {/* Featured / Grid */}
        <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
                {BLOG_POSTS.map(post => (
                    <article key={post.id} className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
                        <div className="md:w-2/5 h-64 md:h-auto">
                            <img className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" src={post.image} alt={post.title} />
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                    {post.category}
                                </span>
                                <span className="text-gray-400 text-xs flex items-center gap-1">
                                    <Calendar size={12} /> {post.date}
                                </span>
                            </div>
                            <a href={post.link} target="_blank" rel="noopener noreferrer">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer">
                                    {post.title}
                                </h2>
                            </a>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                                        <User size={16} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{post.author}</span>
                                </div>
                                <a 
                                    href={post.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary-600 dark:text-primary-400 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                                >
                                    Read Article <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
                {/* Newsletter */}
                <div className="bg-primary-50 dark:bg-gray-800 p-8 rounded-2xl border border-primary-100 dark:border-gray-700">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 text-primary-600 rounded-full flex items-center justify-center mb-4">
                        <Mail size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Weekly Wisdom</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                        Join 15,000+ subscribers. Get a weekly dose of motivation, tech news, and coding tips directly to your inbox.
                    </p>
                    <form className="space-y-3">
                        <input type="email" placeholder="Your email address" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500" />
                        <button className="w-full py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors">
                            Subscribe Free
                        </button>
                    </form>
                </div>

                {/* Popular Topics */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Zap size={20} className="text-yellow-500" /> Hot Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {['Artificial Intelligence', 'Web Development', 'Career Growth', 'Remote Work', 'Productivity', 'Design Systems'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
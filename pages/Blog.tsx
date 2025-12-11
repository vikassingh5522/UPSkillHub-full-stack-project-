import React from 'react';
import { BLOG_POSTS } from '../constants';
import { Calendar, ArrowRight, Zap, Mail, Clock, Tag, ExternalLink } from 'lucide-react';

export const Blog: React.FC = () => {
  // Use a specific high-quality image for the featured post to match the design intent
  const featuredPost = {
    ...BLOG_POSTS[0],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  };
  const regularPosts = BLOG_POSTS.slice(1);

  return (
    <div className="min-h-screen bg-[#020617] text-white py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-800 pb-8">
            <div>
                <span className="text-primary-500 font-bold tracking-widest uppercase text-xs mb-3 block">Our Blog</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Insights & News</h1>
            </div>
            <p className="text-gray-400 max-w-sm text-sm md:text-right leading-relaxed">
                Latest tutorials, industry trends, and career advice for the modern developer.
            </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar: Recent Articles */}
            <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
                <div className="flex items-center gap-2 mb-2 pb-2">
                    <Clock size={16} className="text-primary-500" />
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Recent Articles
                    </h3>
                </div>
                
                <div className="space-y-6">
                {regularPosts.map(post => (
                    <article key={post.id} className="bg-[#0f172a] rounded-2xl overflow-hidden border border-gray-800 hover:border-primary-500/30 transition-all duration-300 group flex flex-col shadow-lg">
                        <div className="h-44 overflow-hidden relative">
                             <img 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                                src={post.image} 
                                alt={post.title} 
                             />
                             <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wide border border-white/10">
                                {post.category}
                             </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                <Calendar size={12} /> {post.date}
                            </div>
                            <a href={post.link} target="_blank" rel="noopener noreferrer" className="block mb-3 group/link">
                                <h2 className="text-lg font-bold text-gray-100 leading-snug group-hover:text-primary-400 transition-colors">
                                    {post.title}
                                </h2>
                            </a>
                            <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-700/30 mt-auto">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-primary-900/50 flex items-center justify-center text-primary-300 text-[10px] font-bold border border-primary-500/20">
                                        {post.author.charAt(0)}
                                    </div>
                                    <span className="text-xs font-medium text-gray-400">{post.author}</span>
                                </div>
                                <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-primary-400 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-wide">
                                    Read <ArrowRight size={12} />
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
                </div>
            </div>

            {/* Right Main Column */}
            <div className="lg:col-span-8 space-y-8 order-1 lg:order-2">
                
                {/* Featured Hero Post */}
                <article className="relative bg-[#0f172a] rounded-3xl overflow-hidden shadow-2xl min-h-[500px] flex flex-col justify-end group border border-gray-800">
                    <div className="absolute inset-0">
                        <img 
                            src={featuredPost.image} 
                            alt={featuredPost.title} 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-700 scale-100 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/80 via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="relative p-8 md:p-12 z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider mb-6 shadow-lg shadow-primary-900/40">
                            Featured Story
                        </div>
                        
                        <a href={featuredPost.link} target="_blank" rel="noopener noreferrer">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 hover:text-primary-300 transition-colors leading-tight tracking-tight shadow-black drop-shadow-lg">
                                {featuredPost.title}
                            </h2>
                        </a>
                        
                        <p className="text-gray-200 mb-8 text-lg md:text-xl line-clamp-2 leading-relaxed font-light max-w-2xl drop-shadow-md">
                            {featuredPost.excerpt}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-white/10">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold text-lg">
                                    {featuredPost.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-base">{featuredPost.author}</div>
                                    <div className="text-sm text-gray-300">{featuredPost.date}</div>
                                </div>
                             </div>
                             
                             <a 
                                href={featuredPost.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all shadow-xl shadow-black/20"
                             >
                                Read Article <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                             </a>
                        </div>
                    </div>
                </article>

                {/* Widgets Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Newsletter Widget - Dark Purple */}
                    <div className="bg-[#1e1b4b] p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center border border-primary-900/30 shadow-xl min-h-[220px]">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary-600 rounded-full blur-[60px] opacity-30"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <Mail size={20} className="text-indigo-200" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Weekly Newsletter</h3>
                            </div>
                            <p className="text-indigo-200/80 text-sm mb-6 leading-relaxed">
                                Get the latest career tips and tech news delivered to your inbox.
                            </p>
                            <div className="flex gap-2">
                                <input 
                                    type="email" 
                                    placeholder="email address" 
                                    className="bg-[#312e81]/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-indigo-300/50 w-full focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all" 
                                />
                                <button className="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shrink-0 shadow-lg">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Topics Widget - Dark Slate */}
                    <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-700/50 shadow-xl flex flex-col justify-center min-h-[220px]">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Zap size={20} className="text-amber-500" /> Trending Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['AI & ML', 'Web Dev', 'Cybersecurity', 'Career', 'Soft Skills', 'Productivity'].map(tag => (
                                <span key={tag} className="px-3 py-1.5 bg-[#0f172a] text-gray-300 text-xs font-bold rounded-lg hover:bg-primary-900/40 hover:text-primary-400 hover:border-primary-500/30 cursor-pointer transition-all border border-gray-700/50">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};
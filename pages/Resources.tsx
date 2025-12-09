import React from 'react';
import { FileText, Video, Download, ExternalLink, Book, Github, MessageSquare, ArrowRight } from 'lucide-react';

export const Resources: React.FC = () => {
  const resources = [
    { title: "React.js Cheatsheet 2025", type: "PDF Guide", icon: <FileText />, desc: "Complete quick reference for Hooks, Components, and Redux." },
    { title: "Introduction to Neural Networks", type: "Video Lecture", icon: <Video />, desc: "A 2-hour deep dive into the math and logic behind AI." },
    { title: "System Design Interview Guide", type: "E-Book", icon: <Download />, desc: "Ace your FAANG interviews with this comprehensive guide." },
    { title: "Tailwind CSS Component Library", type: "External Tool", icon: <ExternalLink />, desc: "Copy-paste production ready UI components." },
    { title: "Python for Beginners Handbook", type: "PDF Guide", icon: <FileText />, desc: "Zero to Hero Python programming guide." },
    { title: "DevOps Roadmap", type: "Interactive Map", icon: <ExternalLink />, desc: "Step-by-step path to becoming a DevOps Engineer." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Empower Your Learning</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Knowledge should be accessible. We have curated the best supplemental materials to help you go deeper, practice effectively, and stay updated.
            </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {resources.map((res, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full group">
                    <div className="flex items-start justify-between mb-6">
                        <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-xl text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
                            {res.icon}
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {res.type}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{res.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 flex-grow">{res.desc}</p>
                    <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                        Access Resource <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            ))}
        </div>

        {/* Community Hub */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
                <MessageSquare size={200} />
            </div>
            <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">Join the Conversation</h2>
                <p className="text-gray-300 text-lg mb-8">
                    Learning is better together. Join our Discord server and GitHub community to collaborate on projects, ask questions, and share your wins.
                </p>
                <div className="flex gap-4">
                     <button className="flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-bold transition-colors shadow-lg hover:shadow-indigo-500/30">
                        <MessageSquare size={20} /> Discord
                     </button>
                     <button className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition-colors shadow-lg">
                        <Github size={20} /> GitHub
                     </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
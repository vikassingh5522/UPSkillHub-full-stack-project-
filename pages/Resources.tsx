import React, { useState, useEffect } from 'react';
import { FileText, Video, Download, ExternalLink, Youtube, Play, ArrowRight, Code, Database, Layers, Loader2 } from 'lucide-react';
import { getResources, trackResourceAccess, type Resource } from '../services/resources';

const iconMap: Record<string, React.ReactNode> = {
  'FileText': <FileText />,
  'Video': <Video />,
  'Download': <Download />,
  'ExternalLink': <ExternalLink />,
  'Code': <Code />,
  'Database': <Database />,
  'Layers': <Layers />,
};

export const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      const result = await getResources();
      if (result.data) {
        setResources(result.data);
      }
      setIsLoading(false);
    };
    fetchResources();
  }, []);

  const handleResourceAccess = async (resource: Resource) => {
    await trackResourceAccess(resource.id);
    
    if (resource.type === 'External Tool' || resource.type === 'Interactive Tool' || resource.type === 'Interactive Map') {
      if (resource.url) {
        window.open(resource.url, '_blank', 'noopener,noreferrer');
      }
    } else {
      alert(`Accessing ${resource.title}. This would typically download or open the resource.`);
    }
  };

  const motivationalVideos = [
    {
      title: "The First 20 Hours - How to Learn Anything",
      author: "Josh Kaufman | TEDx",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "https://www.youtube.com/watch?v=5MgBikgcWnY",
      views: "22M views"
    },
    {
      title: "Why You Should Learn to Code",
      author: "Steve Jobs",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "https://www.youtube.com/watch?v=nKIu9yen5nc",
      views: "1.5M views"
    },
    {
      title: "Mindset of Successful Programmers",
      author: "TechLead",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "https://www.youtube.com/watch?v=5p2ubR_Fk_g",
      views: "850K views"
    },
    {
        title: "Grit: The power of passion and perseverance",
        author: "Angela Lee Duckworth",
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "https://www.youtube.com/watch?v=H14bBuluwB8",
        views: "30M views"
    }
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
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={48} className="text-primary-600 dark:text-primary-400 animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {resources.map((res) => (
              <div key={res.id} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full group">
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-xl text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
                    {iconMap[res.icon] || <FileText />}
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {res.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{res.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 flex-grow">{res.description}</p>
                <button 
                  onClick={() => handleResourceAccess(res)}
                  aria-label={`Access ${res.title}`}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  Access Resource <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Motivational Videos Section */}
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400">
                    <Youtube size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Motivational & Tech Talks</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {motivationalVideos.map((video, i) => (
                    <a key={i} href={video.link} target="_blank" rel="noopener noreferrer" className="group block">
                        <div className="relative rounded-xl overflow-hidden mb-3 aspect-video shadow-md">
                            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border-2 border-white group-hover:scale-110 transition-transform">
                                    <Play size={20} fill="currentColor" className="ml-1" />
                                </div>
                            </div>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1 line-clamp-2">
                            {video.title}
                        </h3>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>{video.author}</span>
                            <span>{video.views}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};
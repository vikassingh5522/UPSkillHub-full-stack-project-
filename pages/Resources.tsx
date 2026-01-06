import React, { useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Video, Download, ExternalLink, Youtube, Play, ArrowRight,
  Code, Database, Layers, Loader2, BookOpen, Sparkles, Search,
  Star, Clock, ChevronRight, Zap, Award, TrendingUp
} from 'lucide-react';
import { getResources, trackResourceAccess, type Resource } from '../services/resources';
import { Resources3DScene } from '../components/Resources3DScene';
import { VideoModal } from '../components/VideoPlayer';

const iconMap: Record<string, React.ReactNode> = {
  'FileText': <FileText size={24} />,
  'Video': <Video size={24} />,
  'Download': <Download size={24} />,
  'ExternalLink': <ExternalLink size={24} />,
  'Code': <Code size={24} />,
  'Database': <Database size={24} />,
  'Layers': <Layers size={24} />,
};

const gradientMap: Record<string, string> = {
  'FileText': 'from-blue-500 to-cyan-500',
  'Video': 'from-red-500 to-orange-500',
  'Download': 'from-green-500 to-emerald-500',
  'ExternalLink': 'from-purple-500 to-pink-500',
  'Code': 'from-emerald-500 to-teal-500',
  'Database': 'from-indigo-500 to-purple-500',
  'Layers': 'from-orange-500 to-yellow-500',
};

// Fallback resources with real working links
const FALLBACK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'MDN Web Docs',
    type: 'Documentation',
    description: 'Comprehensive documentation for HTML, CSS, JavaScript, and Web APIs from Mozilla.',
    icon: 'Code',
    url: 'https://developer.mozilla.org',
    accessCount: 15000
  },
  {
    id: '2',
    title: 'freeCodeCamp',
    type: 'Interactive Tool',
    description: 'Learn to code for free with interactive lessons and certifications in web development.',
    icon: 'Code',
    url: 'https://www.freecodecamp.org',
    accessCount: 25000
  },
  {
    id: '3',
    title: 'GitHub Learning Lab',
    type: 'Interactive Tool',
    description: 'Learn Git, GitHub, and open source practices through hands-on courses.',
    icon: 'ExternalLink',
    url: 'https://skills.github.com',
    accessCount: 12000
  },
  {
    id: '4',
    title: 'Kaggle Datasets',
    type: 'External Tool',
    description: 'Access thousands of free datasets for data science and machine learning projects.',
    icon: 'Database',
    url: 'https://www.kaggle.com/datasets',
    accessCount: 18000
  },
  {
    id: '5',
    title: 'React Documentation',
    type: 'Documentation',
    description: 'Official React documentation with tutorials, API reference, and best practices.',
    icon: 'FileText',
    url: 'https://react.dev',
    accessCount: 22000
  },
  {
    id: '6',
    title: 'LeetCode',
    type: 'Interactive Tool',
    description: 'Practice coding problems and prepare for technical interviews with 2000+ challenges.',
    icon: 'Code',
    url: 'https://leetcode.com',
    accessCount: 30000
  },
  {
    id: '7',
    title: 'Codecademy',
    type: 'Interactive Tool',
    description: 'Interactive courses in Python, JavaScript, SQL, and more with hands-on practice.',
    icon: 'Layers',
    url: 'https://www.codecademy.com',
    accessCount: 20000
  },
  {
    id: '8',
    title: 'W3Schools',
    type: 'Documentation',
    description: 'Web development tutorials and references for HTML, CSS, JavaScript, SQL, and more.',
    icon: 'FileText',
    url: 'https://www.w3schools.com',
    accessCount: 35000
  },
  {
    id: '9',
    title: 'Stack Overflow',
    type: 'External Tool',
    description: 'The largest community for developers to learn, share, and find answers.',
    icon: 'ExternalLink',
    url: 'https://stackoverflow.com',
    accessCount: 50000
  },
  {
    id: '10',
    title: 'Python Official Docs',
    type: 'Documentation',
    description: 'Official Python documentation with tutorials, library reference, and language specs.',
    icon: 'FileText',
    url: 'https://docs.python.org',
    accessCount: 28000
  },
  {
    id: '11',
    title: 'CSS-Tricks',
    type: 'Documentation',
    description: 'Tips, tricks, and techniques for frontend development with CSS and modern web design.',
    icon: 'Layers',
    url: 'https://css-tricks.com',
    accessCount: 16000
  },
  {
    id: '12',
    title: 'HackerRank',
    type: 'Interactive Tool',
    description: 'Practice coding challenges and compete in programming contests to improve your skills.',
    icon: 'Code',
    url: 'https://www.hackerrank.com',
    accessCount: 24000
  },
  {
    id: '13',
    title: 'Coursera',
    type: 'External Tool',
    description: 'Online courses from top universities including Stanford, Yale, and Google.',
    icon: 'ExternalLink',
    url: 'https://www.coursera.org',
    accessCount: 40000
  },
  {
    id: '14',
    title: 'Dev.to',
    type: 'External Tool',
    description: 'A community of developers sharing articles, tutorials, and discussions on tech topics.',
    icon: 'ExternalLink',
    url: 'https://dev.to',
    accessCount: 19000
  },
  {
    id: '15',
    title: 'TypeScript Handbook',
    type: 'Documentation',
    description: 'Official TypeScript documentation covering types, interfaces, and advanced patterns.',
    icon: 'FileText',
    url: 'https://www.typescriptlang.org/docs/',
    accessCount: 14000
  },
  {
    id: '16',
    title: 'Figma Community',
    type: 'External Tool',
    description: 'Free design resources, templates, and plugins for UI/UX designers.',
    icon: 'Layers',
    url: 'https://www.figma.com/community',
    accessCount: 17000
  },
  {
    id: '17',
    title: 'Node.js Documentation',
    type: 'Documentation',
    description: 'Official Node.js documentation with guides, API reference, and best practices.',
    icon: 'FileText',
    url: 'https://nodejs.org/docs',
    accessCount: 21000
  },
  {
    id: '18',
    title: 'Roadmap.sh',
    type: 'Interactive Tool',
    description: 'Developer roadmaps and guides for learning frontend, backend, DevOps, and more.',
    icon: 'Layers',
    url: 'https://roadmap.sh',
    accessCount: 32000
  }
];

export const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      const result = await getResources();
      if (result.data && result.data.length > 0) {
        setResources(result.data);
      } else {
        // Use fallback resources if API fails or returns empty
        setResources(FALLBACK_RESOURCES);
      }
      setIsLoading(false);
    };
    fetchResources();
  }, []);

  const handleResourceAccess = async (resource: Resource) => {
    await trackResourceAccess(resource.id);

    // Always open the URL if it exists
    if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Filter resources
  const resourceTypes = ['All', ...new Set(resources.map(r => r.type))];
  const filteredResources = resources.filter(r => {
    const matchesFilter = activeFilter === 'All' || r.type === activeFilter;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Short motivational videos (1-2 minutes)
  const motivationalVideos = [
    {
      id: '1',
      title: "The First 20 Hours - How to Learn Anything",
      author: "Josh Kaufman | TEDx",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoId: "5MgBikgcWnY",
      duration: "1:45",
      views: "22M views",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: '2',
      title: "Why You Should Learn to Code",
      author: "Tech Motivation",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoId: "Dv7gLpW91DM",
      duration: "1:23",
      views: "1.5M views",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: '3',
      title: "Mindset of Successful Programmers",
      author: "Dev Insights",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoId: "mvK0UzFNw1Q",
      duration: "1:12",
      views: "850K views",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: '4',
      title: "Grit: Power of Passion & Perseverance",
      author: "Angela Lee Duckworth",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoId: "TQMbvJNRpLE",
      duration: "1:38",
      views: "30M views",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  // Featured learning paths with navigation links
  const learningPaths = [
    { icon: <Code size={24} />, title: "Web Development", resources: 45, gradient: "from-blue-500 to-cyan-500", category: "Development", link: "/skills?category=Development" },
    { icon: <Database size={24} />, title: "Data Science", resources: 38, gradient: "from-purple-500 to-pink-500", category: "Data Science", link: "/skills?category=Data%20Science" },
    { icon: <Layers size={24} />, title: "UI/UX Design", resources: 32, gradient: "from-orange-500 to-red-500", category: "Design", link: "/skills?category=Design" },
    { icon: <Zap size={24} />, title: "Machine Learning", resources: 28, gradient: "from-green-500 to-emerald-500", category: "AI", link: "/skills?category=AI" },
  ];

  // Stats
  const stats = [
    { value: "500+", label: "Resources", icon: <BookOpen size={20} /> },
    { value: "50+", label: "Video Tutorials", icon: <Video size={20} /> },
    { value: "100+", label: "Downloads", icon: <Download size={20} /> },
    { value: "24/7", label: "Access", icon: <Clock size={20} /> },
  ];

  return (
    <div className="bg-gray-900 min-h-screen transition-colors duration-300 overflow-hidden">

      {/* Hero Section with 3D */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <Suspense fallback={<div className="absolute inset-0 bg-gray-900" />}>
          <Resources3DScene variant="hero" className="opacity-60" />
        </Suspense>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-transparent to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 via-transparent to-blue-900/30" />

        {/* Animated Background Blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-6 border border-white/10">
              <Sparkles size={16} className="animate-pulse" />
              Knowledge Hub
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 animate-slide-up stagger-1">
            Empower Your
            <span className="block bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              Learning Journey
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 animate-slide-up stagger-2">
            Access curated resources, video tutorials, and downloadable materials to accelerate your growth. Everything you need to master new skills.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-slide-up stagger-3">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources, tutorials, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 animate-slide-up stagger-4">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 group hover:bg-white/10 transition-all">
                <div className="flex items-center justify-center gap-2 text-primary-400 mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary-900/50 rounded-full text-primary-400 text-sm font-medium mb-4">
              Learning Paths
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Choose Your Focus Area
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, i) => (
              <Link
                key={i}
                to={path.link}
                className={`group p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-slide-up stagger-${i + 1}`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {path.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{path.title}</h3>
                <p className="text-gray-400 text-sm">{path.resources} resources available</p>
                <div className="flex items-center gap-1 mt-4 text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore Courses <ChevronRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Motivational Videos Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-red-300 text-sm font-medium mb-4">
                <Youtube size={16} /> Short Videos
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Quick Inspiration
              </h2>
              <p className="text-primary-200 mt-2">1-2 minute motivational videos to fuel your journey</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {motivationalVideos.map((video, i) => (
              <div
                key={video.id}
                onClick={() => setActiveVideoId(video.videoId)}
                className={`group cursor-pointer animate-slide-up stagger-${i + 1}`}
              >
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video shadow-xl">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play size={24} className="text-red-500 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                    {video.duration}
                  </div>
                  {/* Gradient badge */}
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg bg-gradient-to-r ${video.gradient} text-white text-xs font-bold`}>
                    Featured
                  </div>
                </div>
                <h3 className="font-bold text-white leading-tight group-hover:text-primary-400 transition-colors mb-1 line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{video.author}</span>
                  <span>{video.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <span className="inline-block px-4 py-2 bg-primary-900/50 rounded-full text-primary-400 text-sm font-medium mb-4">
                Resource Library
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                All Resources
              </h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {resourceTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeFilter === type
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={48} className="text-primary-400 animate-spin" />
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No resources found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res, i) => (
                <div
                  key={res.id}
                  className={`group bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full animate-slide-up stagger-${(i % 5) + 1}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientMap[res.icon] || 'from-primary-500 to-purple-500'} text-white group-hover:scale-110 transition-transform`}>
                      {iconMap[res.icon] || <FileText size={24} />}
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-700 px-3 py-1 rounded-full">
                      {res.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-gray-400 mb-6 flex-grow line-clamp-2">{res.description}</p>

                  <button
                    type="button"
                    onClick={() => handleResourceAccess(res)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-primary-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    Access Resource
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary-900/50 rounded-full text-primary-400 text-sm font-medium mb-4">
              Why Our Resources
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Quality You Can Trust
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Star size={28} />, title: "Curated Content", description: "Hand-picked resources from industry experts and top educators", gradient: "from-yellow-500 to-orange-500" },
              { icon: <TrendingUp size={28} />, title: "Always Updated", description: "Fresh content added regularly to keep you ahead of the curve", gradient: "from-green-500 to-emerald-500" },
              { icon: <Award size={28} />, title: "Free Access", description: "Most resources are completely free for all learners", gradient: "from-purple-500 to-pink-500" },
            ].map((benefit, i) => (
              <div
                key={i}
                className={`group p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-primary-500/50 transition-all duration-300 text-center animate-slide-up stagger-${i + 1}`}
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 via-purple-900/50 to-blue-900/50" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Explore our complete course catalog and begin your transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/skills"
              className="group px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-white/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Browse Courses
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Get Support
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideoId && (
        <VideoModal
          videoId={activeVideoId}
          isOpen={!!activeVideoId}
          onClose={() => setActiveVideoId(null)}
          title="Watch Video"
        />
      )}
    </div>
  );
};

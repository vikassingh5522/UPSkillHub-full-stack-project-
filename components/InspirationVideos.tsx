import React, { useState } from 'react';
import { Play, Sparkles, Rocket, Target, Brain } from 'lucide-react';
import { VideoModal } from './VideoPlayer';

interface InspirationVideo {
  id: string;
  title: string;
  description: string;
  videoId: string;
  thumbnail: string;
  duration: string;
  icon: React.ReactNode;
  gradient: string;
}

// Short inspirational videos about learning and tech careers (all under 2 minutes)
const inspirationVideos: InspirationVideo[] = [
  {
    id: '1',
    title: 'Why Learn to Code?',
    description: 'Discover how coding can transform your career and open new opportunities',
    videoId: 'Dv7gLpW91DM', // Short "Why learn to code" video
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    duration: '1:23',
    icon: <Sparkles size={24} />,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: '2',
    title: 'The Power of Learning',
    description: 'See how continuous learning leads to success in the tech industry',
    videoId: '5MgBikgcWnY', // Short motivational learning video
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    duration: '1:45',
    icon: <Brain size={24} />,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: '3',
    title: 'Start Your Tech Journey',
    description: 'Get inspired to take the first step towards your dream tech career',
    videoId: 'mvK0UzFNw1Q', // Short career motivation video
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    duration: '1:12',
    icon: <Rocket size={24} />,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: '4',
    title: 'Achieve Your Goals',
    description: 'Learn how to stay motivated and reach your learning objectives',
    videoId: 'TQMbvJNRpLE', // Short goal achievement video
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    duration: '1:38',
    icon: <Target size={24} />,
    gradient: 'from-green-500 to-emerald-500',
  },
];

export const InspirationVideos: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<InspirationVideo | null>(null);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            Get Inspired
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Inspiration Videos
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Watch these short videos to fuel your motivation and start your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {inspirationVideos.map((video, i) => (
            <div
              key={video.id}
              className={`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 cursor-pointer animate-slide-up stagger-${i + 1}`}
              onClick={() => setActiveVideo(video)}
            >
              {/* Video Thumbnail */}
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play size={24} className="text-primary-600 ml-1" fill="currentColor" />
                  </div>
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                  {video.duration}
                </div>
                {/* Icon badge */}
                <div className={`absolute top-2 left-2 p-2 rounded-lg bg-gradient-to-br ${video.gradient} text-white`}>
                  {video.icon}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <VideoModal
          videoId={activeVideo.videoId}
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          title={activeVideo.title}
        />
      )}
    </section>
  );
};

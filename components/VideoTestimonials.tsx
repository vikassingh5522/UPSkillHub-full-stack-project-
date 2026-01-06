import React, { useState } from 'react';
import { Play, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoModal } from './VideoPlayer';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  videoId: string;
  thumbnail: string;
  quote: string;
  rating: number;
  duration: string;
}

// Short motivational/success story videos (under 2 minutes)
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Full Stack Developer',
    company: 'Google',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150',
    videoId: 'Tn6-PIqc4UM', // Short motivational - "Why Learning to Code is Important" (1 min)
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    quote: 'Learning to code changed my life. I went from retail to tech in just 6 months!',
    rating: 5,
    duration: '1:02',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Data Scientist',
    company: 'Meta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150',
    videoId: 'x28v7iKR8x0', // Short tech career motivation (1:30)
    thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    quote: 'The structured learning path made all the difference. Data science is now my passion!',
    rating: 5,
    duration: '1:28',
  },
  {
    id: '3',
    name: 'Emily Johnson',
    role: 'UX Designer',
    company: 'Apple',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150',
    videoId: 'rqVLrZFgIjM', // Short design career video (1 min)
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    quote: 'Design thinking courses helped me land my dream job at Apple!',
    rating: 5,
    duration: '1:15',
  },
];

export const VideoTestimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const activeTestimonial = testimonials[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-200 text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Hear From Our Graduates
          </h2>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto">
            Real stories from real people who transformed their careers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Preview */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setIsVideoOpen(true)}
            >
              <img
                src={activeTestimonial.thumbnail}
                alt={`${activeTestimonial.name}'s testimonial`}
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                  <Play size={40} className="text-primary-600 ml-2" fill="currentColor" />
                </div>
              </div>
              {/* Duration badge */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 rounded-lg text-white text-sm font-medium">
                {activeTestimonial.duration}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-semibold">Watch {activeTestimonial.name}'s Story</p>
                <p className="text-gray-300 text-sm">Short inspiration video</p>
              </div>
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="space-y-8">
            <div className="relative">
              <Quote size={48} className="text-primary-400/30 absolute -top-4 -left-4" />
              <p className="text-2xl text-white font-medium leading-relaxed pl-8">
                "{activeTestimonial.quote}"
              </p>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={activeTestimonial.avatar}
                alt={activeTestimonial.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-primary-400/30"
              />
              <div>
                <h4 className="text-xl font-bold text-white">{activeTestimonial.name}</h4>
                <p className="text-primary-200">
                  {activeTestimonial.role} at {activeTestimonial.company}
                </p>
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i === activeIndex ? 'bg-primary-400' : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        videoId={activeTestimonial.videoId}
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={`${activeTestimonial.name}'s Success Story`}
      />
    </section>
  );
};

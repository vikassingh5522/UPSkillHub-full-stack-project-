import React, { useState } from 'react';
import { Play, X, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  thumbnail?: string;
  title?: string;
  autoPlay?: boolean;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  thumbnail,
  title,
  autoPlay = false,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);

  const defaultThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const thumbnailUrl = thumbnail || defaultThumbnail;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      {!isPlaying ? (
        <div className="relative group cursor-pointer" onClick={handlePlay}>
          <img
            src={thumbnailUrl}
            alt={title || 'Video thumbnail'}
            className="w-full h-full object-cover aspect-video"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              className="w-20 h-20 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-600/50 transform group-hover:scale-110 transition-all"
              aria-label="Play video"
            >
              <Play size={36} fill="currentColor" className="ml-1" />
            </button>
          </div>
          {title && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white font-semibold text-lg">{title}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1`}
            title={title || 'Video player'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors z-10"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      )}
    </div>
  );
};

interface VideoModalProps {
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  videoId,
  isOpen,
  onClose,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:text-primary-400 transition-colors"
          aria-label="Close video"
        >
          <X size={32} />
        </button>
        {title && (
          <h3 className="text-white text-xl font-bold mb-4">{title}</h3>
        )}
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title || 'Video player'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

interface HeroBackgroundVideoProps {
  videoId: string;
  className?: string;
}

export const HeroBackgroundVideo: React.FC<HeroBackgroundVideoProps> = ({
  videoId,
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60 z-10" />
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`}
        title="Background video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="absolute w-[200%] h-[200%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ border: 'none' }}
      />
    </div>
  );
};

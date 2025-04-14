'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Play, Clock } from 'lucide-react';
import Image from 'next/image';

interface VideoCardProps {
  title: string;
  thumbnail?: string;
  duration: string;
  onClick: () => void;
  src?: string;
}

export default function VideoCard({
  title,
  thumbnail,
  duration,
  onClick,
  src,
}: VideoCardProps) {
  const getYouTubeThumbnail = (url?: string): string => {
    if (thumbnail) return thumbnail; // Use provided thumbnail
    if (!url) return '/fallback-thumbnail.jpg';
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : '/fallback-thumbnail.jpg';
  };

  const validateDuration = (dur: string): string => {
    if (/^(\d{1,2}):([0-5]\d)$/.test(dur)) return dur;
    return '00:00';
  };

  const displayThumbnail = getYouTubeThumbnail(src);
  const displayDuration = validateDuration(duration);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      className="video-card overflow-hidden cursor-pointer h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] border-2 border-jeepurple-200 rounded-xl group"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Play video: ${title}`}
    >
      <div className="relative aspect-video bg-gradient-to-br from-jeepurple-100 to-cogteal-100 overflow-hidden">
        <Image
          src={displayThumbnail}
          alt={`Thumbnail for ${title}`}
          width={480} // Approximate width for hqdefault.jpg
          height={360} // Maintains 4:3 aspect ratio
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = '/fallback-thumbnail.jpg';
          }}
          priority={false} // Lazy load by default
        />
        <div className="absolute inset-0 bg-gradient-to-br from-jeepurple-500/30 to-cogteal-500/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <div className="bg-jeepurple-600 rounded-full p-3 sm:p-4 shadow-xl group-hover:animate-pulse">
            <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="white" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-cogteal-600 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-cogteal-500">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{displayDuration}</span>
        </div>
      </div>
      <CardContent className="p-4 sm:p-5">
        <h3 className="font-semibold text-base sm:text-lg text-jeepurple-800 line-clamp-2 group-hover:text-cogteal-600 transition-colors duration-200">
          {title}
        </h3>
      </CardContent>
    </Card>
  );
}
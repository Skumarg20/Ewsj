'use client';

import { Card, CardContent } from '@/components/ui/card';

interface VideoCardProps {
  title: string;
  duration?: string;
  src?: string;
  onClick?: () => void; // Optional since no thumbnail click needed
}

export default function VideoCard({ title, duration = '00:00', src }: VideoCardProps) {
  const validateDuration = (dur: string): string => {
    if (/^(\d{1,2}):([0-5]\d)$/.test(dur)) return dur;
    return '00:00'; // Fallback for invalid duration
  };

  const displayDuration = validateDuration(duration);

  const getYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeId = src ? getYouTubeId(src) : null;

  return (
    <Card
      className="video-card overflow-hidden h-full bg-white shadow-lg border-2 border-jeepurple-200 rounded-xl"
    >
      <div className="relative aspect-video">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title || 'Untitled Video'}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600">
            {src ? 'Invalid YouTube URL' : 'No Video Available'}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-jeepurple-800 line-clamp-2">
          {title || 'Untitled Video'}
        </h3>
        <p className="text-sm text-jeepurple-600">{displayDuration}</p>
      </CardContent>
    </Card>
  );
}
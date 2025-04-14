'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, ExternalLink } from 'lucide-react';

interface CustomYouTubePlayerProps {
  src: string;
  title?: string;
  className?: string;
  primaryColor?: string;
  poster?: string;
}

declare global {
  interface Window {
    YT: {
      Player: new (element: HTMLElement | null, config: YT.PlayerOptions) => YT.Player;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function CustomYouTubePlayer({
  src,
  title = 'YouTube Video',
  className = '',
  primaryColor = '#7C3AED',
  poster,
}: CustomYouTubePlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract YouTube video ID
  const getYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(src);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`
    : '';
  const youtubeLink = videoId ? `https://www.youtube.com/watch?v=${videoId}` : '#';

  // Validate URL
  useEffect(() => {
    if (!src) {
      setError('No video URL provided');
    } else if (!videoId && !src.includes('youtube.com') && !src.includes('youtu.be')) {
      setError('Unsupported video source. Please provide a valid YouTube URL.');
    } else {
      setError(null);
    }
  }, [src, videoId]);

  // Load YouTube Iframe API
  useEffect(() => {
    if (!videoId) return;

    if (!window.YT && !document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.id = 'youtube-iframe-api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, [videoId]);

  // Initialize YouTube Player
  useEffect(() => {
    if (!videoId || !iframeRef.current) return;

    let isMounted = true;

    const initializePlayer = () => {
      if (!isMounted || !window.YT?.Player) return;

      const ytPlayer = new window.YT.Player(iframeRef.current!, {
        events: {
          onReady: () => {
            if (isMounted) {
              setPlayer(ytPlayer);
              const fetchedDuration = ytPlayer.getDuration();
              setDuration(fetchedDuration || 0);
              ytPlayer.setVolume(volume);
              // Ensure duration is set by polling if initially 0
              if (!fetchedDuration) {
                const checkDuration = setInterval(() => {
                  const newDuration = ytPlayer.getDuration();
                  if (newDuration > 0) {
                    setDuration(newDuration);
                    clearInterval(checkDuration);
                  }
                }, 500);
                setTimeout(() => clearInterval(checkDuration), 5000); // Stop after 5s if still 0
              }
            }
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (isMounted) {
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            }
          },
          onError: (event: YT.OnErrorEvent) => {
            if (isMounted) {
              const errorMessage =
                event.data === 150
                  ? 'This video cannot be played due to embedding restrictions set by the owner.'
                  : event.data === 101
                  ? 'This video is restricted from embedding on this site.'
                  : `Failed to load video (Error code: ${event.data})`;
              setError(errorMessage);
              setPlayer(null);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      const originalCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
        if (originalCallback) originalCallback();
      };
    }

    return () => {
      isMounted = false;
      if (window.onYouTubeIframeAPIReady === initializePlayer) {
        window.onYouTubeIframeAPIReady = undefined;
      }
    };
  }, [videoId, volume]);

  // Update progress
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (player && isPlaying) {
      interval = setInterval(() => {
        const current = player.getCurrentTime();
        const total = player.getDuration();
        if (total > 0) {
          setProgress((current / total) * 100);
          setDuration(total); // Ensure duration stays updated
        }
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [player, isPlaying]);

  // Handle fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreenNow = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement
      );
      setIsFullscreen(isFullscreenNow);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Control Functions
  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    setPrevVolume(newVolume || prevVolume);
    if (player) {
      player.setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(prevVolume);
      if (player) player.setVolume(prevVolume);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      if (player) player.setVolume(0);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    if (player && duration > 0) {
      const newTime = (newProgress / 100) * duration;
      player.seekTo(newTime, true);
      setProgress(newProgress); // Update progress after seeking
    }
  };
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      const requestFullscreen =
        containerRef.current.requestFullscreen ||
        (containerRef.current as any).webkitRequestFullscreen;
      requestFullscreen.call(containerRef.current);
    } else {
      const exitFullscreen =
        document.exitFullscreen || (document as any).webkitExitFullscreen;
      exitFullscreen.call(document);
    }
  };
  const formatTime = (time: number): string => {
    if (isNaN(time) || time <= 0) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${className}`}
      style={{ background: `linear-gradient(to bottom right, ${primaryColor}22, #111827)` }}
    >
      {error || !videoId ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-white bg-gray-900 p-4 text-center">
          <p>{error}</p>
          {videoId && error && (
            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-1 text-jeepurple-300 hover:text-jeepurple-100"
            >
              <ExternalLink className="w-4 h-4" />
              Watch on YouTube
            </a>
          )}
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      {!error && (
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between opacity-90">
          <span
            className="text-white font-semibold text-sm sm:text-base px-3 py-1 rounded-full shadow-md"
            style={{ backgroundColor: `${primaryColor}99` }}
          >
            {title}
          </span>
        </div>
      )}

      {!error && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 cursor-pointer"
              style={{ accentColor: primaryColor }}
              disabled={!player || duration === 0}
            />
            <div className="flex items-center justify-between gap-2 text-white text-xs">
              <span>{formatTime((progress / 100) * duration)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={togglePlay}
                disabled={!player}
                className="p-2 rounded-full hover:scale-110 transition-all disabled:opacity-50"
                style={{ backgroundColor: primaryColor }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" fill="white" />
                ) : (
                  <Play className="w-5 h-5" fill="white" />
                )}
              </button>
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-white" disabled={!player}>
                  {volume === 0 ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1"
                  style={{ accentColor: primaryColor }}
                  disabled={!player}
                />
              </div>
              <div className="flex-1" />
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full hover:scale-110 transition-all"
                style={{ backgroundColor: primaryColor }}
                disabled={!player}
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" fill="white" />
                ) : (
                  <Maximize className="w-5 h-5" fill="white" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
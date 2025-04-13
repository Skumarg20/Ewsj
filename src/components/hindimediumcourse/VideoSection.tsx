'use client';
import React, { useEffect, useState } from 'react';
import { PlayCircle, Video, Star, Quote } from 'lucide-react';

const VideoSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('video-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <style jsx>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
          100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <section
        id="video-section"
        className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-gray-100"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Video className="inline-block text-indigo-600 mr-2" size={32} />
              Transform Your JEE Prep with Our Course
            </h2>
            <p
              className={`text-base sm:text-lg text-gray-600 transition-all duration-1000 delay-200 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Star
                className="inline-block text-yellow-400 mr-2"
                size={20}
                style={{ animation: 'bounce 2s infinite' }}
              />
              Discover how our Hindi medium approach leads to JEE success!
            </p>
          </div>

          <div
            className={`relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 delay-300 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ animation: isVisible ? 'pulseGlow 2s infinite' : 'none' }}
          >
            {!isPlaying ? (
              <div className="relative">
                <img
                  src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
                  alt="Video thumbnail"
                  className="w-full h-auto rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center rounded-xl">
                  <button
                    onClick={handlePlayVideo}
                    className="text-white bg-indigo-600 rounded-full p-4 sm:p-5 transform transition-all duration-300 hover:scale-110 hover:bg-indigo-700 focus:outline-none"
                  >
                    <PlayCircle size={48} sm={64} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative w-full" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Course Overview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          <div
            className={`mt-8 sm:mt-12 text-center transition-all duration-1000 delay-500 ease-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ animation: isVisible ? 'fadeInUp 1s ease-out' : 'none' }}
          >
            <p className="text-gray-500 italic text-sm sm:text-base flex items-center justify-center">
              <Quote className="text-indigo-500 mr-2" size={20} />
              "Our step-by-step Hindi medium approach has empowered thousands to ace JEE with top ranks."
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoSection;
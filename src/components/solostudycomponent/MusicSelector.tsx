import React from 'react';
import { X, Play, Pause } from 'lucide-react';

interface MusicSelectorProps {
  currentMusic: string | null;
  onSelect: (music: string | null) => void;
  onClose: () => void;
}

const musicOptions = [
  {
    id: 'rain',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-2393.mp3',
    name: 'Rain Sounds'
  },
  {
    id: 'forest',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-forest-stream-ambience-loop-2316.mp3',
    name: 'Forest Ambience'
  },
  {
    id: 'cafe',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-coffee-shop-ambience-612.mp3',
    name: 'Cafe Ambience'
  },
  {
    id: 'lofi',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-lo-fi-01-621.mp3',
    name: 'Lo-Fi Beats'
  },
  {
    id: 'piano',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-piano-ballad-483.mp3',
    name: 'Calm Piano'
  },
  {
    id: 'meditation',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-meditation-bell-595.mp3',
    name: 'Meditation'
  },
];

const MusicSelector: React.FC<MusicSelectorProps> = ({ currentMusic, onSelect, onClose }) => {
  const [previewMusic, setPreviewMusic] = React.useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Handle preview playback
  React.useEffect(() => {
    if (audioRef.current) {
      if (previewMusic) {
        audioRef.current.src = previewMusic;
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(e => {
          console.log("Trying to play audio:", previewMusic);
          console.error("Audio preview failed:", e);
        });
      } else {
        audioRef.current.pause();
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [previewMusic]);

  const togglePreview = (url: string) => {
    if (previewMusic === url) {
      setPreviewMusic(null);
    } else {
      setPreviewMusic(url);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Select Background Music</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="space-y-3">
            <div 
              className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${currentMusic === null ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
              onClick={() => {
                setPreviewMusic(null);
                onSelect(null);
              }}
            >
              <span className="font-medium">No Music</span>
              {currentMusic === null && <span className="text-blue-600 text-sm">Selected</span>}
            </div>
            
            {musicOptions.map((music) => (
              <div 
                key={music.id}
                className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${currentMusic === music.url ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
              >
                <div className="flex items-center">
                  <button 
                    className="mr-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                    onClick={() => togglePreview(music.url)}
                  >
                    {previewMusic === music.url ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <span className="font-medium">{music.name}</span>
                </div>
                
                <button 
                  className={`px-3 py-1 rounded-md ${currentMusic === music.url ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => onSelect(music.url)}
                >
                  {currentMusic === music.url ? 'Selected' : 'Select'}
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-2">Or enter a custom audio URL:</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="https://example.com/audio.mp3"
                className="flex-1 border rounded-md px-3 py-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSelect((e.target as HTMLInputElement).value);
                    onClose();
                  }
                }}
              />
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={(e) => {
                  const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                  if (input.value) {
                    onSelect(input.value);
                    onClose();
                  }
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        
        {/* Hidden audio element for preview */}
        <audio ref={audioRef} />
      </div>
    </div>
  );
};

export default MusicSelector;
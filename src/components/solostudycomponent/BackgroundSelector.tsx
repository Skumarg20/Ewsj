import React from 'react';
import { X } from 'lucide-react';

interface BackgroundSelectorProps {
  currentBackground: string;
  onSelect: (background: string) => void;
  onClose: () => void;
}

const backgrounds = [
  {
    id: 'nature',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Mountain Lake'
  },
  {
    id: 'forest',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Forest'
  },
  {
    id: 'beach',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
    name: 'Beach'
  },
  {
    id: 'night',
    url: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    name: 'Night Sky'
  },
  {
    id: 'cafe',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1978&q=80',
    name: 'Cafe'
  },
  {
    id: 'library',
    url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80',
    name: 'Library'
  },
];

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ currentBackground, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Select Background</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {backgrounds.map((bg) => (
            <div 
              key={bg.id}
              className={`relative cursor-pointer rounded-lg overflow-hidden h-40 transition-all ${currentBackground === bg.url ? 'ring-4 ring-blue-500' : 'hover:opacity-90'}`}
              onClick={() => onSelect(bg.url)}
            >
              <img 
                src={bg.url} 
                alt={bg.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
                {bg.name}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Or enter a custom image URL:</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="https://example.com/image.jpg"
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
    </div>
  );
};

export default BackgroundSelector;
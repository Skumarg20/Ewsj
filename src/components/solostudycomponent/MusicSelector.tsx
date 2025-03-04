"use client";
import React, { useState } from "react";
import { X, Music, BookOpen, Coffee, Leaf, Headphones } from "lucide-react";
import { motion } from "framer-motion";

interface MusicSelectorProps {
  currentMusic: string | null;
  onSelect: (music: string | null) => void;
  onClose: () => void;
}

const musicOptions = [
  { id: "rain", url: "https://ewsj12.s3.ap-south-1.amazonaws.com/rain.mp3", name: "Rain Sounds", icon: <BookOpen size={20} /> },
  { id: "forest", url: "https://ewsj12.s3.ap-south-1.amazonaws.com/lofi-study+clam.mp3", name: "Study Calm", icon: <Leaf size={20} /> },
  { id: "cafe", url: "https://ewsj12.s3.ap-south-1.amazonaws.com/close-study-relax-chillhop-calm-study-lofi-123089.mp3", name: "Cafe Ambience", icon: <Coffee size={20} /> },
  { id: "lofi", url: "https://ewsj12.s3.ap-south-1.amazonaws.com/lofi-study-beat-4-245775.mp3", name: "Lo-Fi Beats", icon: <Headphones size={20} /> },
  
];

const MusicSelector: React.FC<MusicSelectorProps> = ({ currentMusic, onSelect, onClose }) => {
  const [customUrl, setCustomUrl] = useState("");

  const handleSelectAndClose = (musicUrl: string|null) => {
    onSelect(musicUrl); // Trigger music playback in SoloStudy
    onClose(); // Close the selector
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl border border-white/20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/30 flex justify-between items-center bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-2xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Music className="w-6 h-6 animate-pulse" /> Study Vibes
          </h2>
          <motion.button
            whileHover={{ rotate: 90 }}
            onClick={onClose}
            className="p-1 rounded-full bg-white/20 hover:bg-white/40 transition-all"
          >
            <X size={24} className="text-white" />
          </motion.button>
        </div>

        {/* Music Options */}
        <div className="p-4">
          <div className="space-y-3">
            {/* No Music Option */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${currentMusic === null ? "bg-blue-100" : "bg-white/80 hover:bg-gray-100"} shadow-md`}
              onClick={() => handleSelectAndClose(null)}
            >
              <span className="font-medium text-gray-700 flex items-center gap-2">
                <Headphones className="w-5 h-5 text-gray-500" /> No Music
              </span>
              {currentMusic === null && <span className="text-blue-600 text-sm font-semibold">Selected</span>}
            </motion.div>

            {/* Music List */}
            {musicOptions.map((music) => (
              <motion.div
                key={music.id}
                whileHover={{ scale: 1.02 }}
                className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${currentMusic === music.url ? "bg-blue-100" : "bg-white/80 hover:bg-gray-100"} shadow-md`}
                onClick={() => handleSelectAndClose(music.url)}
              >
                <span className="font-medium text-gray-700 flex items-center gap-2">
                  {music.icon}
                  {music.name}
                </span>
                {currentMusic === music.url && <span className="text-blue-600 text-sm font-semibold">Selected</span>}
              </motion.div>
            ))}
          </div>

          {/* Custom URL Input */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <Music className="w-4 h-4" /> Or vibe with your own tune:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://example.com/audio.mp3"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white/80 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && customUrl) {
                    handleSelectAndClose(customUrl);
                  }
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                onClick={() => {
                  if (customUrl) {
                    handleSelectAndClose(customUrl);
                  }
                }}
              >
                Apply
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MusicSelector;
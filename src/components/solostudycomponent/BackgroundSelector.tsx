"use client";
import React, { useState } from "react";
import { X, Image as ImageIcon, BookOpen, Leaf, Coffee, Moon, Armchair, Library } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface BackgroundSelectorProps {
  currentBackground: string;
  onSelect: (background: string) => void;
  onClose: () => void;
}

const backgrounds = [
  { id: "nature", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", name: "Mountain Lake", icon: <BookOpen size={20} /> },
  { id: "forest", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", name: "Forest", icon: <Leaf size={20} /> },
  { id: "beach", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80", name: "Beach", icon: <Coffee size={20} /> },
  { id: "night", url: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80", name: "Night Sky", icon: <Moon size={20} /> },
  { id: "cafe", url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1978&q=80", name: "Cafe", icon: <Armchair size={20} /> },
  { id: "library", url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=2090&q=80", name: "Library", icon: <Library size={20} /> },
];

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ currentBackground, onSelect, onClose }) => {
  const [customUrl, setCustomUrl] = useState("");

  const handleCustomUrlApply = () => {
    if (customUrl) {
      try {
        new URL(customUrl);
        onSelect(customUrl);
        onClose();
      } catch (e) {
        console.error("Invalid URL:", customUrl);
        alert("Please enter a valid image URL.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl border border-white/20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b border-white/30 flex justify-between items-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 animate-bounce" /> Pick Your Study Vibe
          </h2>
          <motion.button
            whileHover={{ rotate: 90 }}
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-all"
          >
            <X size={24} className="text-white" />
          </motion.button>
        </div>

        <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {backgrounds.map((bg) => (
            <motion.div
              key={bg.id}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className={`relative cursor-pointer rounded-lg overflow-hidden h-40 transition-all ${
                currentBackground === bg.url ? "ring-4 ring-blue-500" : "hover:opacity-90"
              }`}
              onClick={() => onSelect(bg.url)}
            >
              <Image
                src={bg.url}
                alt={bg.name}
                width={320}
                height={160}
                className="w-full h-full object-cover rounded-lg"
                unoptimized={false}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-semibold text-lg flex items-center gap-2">
                  {bg.icon} {bg.name}
                </span>
              </div>
              {currentBackground === bg.url && (
                <motion.div
                  className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-semibold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Selected
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="p-6 border-t border-white/30 bg-white/80">
          <p className="text-sm text-gray-600 mb-3 flex items-center gap-2 font-semibold">
            <ImageIcon className="w-5 h-5 text-purple-500" /> Drop Your Own Vibe:
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-white/90 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all text-gray-700 placeholder-gray-400"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCustomUrlApply();
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              onClick={handleCustomUrlApply}
            >
              Apply ✨
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BackgroundSelector;
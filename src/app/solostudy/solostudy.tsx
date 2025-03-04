"use client";
import React, { useRef, useState, useEffect, useCallback } from "react"; // Add useCallback import
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Maximize,
  Minimize,
  Clock,
  Coffee,
  Sun,
  Star,
  BookOpen,
  Headphones,
} from "lucide-react";
import BackgroundSelector from "@/components/solostudycomponent/BackgroundSelector";
import MusicSelector from "@/components/solostudycomponent/MusicSelector";
import SettingsPanel from "@/components/solostudycomponent/SettingsPanel";

type Mode = "pomodoro" | "shortBreak" | "longBreak";

interface Settings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

const SoloStudy: React.FC = () => {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMusicSelector, setShowMusicSelector] = useState(false);
  const [showBackgroundSelector, setShowBackgroundSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const defaultBackground =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
  const [background, setBackground] = useState<string>(defaultBackground);
  const [music, setMusic] = useState<string | null>(null);

  const [settings, setSettings] = useState<Settings>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false,
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Wrap handleTimerEnd in useCallback
  const handleTimerEnd = useCallback(() => {
    setIsActive(false);
    if (mode === "pomodoro") {
      setCompletedPomodoros((prev) => prev + 1);
      if ((completedPomodoros + 1) % 4 === 0) {
        setMode("longBreak");
        setTimeLeft(settings.longBreak * 60);
        if (settings.autoStartBreaks) setIsActive(true);
      } else {
        setMode("shortBreak");
        setTimeLeft(settings.shortBreak * 60);
        if (settings.autoStartBreaks) setIsActive(true);
      }
    } else {
      setMode("pomodoro");
      setTimeLeft(settings.pomodoro * 60);
      if (settings.autoStartPomodoros) setIsActive(true);
    }
  }, [mode, completedPomodoros, settings]); // Dependencies for handleTimerEnd

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      handleTimerEnd();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, handleTimerEnd]); // Simplified dependency array

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (music) {
      audio.src = music;
      audio.loop = true;
      audio.volume = 0.5;
      audio.play().catch((e) => console.error("Audio play failed:", e));
    } else {
      audio.pause();
    }
  }, [music]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(
      mode === "pomodoro"
        ? settings.pomodoro * 60
        : mode === "shortBreak"
        ? settings.shortBreak * 60
        : settings.longBreak * 60
    );
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      appRef.current?.requestFullscreen().catch((err) => {
        console.error("Fullscreen request failed:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Exit fullscreen failed:", err);
      });
      setIsFullscreen(false);
    }
  };

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    setTimeLeft(
      mode === "pomodoro"
        ? newSettings.pomodoro * 60
        : mode === "shortBreak"
        ? newSettings.shortBreak * 60
        : newSettings.longBreak * 60
    );
    setShowSettings(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMusicSelect = (selectedMusic: string | null) => {
    if (selectedMusic) {
      setMusic(selectedMusic);
      setShowMusicSelector(false);
    }
  };

  if (!isClient) return null;

  return (
    <div
      ref={appRef}
      className="min-h-screen flex items-center justify-center transition-all duration-500"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        className="bg-gradient-to-br from-black/80 to-gray-900/80 p-6 md:p-8 rounded-2xl backdrop-blur-md text-white w-full max-w-md shadow-xl border border-white/20"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
            <BookOpen className="w-8 h-8 animate-pulse" /> Study Flow
          </h1>
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowBackgroundSelector(true)}
              className="p-2 rounded-full bg-white/20 hover:bg-purple-500 transition-colors"
              title="Change Background"
            >
              <BookOpen size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowMusicSelector(true)}
              className="p-2 rounded-full bg-white/20 hover:bg-blue-500 transition-colors"
              title="Select Music"
            >
              <Headphones size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-white/20 hover:bg-teal-500 transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </motion.button>
          </div>
        </div>

        <div className="flex justify-center space-x-3 mb-8">
          <motion.button
            onClick={() => {
              setMode("pomodoro");
              setTimeLeft(settings.pomodoro * 60);
              setIsActive(false);
            }}
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
              mode === "pomodoro" ? "bg-purple-500 text-white" : "bg-white/20 text-white hover:bg-purple-400/50"
            }`}
          >
            <Clock size={18} /> Study
          </motion.button>
          <motion.button
            onClick={() => {
              setMode("shortBreak");
              setTimeLeft(settings.shortBreak * 60);
              setIsActive(false);
            }}
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
              mode === "shortBreak" ? "bg-blue-500 text-white" : "bg-white/20 text-white hover:bg-blue-400/50"
            }`}
          >
            <Coffee size={18} /> Chill
          </motion.button>
          <motion.button
            onClick={() => {
              setMode("longBreak");
              setTimeLeft(settings.longBreak * 60);
              setIsActive(false);
            }}
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
              mode === "longBreak" ? "bg-teal-500 text-white" : "bg-white/20 text-white hover:bg-teal-400/50"
            }`}
          >
            <Sun size={18} /> Relax
          </motion.button>
        </div>

        <div className="text-center mb-10">
          <motion.div
            className="text-7xl md:text-9xl font-extrabold text-white drop-shadow-lg"
            animate={{ scale: isActive ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
          >
            {formatTime(timeLeft)}
          </motion.div>
          <div className="flex justify-center space-x-4 mt-6">
            <motion.button
              onClick={toggleTimer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              {isActive ? <Pause size={20} /> : <Play size={20} />}
              {isActive ? "Pause" : "Start"}
            </motion.button>
            <motion.button
              onClick={resetTimer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white/30 transition-all"
            >
              <RotateCcw size={20} /> Reset
            </motion.button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <motion.button
            onClick={() => setShowSettings(true)}
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 px-4 py-2 rounded-xl text-white font-semibold hover:bg-purple-500/50 transition-all flex items-center gap-2"
          >
            <Settings size={20} /> Settings
          </motion.button>
          <div className="text-right flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
            <p className="text-sm opacity-80">
              Wins: <span className="font-bold text-yellow-400">{completedPomodoros}</span>
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showBackgroundSelector && (
          <BackgroundSelector
            currentBackground={background}
            onSelect={setBackground}
            onClose={() => setShowBackgroundSelector(false)}
          />
        )}
        {showMusicSelector && (
          <MusicSelector
            currentMusic={music}
            onSelect={handleMusicSelect}
            onClose={() => setShowMusicSelector(false)}
          />
        )}
        {showSettings && (
          <SettingsPanel
            settings={settings}
            onSave={updateSettings}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>

      <audio ref={audioRef} />
    </div>
  );
};

export default SoloStudy;
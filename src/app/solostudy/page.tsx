'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Music, Maximize, Minimize, Play, Pause, RotateCcw, Settings } from 'lucide-react';
import BackgroundSelector from '@/components/solostudycomponent/BackgroundSelector';
import MusicSelector from '@/components/solostudycomponent/MusicSelector';
import SettingsPanel from '@/components/solostudycomponent/SettingsPanel';

type Mode = 'pomodoro' | 'shortBreak' | 'longBreak';

interface Settings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

const SoloStudy: React.FC = () => {
  const [mode, setMode] = useState<Mode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isActive, setIsActive] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMusicSelector, setShowMusicSelector] = useState(false);
  const [showBackgroundSelector, setShowBackgroundSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [background, setBackground] = useState<string>(
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  );
  const [music, setMusic] = useState<string | null>(null);

  const [settings, setSettings] = useState<Settings>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const appRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    switch (mode) {
      case 'pomodoro':
        setTimeLeft(settings.pomodoro * 60);
        break;
      case 'shortBreak':
        setTimeLeft(settings.shortBreak * 60);
        break;
      case 'longBreak':
        setTimeLeft(settings.longBreak * 60);
        break;
    }
  }, [mode, settings]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (mode === 'pomodoro') {
        setCompletedPomodoros((prev) => prev + 1);
        if ((completedPomodoros + 1) % 4 === 0) {
          setMode('longBreak');
          setIsActive(settings.autoStartBreaks);
        } else {
          setMode('shortBreak');
          setIsActive(settings.autoStartBreaks);
        }
      } else {
        setMode('pomodoro');
        setIsActive(settings.autoStartPomodoros);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, completedPomodoros, settings]);

  // Fixed music player useEffect
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (music && isActive) {
        audio.src = music;
        audio.loop = true;
        audio.volume = 0.5;
        audio.play().catch((e) => {
          console.log('Trying to play audio:', music);
          console.error('Audio play failed:', e);
        });
      } else {
        audio.pause();
      }
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [music, isActive]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      appRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    switch (mode) {
      case 'pomodoro':
        setTimeLeft(settings.pomodoro * 60);
        break;
      case 'shortBreak':
        setTimeLeft(settings.shortBreak * 60);
        break;
      case 'longBreak':
        setTimeLeft(settings.longBreak * 60);
        break;
    }
  };

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    setShowSettings(false);

    switch (mode) {
      case 'pomodoro':
        setTimeLeft(newSettings.pomodoro * 60);
        break;
      case 'shortBreak':
        setTimeLeft(newSettings.shortBreak * 60);
        break;
      case 'longBreak':
        setTimeLeft(newSettings.longBreak * 60);
        break;
    }
  };

  return (
    <div
      ref={appRef}
      className="min-h-screen flex flex-col items-center justify-center transition-all duration-500"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-xl backdrop-blur-sm text-white w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowBackgroundSelector(true)}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              title="Change Background"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={() => setShowMusicSelector(true)}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              title="Select Music"
            >
              <Music size={20} />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-6">
          <button
            onClick={() => setMode('pomodoro')}
            className={`px-4 py-2 rounded-md transition-colors ${
              mode === 'pomodoro' ? 'bg-white text-black' : 'bg-white bg-opacity-20'
            }`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => setMode('shortBreak')}
            className={`px-4 py-2 rounded-md transition-colors ${
              mode === 'shortBreak' ? 'bg-white text-black' : 'bg-white bg-opacity-20'
            }`}
          >
            Short Break
          </button>
          <button
            onClick={() => setMode('longBreak')}
            className={`px-4 py-2 rounded-md transition-colors ${
              mode === 'longBreak' ? 'bg-white text-black' : 'bg-white bg-opacity-20'
            }`}
          >
            Long Break
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="text-8xl font-bold mb-6">{formatTime(timeLeft)}</div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleTimer}
              className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center justify-center hover:bg-opacity-90 transition-colors"
            >
              {isActive ? <Pause size={20} className="mr-2" /> : <Play size={20} className="mr-2" />}
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTimer}
              className="bg-white bg-opacity-20 px-6 py-3 rounded-full font-bold flex items-center justify-center hover:bg-opacity-30 transition-colors"
            >
              <RotateCcw size={20} className="mr-2" />
              Reset
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={() => setShowSettings(true)}
              className="bg-white bg-opacity-20 px-4 py-2 rounded-md hover:bg-opacity-30 transition-colors"
            >
              Settings
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">
              Completed: <span className="font-bold">{completedPomodoros}</span>
            </p>
          </div>
        </div>
      </div>

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
          onSelect={setMusic}
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

      <audio ref={audioRef} />
    </div>
  );
};

export default SoloStudy;
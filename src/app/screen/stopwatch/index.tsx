'use client';
import React, { useEffect, useState } from 'react';
import { LuTimerReset } from "react-icons/lu";
import { RiResetLeftLine } from "react-icons/ri";
import { CgSandClock } from "react-icons/cg";

type TimerProps = {
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    isRunning: boolean;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
};

type TimeObject = {
    hours: number,
    minutes: number,
    seconds: number
};

export default function Stopwatch({ time, setTime, isRunning, setIsRunning }: TimerProps) {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isTimerMode, setTimerMode] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning) {
            timer = setInterval(() => {
                setTime(prev => {
                    if (isTimerMode) {
                        const newTime = prev - 1000;
                        if (newTime <= 0) {
                            setIsRunning(false);
                            return 0;
                        }
                        return newTime;
                    }
                    return prev + 1000;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, isTimerMode]);

    const formatTime = (time: number) => {
        const seconds = Math.floor(time / 1000) % 60;
        const minutes = Math.floor(time / 60000) % 60;
        const hours = Math.floor(time / 3600000);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
        setTime(totalMilliseconds);
        setTimerMode(true);
        setIsRunning(true);
        setIsVisible(false);
    };

    const toggleFormAndTimer = () => {
        setIsVisible(!isVisible);
      
    };

    return (
        <div className="flex flex-col items-center justify-center bg-slate-100 text-gray-800 p-6 rounded-lg shadow-lg h-full w-full">
            <div className="w-full h-[60%] flex items-center justify-center text-[22vw] font-bold leading-none whitespace-nowrap">
                {formatTime(time)}
            </div>
    
            {isVisible && (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3 justify-center">
            <div className="flex items-center space-x-1">
                <input
                    type="number"
                    name="hours"
                    value={hours}
                    onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                    className={`w-16 px-1 py-1 mr-0 border rounded-3xl text-center bg-slate-200 font-bold transition-colors ${
                        hours > 0 ? "text-blue-600 border-blue-400" : "text-gray-700 border-blue-400"
                    }`}
                    min="0"
                    placeholder="0"
                    disabled={isRunning}
                />
                <span className={`text-lg font-semibold transition-colors ${hours > 0 ? "text-blue-600" : "text-gray-800"}`}>
                    <sub>hr</sub>
                </span>
            </div>

            <div className="flex items-center space-x-1">
                <input
                    type="number"
                    name="minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                    className={`w-16 px-1 py-1 mr-0 border rounded-3xl text-center bg-slate-200 font-bold transition-colors ${
                        minutes > 0 ? "text-blue-600 border-blue-400" : "text-gray-700 border-blue-400"
                    }`}
                    min="0"
                    max="59"
                    placeholder="0"
                    disabled={isRunning}
                />
                <span className={`text-lg font-semibold transition-colors ${minutes > 0 ? "text-blue-600" : "text-gray-800"}`}>
                    <sub>m</sub>
                </span>
            </div>

            <div className="flex items-center space-x-1">
                <input
                    type="number"
                    name="seconds"
                    value={seconds}
                    onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                    className={`w-16 px-1 py-1 mr-0 border rounded-3xl text-center bg-slate-200 font-bold transition-colors ${
                        seconds > 0 ? "text-blue-600 border-blue-400" : "text-gray-700 border-blue-400"
                    }`}
                    min="0"
                    max="59"
                    placeholder="0"
                    disabled={isRunning}
                />
                <span className={`text-lg font-semibold transition-colors ${seconds > 0 ? "text-blue-600" : "text-gray-800"}`}>
                    <sub>s</sub>
                </span>
            </div>
        </div>

        {/* Submit Button */}
        <button 
            type="submit"
            className="w-full py-2 mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-3xl transition-all duration-300 ease-in-out"
        >
            Submit
        </button>
    </form>
)}    
    
            <div className="flex flex-col gap-4 mt-6 w-[30%]">
                <div className="flex justify-between w-full">
                    <button 
                        onClick={() => setIsRunning(!isRunning)} 
                        className={`px-5 py-3 rounded-3xl transition-all duration-300 shadow-md ${
                           ( isRunning && !isTimerMode)
                                ? "bg-red-600 hover:bg-red-700 shadow-red-500/50"
                                : "bg-green-600 hover:bg-green-700 shadow-green-500/50"
                        }`}
                    >
                        <LuTimerReset className="text-2xl text-white drop-shadow-lg" />
                       
                    </button>
    
                    <button 
                        onClick={() => { setTime(0); setIsRunning(false); setTimerMode(false) }} 
                        className="px-5 py-3 bg-blue-500 hover:bg-blue-600 rounded-3xl shadow-lg shadow-blue-500/50 transition-all duration-300"
                    >
                        
                        <RiResetLeftLine className="text-2xl text-white drop-shadow-lg" />
                        
                    </button>

    
                    <button 
                        onClick={toggleFormAndTimer}
                        className="px-5 py-3 bg-gray-700 hover:bg-gray-800 rounded-3xl shadow-lg shadow-gray-500/50 transition-all duration-300"
                    >
                        
                        <CgSandClock className="text-2xl text-white drop-shadow-lg" />
                       
                    </button>
                </div>
            </div>
        </div>
    );
    
}
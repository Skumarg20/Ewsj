'use client'
import React, { useState, useEffect, useRef } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { 
  Clock, 
  BookOpen, 
  CheckCircle, 
  GraduationCap,
  ScrollText,
  Quote,
  Target,
  BarChart3,
  Hourglass,
  Timer,
  Brain
} from 'lucide-react';
import { StudyPlanInterface, StudySession } from '@/interface/studysession';

function TimeBlock({ session, onStartSession }: { session: StudySession; onStartSession: (duration: number) => void }) {
  const getSubjectColor = (subject: string) => {
    const colors = {
      'Physics': 'from-blue-500 to-cyan-500',
      'Chemistry': 'from-purple-500 to-pink-500',
      'Maths': 'from-green-500 to-emerald-500',
      'Break': 'from-gray-400 to-gray-500',
      'Revision': 'from-amber-500 to-orange-500',
    };
    return colors[subject as keyof typeof colors] || 'from-indigo-500 to-violet-500';
  };

  const getSubjectBg = (subject: string) => {
    const colors = {
      'Physics': 'bg-blue-50 border-blue-200 text-blue-700',
      'Chemistry': 'bg-purple-50 border-purple-200 text-purple-700',
      'Maths': 'bg-green-50 border-green-200 text-green-700',
      'Break': 'bg-gray-50 border-gray-200 text-gray-700',
      'Revision': 'bg-amber-50 border-amber-200 text-amber-700',
    };
    return colors[subject as keyof typeof colors] || 'bg-indigo-50 border-indigo-200 text-indigo-700';
  };

  const calculateDuration = (timeRange: string): number => {
   
    const [start, end] = timeRange.split('-');
    
    const getHours = (time: string): number => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours + (minutes / 60);
    };
    
    const startHours = getHours(start);
    const endHours = getHours(end);
  
    return endHours - startHours; 
};

  return (
    <div className="relative pl-8 pb-8 group">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 to-purple-200"></div>
      <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gradient-to-r ${getSubjectColor(session.subject)} shadow-lg
        transform transition-transform duration-300 group-hover:scale-125`}></div>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
        <div className={`h-1.5 bg-gradient-to-r ${getSubjectColor(session.subject)}`} />
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSubjectBg(session.subject)}`}>
              {session.subject}
            </span>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{session.time}</span>
            </div>
          </div>
          <div className="space-y-3">
            {session.topic && (
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                <p className="text-sm font-medium text-gray-800">{session.topic}</p>
              </div>
            )}
            <div className="flex items-start gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-600">{session.activity}</p>
            </div>
            {session.notes && (
              <div className="flex items-start gap-2">
                <ScrollText className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-600">{session.notes}</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            {session.completed ? (
              <span className="text-green-600 flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4" />
                Completed
              </span>
            ) : (
              <button
                onClick={() => onStartSession(calculateDuration(session.time))}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1.5 rounded-lg 
                flex items-center gap-2 text-sm hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
              >
                <Timer className="w-4 h-4" />
                Start Session
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewAnalysisTimetable({ data }: { data: StudyPlanInterface }) {
  const [timerVisible, setTimerVisible] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0); // Time left in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Start the timer with the given duration (in hours)
  const startTimer = (duration: number): void => {
    setTimeLeft(duration * 3600); // Convert hours to seconds
    setIsRunning(true);
    setTimerVisible(true);
  };

  // Countdown logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [isRunning, timeLeft]);

  // Format time left into HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Sort the schedule based on the start time of the time range
  const sortedSchedule = data.schedule.sort((a: StudySession, b: StudySession) => {
    const getStartTime = (timeRange: string): number => {
      const [start] = timeRange.split('-').map(Number);
      return start;
    };
    return getStartTime(a.time) - getStartTime(b.time);
  });

  const stats = [
    {
      icon: <Target className="w-6 h-6 text-blue-600" />,
      label: "Study Hours",
      value: data.study_hours,
      bg: "bg-blue-50",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
      label: "Completion Rate",
      value: `${parseFloat(data.completion_rate)}%`,
      bg: "bg-purple-50",
    },
    {
      icon: <Hourglass className="w-6 h-6 text-emerald-600" />,
      label: "Time Spent",
      value: `${data.total_time_spent}h`,
      bg: "bg-emerald-50",
    },
  ];

  // Draggable Timer Component (Integrated)
  const DraggableTimer = () => {
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 4 }); // Initial y: 4px from top
    const dragRef = useRef<HTMLDivElement | null>(null);

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: 'timer',
    });

    // Set initial position to center horizontally when component mounts
    useEffect(() => {
      const node = dragRef.current;
      if (node) {
        const rect = node.getBoundingClientRect();
        setPosition({
          x: window.innerWidth / 2 - rect.width / 2, // Center horizontally
          y: 4, // 4px from top
        });
      }
    }, []);

    const style: React.CSSProperties = {
      position: 'fixed',
      left: `${position.x}px`,
      top: `${position.y}px`,
      transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : 'translate(0px, 0px)',
      zIndex: 50,
    };

    return (
      <div
        ref={(node: HTMLDivElement | null) => {
          setNodeRef(node);
          dragRef.current = node;
        }}
        style={style}
        {...listeners}
        {...attributes}
        className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-4 flex items-center gap-3 cursor-move"
      >
        <Timer className="w-6 h-6 text-indigo-600" />
        <span className="text-xl font-bold text-gray-800">{formatTime(timeLeft)}</span>
      </div>
    );
  };

  return (
    <DndContext>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8 px-4">
        {/* Draggable Timer */}
        {timerVisible && <DraggableTimer />}

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
              {data.title}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              {data.description}
            </p>

            {/* Quote */}
            <blockquote className="relative p-6 mb-8">
              <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4">
                <Quote className="w-8 h-8 text-indigo-300" />
              </div>
              <p className="text-lg text-gray-700 italic">
                {data.quote}
              </p>
            </blockquote>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                  <div className={`${stat.bg} w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <Brain className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">Today's Schedule</h2>
            </div>

            <div className="space-y-0">
              {sortedSchedule.map((session) => (
                <TimeBlock key={session.id} session={session} onStartSession={startTimer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default ViewAnalysisTimetable;
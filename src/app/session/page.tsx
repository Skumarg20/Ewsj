'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { 
  Clock, 
  BookOpen, 
  CheckCircle, 
  Calendar, 
  ArrowRight,
  GraduationCap,
  Timer,
  ScrollText
} from 'lucide-react';


import { StudySession } from '@/interface/studysession';
import withAuth from '@/lib/withAuth';
import useStudyPlanStore from '@/state/store/timetablestore';
import {useLoading} from '@/app/loader/context/loadingprovider'
const parseTimeString = (timeStr: string) => {
  const [time, period] = timeStr.trim().split(' ');
  const [hours, minutes] = time.split(':');
  let hour = parseInt(hours);
  
  // Convert to 24-hour format
  if (period === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period === 'AM' && hour === 12) {
    hour = 0;
  }
  
  const date = new Date();
  date.setHours(hour, parseInt(minutes), 0, 0);
  return date;
};

const parseTimeRange = (timeRange: string) => {
  const [startStr, endStr] = timeRange.split(' - ');
  return {
    start: parseTimeString(startStr),
    end: parseTimeString(endStr)
  };
};

export function StudySessionCard({ session, updateSession }: { session: StudySession & { status: 'current' | 'upcoming' | 'past' }, updateSession: (id: string, data: Partial<StudySession>, setLoading: (loading: boolean) => void) => Promise<void> }) {
  const [currentSession, setCurrentSession] = useState(session);
  const [loading, setLoading] = useState(false);

  const statusColors = {
    current: 'from-green-500 to-emerald-600',
    upcoming: 'from-blue-500 to-indigo-600',
    past: 'from-purple-500 to-pink-600',
  };

  const statusBg = {
    current: 'bg-green-50 text-green-700 border-green-200',
    upcoming: 'bg-blue-50 text-blue-700 border-blue-200',
    past: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const handleMarkComplete = async () => {
    const newStatus = !currentSession.completed;
    setCurrentSession({ ...currentSession, completed: newStatus });

    try {
      await updateSession(currentSession.id, { completed: newStatus }, setLoading);
    } catch (error) {
      console.error("Failed to update session:", error);
      setCurrentSession({ ...currentSession, completed: !newStatus }); // Revert on failure
    }
  };

  return (
    <div className={`p-6 rounded-xl shadow-sm border ${statusBg[session.status]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${statusBg[session.status]}`}>
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{session.subject}</h3>
            <p className="text-sm text-gray-600">{session.topic}</p>
          </div>
        </div>
        <button
          onClick={handleMarkComplete}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${currentSession.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
        >
          {currentSession.completed ? 'Completed' : 'Mark Complete'}
        </button>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>{session.activity}</p>
        {session.notes && <p className="mt-2 text-gray-500">Notes: {session.notes}</p>}
      </div>
    </div>
  );
}

function StudySessions() {
  const {getTimeTable} =useStudyPlanStore();
  const {setLoading}=useLoading();
  useEffect(() => {
    getTimeTable(setLoading); 
  }, []);
  const { currentStudyPlan, updateSession } = useStudyPlanStore();
  const { currentSession, upcomingSessions, pastSessions } = useMemo(() => {
    const now = new Date();
console.log(currentStudyPlan?.schedule,"this is scjhdvjdsbkfjv");
console.log(currentStudyPlan,"this is study plan");
    return (currentStudyPlan?.schedule || []).reduce<{
      currentSession: (StudySession & { status: 'current' }) | null;
      upcomingSessions: Array<StudySession & { status: 'upcoming' }>;
      pastSessions: Array<StudySession & { status: 'past' }>;
    }>(
      (acc, session) => {
        const { start, end } = parseTimeRange(session.time);

        if (start <= now && end >= now) {
          acc.currentSession = { ...session, status: 'current' };
        } else if (start > now) {
          acc.upcomingSessions.push({ ...session, status: 'upcoming' });
        } else {
          acc.pastSessions.push({ ...session, status: 'past' });
        }

        return acc;
      },
      { currentSession: null, upcomingSessions: [], pastSessions: [] }
    );
  }, [currentStudyPlan]);

  const stats = useMemo(
    () => ({
      totalSessions: currentStudyPlan?.schedule?.length || 0,
      completedSessions: currentStudyPlan?.schedule?.filter((s) => s.completed).length || 0,
      remainingSessions: currentStudyPlan?.schedule?.filter((s) => !s.completed).length || 0,
    }),
    [currentStudyPlan]
  );

  // Sort sessions by time
  upcomingSessions.sort(
    (a, b) => parseTimeRange(a.time).start.getTime() - parseTimeRange(b.time).start.getTime()
  );
  pastSessions.sort(
    (a, b) => parseTimeRange(b.time).start.getTime() - parseTimeRange(a.time).start.getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Today's Study Journey
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {stats.completedSessions} of {stats.totalSessions} sessions completed • {stats.remainingSessions} remaining
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Timer className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Current Session</h3>
              <p className="text-sm text-gray-600">
                {currentSession ? currentSession.subject : 'No active session'}
              </p>
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Upcoming Sessions</h3>
              <p className="text-sm text-gray-600">{upcomingSessions.length} sessions ahead</p>
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Past Sessions</h3>
              <p className="text-sm text-gray-600">{pastSessions.length} sessions </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {currentSession && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Session</h2>
              <StudySessionCard session={currentSession} updateSession={updateSession} />
            </div>
          )}

          {upcomingSessions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Sessions</h2>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <StudySessionCard key={session.id} session={session} updateSession={updateSession} />
                ))}
              </div>
            </div>
          )}

          {pastSessions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Past Sessions</h2>
              <div className="space-y-4">
                {pastSessions.map((session) => (
                  <StudySessionCard key={session.id} session={session} updateSession={updateSession} />
                ))}
              </div>
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
}

export default withAuth(StudySessions);
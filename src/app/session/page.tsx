// src/app/session/page.tsx
'use client';
import React, { useEffect, useMemo } from 'react';
import { CheckCircle, Calendar, Timer } from 'lucide-react';
import { StudySession } from '@/interface/studysession'; // Import shared interface
import withAuth from '@/lib/withAuth';
import useStudyPlanStore from '@/state/store/timetablestore';
import { useLoading } from '@/app/loader/context/loadingprovider';
import { StudySessionCard } from '@/components/StudySessionCard';

// Extend StudySession interface to include status
interface ExtendedStudySession extends StudySession {
  status: 'current' | 'upcoming' | 'past';
}

const parseTimeString = (timeStr: string, baseDate: Date) => {
  if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
    throw new Error(`Invalid time string: ${timeStr}. Expected format "HH:mm" (e.g., "14:00").`);
  }

  const [hours, minutes] = timeStr.trim().split(':');
  const hour = parseInt(hours);
  const minute = parseInt(minutes);

  if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    throw new Error(`Invalid time values in "${timeStr}". Hours must be 0-23, minutes 0-59.`);
  }

  const date = new Date(baseDate);
  date.setHours(hour, minute, 0, 0);
  return date;
};

const parseTimeRange = (timeRange: string, baseDate: Date) => {
  const [startStr, endStr] = timeRange.split('-');
  return {
    start: parseTimeString(startStr, baseDate),
    end: parseTimeString(endStr, baseDate),
  };
};

function StudySessions() {
  const { getTimeTable, currentStudyPlan, updateSession } = useStudyPlanStore();
  const { setLoading } = useLoading();

  useEffect(() => {
    getTimeTable(setLoading);
  }, [getTimeTable, setLoading]);

  const { currentSession, upcomingSessions, pastSessions } = useMemo(() => {
    const now = new Date();
    const planDate = currentStudyPlan?.date ? new Date(currentStudyPlan.date) : now;
    return (currentStudyPlan?.schedule || []).reduce<{
      currentSession: ExtendedStudySession | null;
      upcomingSessions: ExtendedStudySession[];
      pastSessions: ExtendedStudySession[];
    }>(
      (acc, session) => {
        try {
          const { start, end } = parseTimeRange(session.time, planDate);

          if (start <= now && end >= now) {
            acc.currentSession = { ...session, status: 'current' };
          } else if (start > now) {
            acc.upcomingSessions.push({ ...session, status: 'upcoming' });
          } else {
            acc.pastSessions.push({ ...session, status: 'past' });
          }
        } catch (error) {
          console.warn(
            `Skipping session ${session.id} due to invalid time: ${error}. Session data:`,
            session
          );
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

  upcomingSessions.sort(
    (a, b) =>
      parseTimeRange(a.time, new Date(currentStudyPlan?.date || Date.now())).start.getTime() -
      parseTimeRange(b.time, new Date(currentStudyPlan?.date || Date.now())).start.getTime()
  );
  pastSessions.sort(
    (a, b) =>
      parseTimeRange(b.time, new Date(currentStudyPlan?.date || Date.now())).start.getTime() -
      parseTimeRange(a.time, new Date(currentStudyPlan?.date || Date.now())).start.getTime()
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Today&apos;s Study Journey
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {stats.completedSessions} of {stats.totalSessions} sessions completed •{' '}
            {stats.remainingSessions} remaining
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
              <p className="text-sm text-gray-600">{pastSessions.length} sessions</p>
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
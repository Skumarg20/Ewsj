// src/components/StudySessionCard.tsx
'use client';
import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { StudySession } from '@/interface/studysession';
import { useLoading } from '@/app/loader/context/loadingprovider';

export function StudySessionCard({
  session,
  updateSession,
}: {
  session: StudySession & { status: 'current' | 'upcoming' | 'past' };
  updateSession: (
    id: string,
    data: Partial<StudySession>,
    setLoading: (loading: boolean) => void
  ) => Promise<void>;
}) {
  const [currentSession, setCurrentSession] = useState(session);
  const { setLoading } = useLoading();

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
      console.error('Failed to update session:', error);
      setCurrentSession({ ...currentSession, completed: !newStatus });
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
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentSession.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
          }`}
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
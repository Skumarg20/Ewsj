import React, { useMemo } from 'react';
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

// Sample data structure
const sessionsData = [
    {
        "id": "0a606f80-2830-45ce-80c4-304fd8e5be2f",
        "time": "7:30 AM - 8:00 AM",
        "subject": "Break",
        "topic": null,
        "activity": "Light exercise, breakfast",
        "notes": null,
        "completed": false
    },
    {
        "id": "10344c55-69a4-4ae2-8e1e-0073e0d17ccd",
        "time": "6:00 PM - 6:30 PM",
        "subject": "Break",
        "topic": null,
        "activity": "Dinner",
        "notes": null,
        "completed": false
    },
    {
        "id": "211c2986-3b1d-4e2f-bed9-d9b5451f6e0e",
        "time": "10:00 AM - 10:30 AM",
        "subject": "Break",
        "topic": null,
        "activity": "Short break, snack, light stretching",
        "notes": null,
        "completed": false
    },
    {
        "id": "5bda6a9d-d981-4f3a-919e-63e3d89ae7d2",
        "time": "3:30 PM - 4:00 PM",
        "subject": "Break",
        "topic": null,
        "activity": "Short break, light refreshments.",
        "notes": null,
        "completed": false
    },
    {
        "id": "632d8ea2-4b11-47d2-a70b-a51e0cff965a",
        "time": "7:30 PM - 8:00 PM",
        "subject": "Relax",
        "topic": null,
        "activity": "Relaxation activities like reading, listening to music.",
        "notes": null,
        "completed": false
    },
    {
        "id": "6389bdc5-ebaf-4a54-a5d3-aa70e783f2b5",
        "time": "1:30 PM - 3:30 PM",
        "subject": "Math",
        "topic": "Algebra - Quadratic Equations and Inequalities",
        "activity": "Solve problems from past years' papers. Focus on time management during problem-solving.",
        "notes": "Practice shortcut techniques",
        "completed": false
    },
    {
        "id": "6d216292-26fc-44ac-9ef8-fe9ac9d06104",
        "time": "12:30 PM - 1:30 PM",
        "subject": "Lunch Break",
        "topic": null,
        "activity": "Lunch and relaxation",
        "notes": null,
        "completed": false
    },
    {
        "id": "922e083b-cd55-47e1-b1fb-d4d45770876a",
        "time": "7:00 AM - 7:30 AM",
        "subject": "Math",
        "topic": "Calculus - Limits and Derivatives (Revision)",
        "activity": "Review key concepts and formulas. Solve 5-7 problems from previous year's papers.",
        "notes": "Focus on tricky parts",
        "completed": false
    },
    {
        "id": "bc8ceaee-eeaa-48d2-98d5-81688a08a7c6",
        "time": "10:30 AM - 12:30 PM",
        "subject": "Math",
        "topic": "Coordinate Geometry - Straight lines and Conics",
        "activity": "Solve a mix of easy and difficult problems. Try different approaches to solve problems. ",
        "notes": "Refer to the formula sheet and practice diagrams",
        "completed": false
    },
    {
        "id": "cd46030e-bdae-43da-ab87-1f135e999089",
        "time": "6:30 PM - 7:30 PM",
        "subject": "Math",
        "topic": "Review of the day's topics",
        "activity": "Revise concepts and formulas learned throughout the day. Identify any weak areas.",
        "notes": "Focus on areas where you struggled",
        "completed": false
    },
    {
        "id": "d2805d85-39f7-44da-bc37-f08886b7677a",
        "time": "8:00 AM - 10:00 AM",
        "subject": "Math",
        "topic": "Calculus - Integration",
        "activity": "Solve problems from a standard textbook or coaching material. Focus on application of integration techniques.",
        "notes": "Pay attention to integration by parts and partial fractions",
        "completed": false
    },
    {
        "id": "ff9d7a44-6e1e-4f64-ae85-d6b83de1b112",
        "time": "4:00 PM - 6:00 PM",
        "subject": "Math",
        "topic": "Calculus - Application of Derivatives",
        "activity": "Solve mixed problems covering various applications.",
        "notes": "Focus on word problems and applications to real-world scenarios",
        "completed": false
    }
];

// Helper function to parse time string into Date object
const parseTime = (timeStr: string) => {
  const [startTime] = timeStr.split(' - ');
  const [hours, minutes] = startTime.split(':');
  const [time, period] = hours.split(' ');
  
  const date = new Date();
  let hour = parseInt(time);
  
  if (period === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period === 'AM' && hour === 12) {
    hour = 0;
  }
  
  date.setHours(hour, parseInt(minutes));
  return date;
};

function StudySessionCard({ session }: { session: typeof sessionsData[0] & { status: 'current' | 'upcoming' | 'past' } }) {
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

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className={`h-2 bg-gradient-to-r ${statusColors[session.status]}`} />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBg[session.status]} border`}>
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{session.time}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{session.subject}</h3>
              {session.topic && (
                <p className="text-indigo-600 font-medium flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {session.topic}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            {session.notes && (
              <div className="flex items-center gap-2 text-gray-600">
                <ScrollText className="w-4 h-4" />
                <p className="text-sm">{session.notes}</p>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600">
              <GraduationCap className="w-4 h-4" />
              <p className="text-sm">{session.activity}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Today</span>
            </div>
            {!session.completed ? (
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
                <CheckCircle className="w-4 h-4" />
                Mark Complete
              </button>
            ) : (
              <span className="text-green-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudySessions() {
  const { currentSession, upcomingSessions, pastSessions } = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    return sessionsData.reduce((acc, session) => {
      const sessionTime = parseTime(session.time);
      const [startTime, endTime] = session.time.split(' - ');
      const endTimeDate = parseTime(endTime);

      if (sessionTime <= now && endTimeDate >= now) {
        acc.currentSession = { ...session, status: 'current' as const };
      } else if (sessionTime > now) {
        acc.upcomingSessions.push({ ...session, status: 'upcoming' as const });
      } else {
        acc.pastSessions.push({ ...session, status: 'past' as const });
      }

      return acc;
    }, {
      currentSession: null,
      upcomingSessions: [],
      pastSessions: []
    });
  }, []);

  const stats = useMemo(() => ({
    totalSessions: sessionsData.length,
    completedSessions: sessionsData.filter(s => s.completed).length,
    remainingSessions: sessionsData.filter(s => !s.completed).length,
  }), []);

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
                {currentSession ? currentSession?.subject : 'No active session'}
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
              <p className="text-sm text-gray-600">{pastSessions.length} sessions completed</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {currentSession && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Session</h2>
              <StudySessionCard session={currentSession} />
            </div>
          )}

          {upcomingSessions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Sessions</h2>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <StudySessionCard key={session?.id} session={session} />
                ))}
              </div>
            </div>
          )}

          {pastSessions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Past Sessions</h2>
              <div className="space-y-4">
                {pastSessions.map((session) => (
                  <StudySessionCard key={session.id} session={session} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-xl text-indigo-600 font-medium hover:bg-white transition-all duration-200 flex items-center gap-2 mx-auto">
            View All Sessions
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudySessions;
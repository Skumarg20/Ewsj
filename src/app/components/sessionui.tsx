"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Card, CardContent } from "@/components/ui/card";
import { FaArrowLeft, FaArrowRight, FaStickyNote, FaClock, FaBook, FaHeart, FaCrown } from "react-icons/fa";
import { FaRegCalendarTimes } from "react-icons/fa";
import { CheckCircle } from "lucide-react";
import useStudyPlanStore from "@/state/store/timetablestore";
import { useLoading } from "../loader/context/loadingprovider";
import { StudySession } from "@/interface/studysession";
import { motion } from "framer-motion";

type Props = {
  data: StudySession[] | undefined;
};

const SessionUI = ({ }: Props) => {
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [upcomingSessions, setUpcomingSessions] = useState<StudySession[]>([]);
  const [pastSessions, setPastSessions] = useState<StudySession[]>([]);
  const { currentStudyPlan, updateSession } = useStudyPlanStore();
  const { setLoading } = useLoading();
  const [viewMode, setViewMode] = useState<"current" | "upcoming" | "past"|string>("current");
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [pastIndex, setPastIndex] = useState(0);

  useEffect(() => {
    const currentTime = moment();
    const upcoming: StudySession[] = [];
    const past: StudySession[] = [];
    let currentSessionFound: StudySession | null = null;

    currentStudyPlan?.schedule?.forEach((session) => {
      const sessionStartTime = moment(session.time.split(" - ")[0], "h:mm A");
      const sessionEndTime = moment(session.time.split(" - ")[1], "h:mm A");

      if (currentTime.isBetween(sessionStartTime, sessionEndTime)) {
        currentSessionFound = session;
      } else if (currentTime.isBefore(sessionStartTime)) {
        upcoming.push(session);
      } else {
        past.push(session);
      }
    });

    setCurrentSession(currentSessionFound);
    setUpcomingSessions(upcoming);
    setPastSessions(past);
  }, [currentStudyPlan]);

  const handleNextUpcoming = () => {
    setUpcomingIndex((prev) => (prev + 1) % upcomingSessions.length);
  };

  const handlePrevUpcoming = () => {
    setUpcomingIndex((prev) => (prev - 1 + upcomingSessions.length) % upcomingSessions.length);
  };

  const handleNextPast = () => {
    setPastIndex((prev) => (prev + 1) % pastSessions.length);
  };

  const handlePrevPast = () => {
    setPastIndex((prev) => (prev - 1 + pastSessions.length) % pastSessions.length);
  };

  return (
    <div className="min-h-[50vh] w-full bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100 p-4 md:p-6 rounded-3xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
    {/* Background Decorations */}
    <div className="absolute inset-0">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/30"
          initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity }}
        >
          <FaHeart className="w-6 h-6" />
        </motion.div>
      ))}
    </div>

    {/* Tab Navigation */}
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 w-full max-w-3xl relative z-10">
      {["current", "upcoming", "past"].map((mode) => (
        <motion.button
          key={mode}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setViewMode(mode)}
          className={`flex-1 min-w-[100px] md:min-w-[120px] px-4 py-3 rounded-full font-semibold text-sm md:text-base shadow-lg transition-all duration-300 relative overflow-hidden ${
            viewMode === mode
              ? mode === "current"
                ? "bg-gradient-to-r from-pink-400 to-rose-500 text-white"
                : mode === "upcoming"
                ? "bg-gradient-to-r from-purple-400 to-indigo-500 text-white"
                : "bg-gradient-to-r from-rose-300 to-pink-500 text-white"
              : "bg-white/80 text-pink-600 hover:bg-pink-50"
          }`}
        >
          <span className="relative z-10">
            {mode === "current" && <FaRegCalendarTimes className="inline mr-2" />}
            {mode === "upcoming" && <FaCrown className="inline mr-2" />}
            {mode === "past" && <FaHeart className="inline mr-2" />}
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </span>
          {viewMode === mode && (
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.button>
      ))}
    </div>

    {/* Content Area */}
    <div className="w-full max-w-3xl flex-1 flex items-center justify-center relative z-10">
      {/* Current Session */}
      {viewMode === "current" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {currentSession ? (
            <Card className="bg-white/90 rounded-3xl shadow-xl p-6 border border-pink-200 hover:shadow-2xl transition-all duration-300">
              <CardContent className="space-y-5">
                <div className="flex items-center gap-2 text-rose-600">
                  <CheckCircle className="w-6 h-6 text-pink-500 animate-pulse" />
                  <span className="text-sm md:text-base font-medium">{currentSession.time}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-pink-700 flex items-center gap-2">
                  <FaBook className="text-rose-400" />
                  {currentSession.subject}
                </h3>
                <p className="text-sm md:text-base text-rose-600 italic">{currentSession.activity}</p>
                {currentSession.notes && (
                  <div className="bg-pink-50 p-4 rounded-xl text-sm text-rose-700 flex items-start gap-2">
                    <FaStickyNote className="w-5 h-5 text-yellow-400 mt-1" />
                    <p>{currentSession.notes}</p>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`complete-${currentSession.id}`}
                    checked={currentSession.completed || false}
                    onChange={async (e) => {
                      const isChecked = e.target.checked;
                      setCurrentSession({ ...currentSession, completed: isChecked });
                      try {
                        await updateSession(currentSession.id, { completed: isChecked }, setLoading);
                      } catch (error) {
                        console.error("Failed to update session:", error);
                        setCurrentSession({ ...currentSession, completed: !isChecked });
                      }
                    }}
                    className="w-6 h-6 accent-pink-500 rounded-full"
                  />
                  <label htmlFor={`complete-${currentSession.id}`} className="text-sm md:text-base text-rose-700 font-semibold">
                    Done, Bro!
                  </label>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/90 rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center border border-rose-200">
              <FaHeart className="text-pink-400 text-5xl mb-4 animate-bounce" />
              <h3 className="text-xl md:text-2xl font-semibold text-rose-700">No Current Session</h3>
              <p className="text-sm md:text-base text-rose-600">Time for a break, sweetie!</p>
            </Card>
          )}
        </motion.div>
      )}

      {/* Upcoming Sessions */}
      {viewMode === "upcoming" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full flex items-center justify-center"
        >
          {upcomingSessions.length > 0 ? (
            <>
              <motion.button
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevUpcoming}
                disabled={upcomingSessions.length <= 1}
                className="absolute left-0 md:-left-14 top-1/2 -translate-y-1/2 bg-purple-400 text-white p-4 rounded-full shadow-lg hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              >
                <FaArrowLeft />
              </motion.button>
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-6 border border-purple-200 w-full max-w-md">
                <CardContent className="space-y-5">
                  <div className="flex items-center gap-2 text-purple-600">
                    <FaClock className="w-6 h-6 text-purple-400" />
                    <span className="text-sm md:text-base font-medium">{upcomingSessions[upcomingIndex].time}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-purple-700 flex items-center gap-2">
                    <FaBook className="text-pink-400" />
                    {upcomingSessions[upcomingIndex].subject}
                  </h3>
                  <p className="text-sm md:text-base text-purple-600 italic">{upcomingSessions[upcomingIndex].activity}</p>
                  {upcomingSessions[upcomingIndex].notes && (
                    <div className="bg-purple-50 p-4 rounded-xl text-sm text-purple-700 flex items-start gap-2">
                      <FaStickyNote className="w-5 h-5 text-yellow-400 mt-1" />
                      <p>{upcomingSessions[upcomingIndex].notes}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`complete-${upcomingSessions[upcomingIndex].id}`}
                      checked={upcomingSessions[upcomingIndex].completed || false}
                      onChange={async (e) => {
                        const isChecked = e.target.checked;
                        const updatedSessions = [...upcomingSessions];
                        updatedSessions[upcomingIndex].completed = isChecked;
                        setUpcomingSessions(updatedSessions);
                        try {
                          await updateSession(upcomingSessions[upcomingIndex].id, { completed: isChecked }, setLoading);
                        } catch (error) {
                          console.error("Failed to update session:", error);
                        }
                      }}
                      className="w-6 h-6 accent-purple-400 rounded-full"
                    />
                    <label
                      htmlFor={`complete-${upcomingSessions[upcomingIndex].id}`}
                      className="text-sm md:text-base text-purple-700 font-semibold"
                    >
                      Ready, Bro?
                    </label>
                  </div>
                </CardContent>
              </Card>
              <motion.button
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNextUpcoming}
                disabled={upcomingSessions.length <= 1}
                className="absolute right-0 md:-right-14 top-1/2 -translate-y-1/2 bg-purple-400 text-white p-4 rounded-full shadow-lg hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              >
                <FaArrowRight />
              </motion.button>
            </>
          ) : (
            <Card className="bg-white/90 rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center border border-purple-200 w-full max-w-md">
              <FaCrown className="text-purple-400 text-5xl mb-4 animate-spin-slow" />
              <h3 className="text-xl md:text-2xl font-semibold text-purple-700">No Upcoming Flair</h3>
              <p className="text-sm md:text-base text-purple-600">Plan a dreamy adventure!</p>
            </Card>
          )}
        </motion.div>
      )}

      {/* Past Sessions */}
      {viewMode === "past" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full flex items-center justify-center"
        >
          {pastSessions.length > 0 ? (
            <>
              <motion.button
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevPast}
                disabled={pastSessions.length <= 1}
                className="absolute left-0 md:-left-14 top-1/2 -translate-y-1/2 bg-rose-400 text-white p-4 rounded-full shadow-lg hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              >
                <FaArrowLeft />
              </motion.button>
              <Card className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl shadow-xl p-6 border border-rose-200 w-full max-w-md">
                <CardContent className="space-y-5">
                  <div className="flex items-center gap-2 text-rose-600">
                    <FaClock className="w-6 h-6 text-rose-400" />
                    <span className="text-sm md:text-base font-medium">{pastSessions[pastIndex].time}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-rose-700 flex items-center gap-2">
                    <FaBook className="text-pink-400" />
                    {pastSessions[pastIndex].subject}
                  </h3>
                  <p className="text-sm md:text-base text-rose-600 italic">{pastSessions[pastIndex].activity}</p>
                  {pastSessions[pastIndex].notes && (
                    <div className="bg-rose-50 p-4 rounded-xl text-sm text-rose-700 flex items-start gap-2">
                      <FaStickyNote className="w-5 h-5 text-yellow-400 mt-1" />
                      <p>{pastSessions[pastIndex].notes}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`complete-${pastSessions[pastIndex].id}`}
                      checked={pastSessions[pastIndex].completed || false}
                      onChange={async (e) => {
                        const isChecked = e.target.checked;
                        const updatedSessions = [...pastSessions];
                        updatedSessions[pastIndex].completed = isChecked;
                        setPastSessions(updatedSessions);
                        try {
                          await updateSession(pastSessions[pastIndex].id, { completed: isChecked }, setLoading);
                        } catch (error) {
                          console.error("Failed to update session:", error);
                        }
                      }}
                      className="w-6 h-6 accent-rose-400 rounded-full"
                    />
                    <label
                      htmlFor={`complete-${pastSessions[pastIndex].id}`}
                      className="text-sm md:text-base text-rose-700 font-semibold"
                    >
                      Loved It!
                    </label>
                  </div>
                </CardContent>
              </Card>
              <motion.button
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNextPast}
                disabled={pastSessions.length <= 1}
                className="absolute right-0 md:-right-14 top-1/2 -translate-y-1/2 bg-rose-400 text-white p-4 rounded-full shadow-lg hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              >
                <FaArrowRight />
              </motion.button>
            </>
          ) : (
            <Card className="bg-white/90 rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center border border-rose-200 w-full max-w-md">
              <FaHeart className="text-rose-400 text-5xl mb-4 animate-pulse" />
              <h3 className="text-xl md:text-2xl font-semibold text-rose-700">No Past Session</h3>
              <p className="text-sm md:text-base text-rose-600">Your story’s just beginning!</p>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  </div>
  );
};

export default SessionUI;
"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight, FaStickyNote, FaClock, FaBook } from "react-icons/fa";
import { FaRegCalendarTimes } from "react-icons/fa";
import { CheckCircle } from "lucide-react";
import useStudyPlanStore from "@/state/store/timetablestore";
import { useLoading } from "../loader/context/loadingprovider";
import { StudySession } from "@/interface/studysession";
import { motion } from "framer-motion";

type Props = {
  data: StudySession[] | undefined;
};

const SessionUI = ({ data }: Props) => {
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [upcomingSessions, setUpcomingSessions] = useState<StudySession[]>([]);
  const [pastSessions, setPastSessions] = useState<StudySession[]>([]);
  const { currentStudyPlan, updateSession } = useStudyPlanStore();
  const { setLoading } = useLoading();
  const [viewMode, setViewMode] = useState<"current" | "upcoming" | "past">("current");
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
    <div className="min-h-[50vh] w-full bg-gradient-to-br from-gray-50 to-gray-200 p-4 md:p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 w-full max-w-3xl">
        {["current", "upcoming", "past"].map((mode) => (
          <motion.button
            key={mode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode(mode as "current" | "upcoming" | "past")}
            className={`flex-1 min-w-[100px] md:min-w-[120px] px-4 py-2 rounded-full font-semibold text-sm md:text-base shadow-md transition-all duration-300 ${
              viewMode === mode
                ? mode === "current"
                  ? "bg-blue-600 text-white"
                  : mode === "upcoming"
                  ? "bg-green-600 text-white"
                  : "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Content Area */}
      <div className="w-full max-w-3xl flex-1 flex items-center justify-center">
        {/* Current Session */}
        {viewMode === "current" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {currentSession ? (
              <Card className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm md:text-base">{currentSession.time}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">{currentSession.subject}</h3>
                  <p className="text-sm md:text-base text-gray-600">{currentSession.activity}</p>
                  {currentSession.notes && (
                    <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 flex items-start gap-2">
                      <FaStickyNote className="w-4 h-4 text-yellow-500 mt-1" />
                      <p>{currentSession.notes}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
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
                      className="w-5 h-5 accent-green-500 rounded"
                    />
                    <label htmlFor={`complete-${currentSession.id}`} className="text-sm md:text-base text-gray-700">
                      Mark as Complete
                    </label>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
                <FaRegCalendarTimes className="text-gray-400 text-4xl mb-3" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">No Current Session</h3>
                <p className="text-sm md:text-base text-gray-600">Enjoy your free time!</p>
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
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevUpcoming}
                  disabled={upcomingSessions.length <= 1}
                  className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  <FaArrowLeft />
                </motion.button>
                <Card className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-green-100 w-full max-w-md">
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock className="w-5 h-5 text-green-500" />
                      <span className="text-sm md:text-base">{upcomingSessions[upcomingIndex].time}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                      <FaBook className="w-5 h-5 text-blue-500" />
                      {upcomingSessions[upcomingIndex].subject}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600">{upcomingSessions[upcomingIndex].activity}</p>
                    {upcomingSessions[upcomingIndex].notes && (
                      <div className="bg-white/80 p-3 rounded-lg text-sm text-gray-700 flex items-start gap-2">
                        <FaStickyNote className="w-4 h-4 text-yellow-500 mt-1" />
                        <p>{upcomingSessions[upcomingIndex].notes}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
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
                        className="w-5 h-5 accent-green-500 rounded"
                      />
                      <label
                        htmlFor={`complete-${upcomingSessions[upcomingIndex].id}`}
                        className="text-sm md:text-base text-gray-600"
                      >
                        Mark as Complete
                      </label>
                    </div>
                  </CardContent>
                </Card>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNextUpcoming}
                  disabled={upcomingSessions.length <= 1}
                  className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  <FaArrowRight />
                </motion.button>
              </>
            ) : (
              <Card className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center w-full max-w-md">
                <FaRegCalendarTimes className="text-gray-400 text-4xl mb-3" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">No Upcoming Sessions</h3>
                <p className="text-sm md:text-base text-gray-600">Plan something exciting!</p>
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
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevPast}
                  disabled={pastSessions.length <= 1}
                  className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 bg-purple-500 text-white p-3 rounded-full shadow-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  <FaArrowLeft />
                </motion.button>
                <Card className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-purple-100 w-full max-w-md">
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock className="w-5 h-5 text-purple-500" />
                      <span className="text-sm md:text-base">{pastSessions[pastIndex].time}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                      <FaBook className="w-5 h-5 text-blue-500" />
                      {pastSessions[pastIndex].subject}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600">{pastSessions[pastIndex].activity}</p>
                    {pastSessions[pastIndex].notes && (
                      <div className="bg-white/80 p-3 rounded-lg text-sm text-gray-700 flex items-start gap-2">
                        <FaStickyNote className="w-4 h-4 text-yellow-500 mt-1" />
                        <p>{pastSessions[pastIndex].notes}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
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
                        className="w-5 h-5 accent-purple-500 rounded"
                      />
                      <label
                        htmlFor={`complete-${pastSessions[pastIndex].id}`}
                        className="text-sm md:text-base text-gray-600"
                      >
                        Mark as Complete
                      </label>
                    </div>
                  </CardContent>
                </Card>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNextPast}
                  disabled={pastSessions.length <= 1}
                  className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 bg-purple-500 text-white p-3 rounded-full shadow-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  <FaArrowRight />
                </motion.button>
              </>
            ) : (
              <Card className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center w-full max-w-md">
                <FaRegCalendarTimes className="text-gray-400 text-4xl mb-3" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">No Past Sessions</h3>
                <p className="text-sm md:text-base text-gray-600">Nothing to look back on yet!</p>
              </Card>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SessionUI;
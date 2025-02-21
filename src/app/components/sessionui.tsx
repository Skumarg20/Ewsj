"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons
import useStudyPlanStore from "@/state/store/timetablestore";
import { useLoading } from "../loader/context/loadingprovider";
import { StudySession } from "@/state/store/timetablestore";
import {
  HiArrowNarrowRight,
  HiChevronDown,
  HiOutlineBookOpen,
} from "react-icons/hi";
import { FaCheckCircle, FaStickyNote, FaClock, FaBook } from "react-icons/fa";
import { FaRegCalendarTimes } from "react-icons/fa";
import { CalendarX, CheckCircle } from "lucide-react";
// interface Session {
//   id: string;
//   time: string;
//   subject: string;
//   topic?: string | null;
//   activity: string;
//   notes?: string | null;
//   completed?: boolean;
// }
type Props = {
  data: StudySession[] | undefined;
};

const SessionUI = ({ data }: Props) => {
  const [currentSession, setCurrentSession] = useState<StudySession | null>(
    null
  );
  const [upcomingSessions, setUpcomingSessions] = useState<StudySession[]>([]);
  const [pastSessions, setPastSessions] = useState<StudySession[]>([]);
  const { currentStudyPlan, updateSession } = useStudyPlanStore();
  const { setLoading } = useLoading();
  const [viewMode, setViewMode] = useState<"current" | "upcoming" | "past">(
    "current"
  );

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
  }, []);

  const handleNextUpcoming = () => {
    setUpcomingIndex((prev) => (prev + 1) % upcomingSessions.length);
  };

  const handlePrevUpcoming = () => {
    setUpcomingIndex(
      (prev) => (prev - 1 + upcomingSessions.length) % upcomingSessions.length
    );
  };

  // Handle navigation for past sessions
  const handleNextPast = () => {
    setPastIndex((prev) => (prev + 1) % pastSessions.length);
  };

  const handlePrevPast = () => {
    setPastIndex(
      (prev) => (prev - 1 + pastSessions.length) % pastSessions.length
    );
  };

  return (
    <div className="h-auto md:h[55vh] flex-col items-center justify-center bg-gradient-to-br bg-white rounded-2xl shadow-xl">
      <div className="max-w-md w-full flex overflow-hidden p-5 gap-4 bg-white shadow-md rounded-lg">
        <Button
          variant={viewMode === "current" ? "default" : "outline"}
          onClick={() => setViewMode("current")}
          className={`rounded-xl px-6 py-2 font-semibold transition-all ${
            viewMode === "current"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Current
        </Button>
        <Button
          variant={viewMode === "upcoming" ? "default" : "outline"}
          onClick={() => setViewMode("upcoming")}
          className={`rounded-xl px-6 py-2 font-semibold transition-all ${
            viewMode === "upcoming"
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Upcoming
        </Button>
        <Button
          variant={viewMode === "past" ? "default" : "outline"}
          onClick={() => setViewMode("past")}
          className={`rounded-xl px-6 py-2 font-semibold transition-all ${
            viewMode === "past"
              ? "bg-purple-600 text-white shadow-md"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Past
        </Button>
      </div>

      {/* Current Session */}
      {viewMode === "current" && (
        <div className="rounded-lg shadow-md w-full bg-white p-6 h-full flex flex-col items-center justify-center">
          {currentSession ? (
            <Card className="bg-white shadow-xl rounded-xl p-5 border border-gray-200">
              <CardContent className="flex flex-col items-start justify-center space-y-3">
                <p className="text-sm text-gray-600 flex items-center">
                  <CheckCircle className="mr-2 text-green-500" />{" "}
                  {currentSession.time}
                </p>
                <p className="font-semibold text-lg text-gray-800">
                  {currentSession.subject}
                </p>
                <p className="text-sm text-gray-700">
                  {currentSession.activity}
                </p>
                {currentSession.notes && (
                  <div className="text-gray-800 bg-gray-100 p-4 rounded-lg w-full">
                    <p>{currentSession.notes}</p>
                  </div>
                )}
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    id={`complete-${currentSession.id}`}
                    checked={currentSession.completed || false}
                    onChange={async (e) => {
                      const isChecked = e.target.checked;
                      setCurrentSession({
                        ...currentSession,
                        completed: isChecked,
                      });
                      try {
                        await updateSession(
                          currentSession.id,
                          { completed: isChecked },
                          setLoading
                        );
                      } catch (error) {
                        console.error("Failed to update session:", error);
                        setCurrentSession({
                          ...currentSession,
                          completed: !isChecked,
                        });
                      }
                    }}
                    className="w-5 h-5 mr-2 accent-green-500"
                  />
                  <label
                    htmlFor={`complete-${currentSession.id}`}
                    className="text-sm text-gray-700"
                  >
                    Mark as Complete
                  </label>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white shadow-xl rounded-xl p-5 flex flex-col items-center">
              <FaRegCalendarTimes className="text-gray-500 text-3xl" />
              <p className="font-semibold text-gray-800 mt-3">
                No Current Session
              </p>
              <p className="text-sm text-gray-600">You have free time!</p>
            </Card>
          )}
        </div>
      )}

      {/* Upcoming Sessions */}
      {viewMode === "upcoming" && (
        <div className="rounded-lg shadow-md w-full h-full relative flex items-center justify-center">
          {upcomingSessions.length > 0 ? (
            <>
              <button
                onClick={handlePrevUpcoming}
                disabled={upcomingSessions.length <= 1}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-400 to-blue-600 p-3 rounded-full shadow-md text-white hover:opacity-80 disabled:opacity-50"
              >
                <FaArrowLeft />
              </button>

              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-start justify-center p-6">
                  {/* Time */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaClock className="w-4 h-4 text-blue-500" />
                    <p>{upcomingSessions[upcomingIndex].time}</p>
                  </div>

                  {/* Subject */}
                  <div className="flex items-center gap-2 mb-2">
                    <FaBook className="w-5 h-5 text-purple-500" />
                    <p className="font-semibold text-lg text-gray-800">
                      {upcomingSessions[upcomingIndex].subject}
                    </p>
                  </div>

                  {/* Activity */}
                  <p className="text-sm text-gray-600 mb-4">
                    {upcomingSessions[upcomingIndex].activity}
                  </p>

                  {/* Notes */}
                  {upcomingSessions[upcomingIndex].notes && (
                    <div className="w-full bg-white/80 backdrop-blur-sm rounded-lg p-3 mb-4 border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaStickyNote className="w-4 h-4 text-yellow-500" />
                        <p className="text-sm">
                          {upcomingSessions[upcomingIndex].notes}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Mark as Complete */}
                  <div className="flex items-center mt-3">
                    <input
                      type="checkbox"
                      id={`complete-${upcomingSessions[upcomingIndex].id}`}
                      checked={
                        upcomingSessions[upcomingIndex].completed || false
                      }
                      onChange={async (e) => {
                        const isChecked = e.target.checked;
                        const sessionId = upcomingSessions[upcomingIndex].id;
                        const updatedSessions = [...upcomingSessions];
                        upcomingSessions[upcomingIndex].completed = isChecked;

                        try {
                          await updateSession(
                            sessionId,
                            { completed: isChecked },
                            setLoading
                          );
                        } catch (error) {
                          console.error("Failed to update session:", error);
                        }
                        setUpcomingSessions(updatedSessions);
                      }}
                      className="w-5 h-5 mr-2 rounded-md border-2 border-blue-500 text-blue-500 focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      htmlFor={`complete-${upcomingSessions[upcomingIndex].id}`}
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Mark as Complete
                    </label>
                  </div>
                </CardContent>
              </Card>

              <button
                onClick={handleNextUpcoming}
                disabled={upcomingSessions.length <= 1}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-400 to-blue-600 p-3 rounded-full shadow-md text-white hover:opacity-80 disabled:opacity-50"
              >
                <FaArrowRight />
              </button>
            </>
          ) : (
            <Card className="rounded-lg shadow-md w-full bg-white p-6 h-full flex flex-col items-center justify-center">
              <FaRegCalendarTimes className="text-gray-500 text-3xl" />
              <p className="font-semibold text-gray-800 mt-3">
                No Upcomming Session
              </p>
              <p className="text-sm text-gray-600">You have free time!</p>
            </Card>
          )}
        </div>
      )}

      {/* Past Sessions */}
      {viewMode === "past" && (
        <div className="rounded-lg shadow-md w-fullbg-white h-full relative">
          {pastSessions.length > 0 ? (
            <>
              {/* Left Arrow */}
              <button
                onClick={handlePrevPast}
                disabled={pastSessions.length <= 1}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>

              {/* Card */}

              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-start justify-center p-6">
                  {/* Time */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaClock className="w-4 h-4 text-blue-500" />
                    <p>{pastSessions[pastIndex].time}</p>
                  </div>

                  {/* Subject */}
                  <div className="flex items-center gap-2 mb-2">
                    <FaBook className="w-5 h-5 text-purple-500" />
                    <p className="font-semibold text-lg text-gray-800">
                      {pastSessions[pastIndex].subject}
                    </p>
                  </div>

                  {/* Activity */}
                  <p className="text-sm text-gray-600 mb-4">
                    {pastSessions[pastIndex].activity}
                  </p>

                  {/* Notes */}
                  {pastSessions[pastIndex].notes && (
                    <div className="w-full bg-white/80 backdrop-blur-sm rounded-lg p-3 mb-4 border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaStickyNote className="w-4 h-4 text-yellow-500" />
                        <p className="text-sm">
                          {pastSessions[pastIndex].notes}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Mark as Complete */}
                  <div className="flex items-center mt-3">
                    <input
                      type="checkbox"
                      id={`complete-${pastSessions[pastIndex].id}`}
                      checked={pastSessions[pastIndex].completed || false}
                      onChange={async (e) => {
                        const isChecked = e.target.checked;
                        const sessionId = pastSessions[pastIndex].id;
                        const updatedSessions = [...pastSessions];
                        updatedSessions[pastIndex].completed = isChecked;

                        try {
                          await updateSession(
                            sessionId,
                            { completed: isChecked },
                            setLoading
                          );
                        } catch (error) {
                          console.error("Failed to update session:", error);
                        }
                        setPastSessions(updatedSessions);
                      }}
                      className="w-5 h-5 mr-2 rounded-md border-2 border-blue-500 text-blue-500 focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      htmlFor={`complete-${pastSessions[pastIndex].id}`}
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Mark as Complete
                    </label>
                  </div>
                </CardContent>
              </Card>
              {/* Right Arrow */}
              <button
                onClick={handleNextPast}
                disabled={pastSessions.length <= 1}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaArrowRight className="text-gray-600" />
              </button>
            </>
          ) : (
            <Card className="bg-white shadow-xl rounded-xl p-5 flex flex-col items-center">
              <FaRegCalendarTimes className="text-gray-500 text-3xl" />
              <p className="font-semibold text-gray-800 mt-3">
                No Past Session
              </p>
              <p className="text-sm text-gray-600">You have free time!</p>
            </Card>
          )}
        </div>
      )}

      <div className="flex justify-center mb-4 pb-5">
        <button
          onClick={() => (window.location.href = "/session")}
          className="px-6 py-2 mt-4 flex items-center justify-center text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 hover:scale-105"
        >
          <HiOutlineBookOpen className="w-5 h-5 mr-2" />
          <span>Explore Study Sessions</span>
        </button>
      </div>
    </div>
  );
};

export default SessionUI;

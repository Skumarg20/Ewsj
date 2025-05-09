"use client";

import React, { useState, useMemo, useEffect } from "react";
import TimeTablePlanForm from "./timetableform";
import { Button, Dialog, DialogContent } from "@mui/material";
import { MdClose } from "react-icons/md";
import { useLoading } from "../loader/context/loadingprovider";
import useStudyPlanStore from "@/state/store/timetablestore";
import TimeTable from "@/app/components/timetableui";
import CardTimeTable from "./cardTimeTable";
import { StudyPlanInterface } from "@/interface/studysession";
import SessionUI from "../components/sessionui";
import { motion } from "framer-motion";
import { z } from "zod";
import { FaChartLine, FaCalendarAlt, FaChevronRight } from "react-icons/fa";
import ViewAnalysisTimetable from "@/components/ViewAnalysistimetable";
import axios from "axios";
import { getAuthHeader } from "@/lib/api";


const subjectPrioritySchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  weightage: z.number().min(1).max(100, "Weightage must be between 1 and 100"),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const timetableSchema = z.object({
  dailyRoutine: z.string().min(1, "Daily routine description is required"),
  studyHours: z.number().min(1).max(16, "Study hours must be between 1 and 16"),
  targetExam: z.string().min(1, "Target exam is required"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  priorities: z.array(subjectPrioritySchema).optional(),
  includeBreaks: z.boolean(),
});

// Infer type from schema
type TimetableFormValues = z.infer<typeof timetableSchema>;

function TimeTablePlan() {
  const [openForm, setOpenForm] = useState(false);
  const [openTimeTable, setOpenTimeTable] = useState(false);
  const [openAnalysis, setOpenAnalysis] = useState(false);
  const [openGenerated, setOpenGenerated] = useState(false);
  const [passData, setPassData] = useState<StudyPlanInterface | null>(null);
  const [generatedData, setGeneratedData] = useState<StudyPlanInterface | null>(null);
  const { studyPlan, setFormData, saveStudyPlan, getTimeTable, currentStudyPlan } = useStudyPlanStore();
  const { setLoading } = useLoading();
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);

  const getCurrentDate = () => {
    const now = new Date();
    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      await getTimeTable(setLoading);
      setPassData((prevData) => prevData ?? studyPlan);
      setLoading(false);
    };

    fetchInitialData();
  }, [getTimeTable, setLoading, studyPlan]); 

  useEffect(() => {
    const hasCurrentDate = (data: StudyPlanInterface | null) => {
      if (!data || !data.date) return false;
      return data.date === getCurrentDate();
    };

    const newData = currentStudyPlan || studyPlan;
    setPassData((prev) => (JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData));
    setShowSaveButton(!!studyPlan && !hasCurrentDate(currentStudyPlan));
  }, [studyPlan, currentStudyPlan]);

  const handleGenerateTimetable = async (formData: TimetableFormValues) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/timetables/generatetimetable`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
        }
      );

      if (response.data) {
        const generatedPlan = response.data.data;
        setGeneratedData(generatedPlan);
        setOpenGenerated(true);
        setOpenForm(false);
      }
    } catch (error) {
      console.error("Error generating timetable:", error);
      alert("Failed to generate timetable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenTimeTable = async () => {
    setLoading(true);
    await getTimeTable(setLoading);
    setPassData(currentStudyPlan || studyPlan);
    setOpenTimeTable(true);
    setOpenAnalysis(false);
    setLoading(false);
  };

  const handleViewAnalysis = async () => {
    setLoading(true);
    await getTimeTable(setLoading);
    setPassData(currentStudyPlan || studyPlan);
    setOpenAnalysis(true);
    setOpenTimeTable(false);
    setLoading(false);
  };

  const handleSaveConfirmedData = async () => {
    if (!generatedData) return;
    setLoading(true);
    const savedData = await saveStudyPlan(setLoading, generatedData);
    setLoading(false);
    if (savedData) {
      setFormData(savedData);
      setPassData(savedData);
      setOpenGenerated(false);
    }
  };

  const memoizedTimeTable = useMemo(() => {
    return passData ? <TimeTable data={passData} /> : <h1>No Timetable Available</h1>;
  }, [passData]);

  const memoizedViewAnalysisData = useMemo(() => {
    return passData ? <ViewAnalysisTimetable data={passData} /> : <h1>No Analysis Available</h1>;
  }, [passData]);

  const memoizedGeneratedTimeTable = useMemo(() => {
    return generatedData ? <TimeTable data={generatedData} /> : <h1>No Generated Timetable</h1>;
  }, [generatedData]);

  return (
    <div className="bg-slate-100 text-gray-800 h-auto p-3 relative">
      <CardTimeTable setOpen={setOpenForm} open={showSaveButton} />
      <SessionUI data={passData?.schedule} />

      <div className="fixed bottom-5 right-5 z-50 flex gap-4">
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            className="bg-gradient-to-br from-[#14284f] to-blue-600 text-white px-6 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group backdrop-blur-md"
            onClick={handleViewAnalysis}
          >
            <FaChartLine className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            View Time Analysis
            <FaChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group backdrop-blur-md"
            onClick={handleOpenTimeTable}
          >
            <FaCalendarAlt className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            View TimeTable
            <FaChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="lg">
        <DialogContent className="bg-slate-100 relative max-h-[90vh] overflow-y-auto w-[100%] custom-scrollbar rounded-md">
          <button onClick={() => setOpenForm(false)} className="absolute right-4 top-4 p-2">
            <MdClose className="text-gray-600 text-xl" />
          </button>
          <TimeTablePlanForm
            handleformdata={(newData, openState) => {
              setOpenForm(openState);
              handleGenerateTimetable(newData);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openGenerated} onClose={() => setOpenGenerated(false)} fullScreen>
        <DialogContent className="bg-slate-300 bg-opacity-50 text-white custom-scrollbar">
          <button onClick={() => setOpenGenerated(false)} className="absolute right-4 top-4 p-2">
            <MdClose className="text-gray-300 text-xl" />
          </button>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Generated Timetable</h3>
            {memoizedGeneratedTimeTable}
            <Button
              onClick={handleSaveConfirmedData}
              className="w-full mt-4 rounded-full border-2 border-green-400 bg-green-50 text-green-800 hover:bg-green-500 hover:text-white"
            >
              Save Timetable
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openTimeTable} onClose={() => setOpenTimeTable(false)} fullScreen>
        <DialogContent className="bg-slate-300 bg-opacity-50 text-white custom-scrollbar">
          <button onClick={() => setOpenTimeTable(false)} className="absolute right-4 top-4 p-2">
            <MdClose className="text-gray-300 text-xl" />
          </button>
          {memoizedTimeTable}
        </DialogContent>
      </Dialog>

      <Dialog open={openAnalysis} onClose={() => setOpenAnalysis(false)} fullScreen>
        <DialogContent className="bg-slate-300 bg-opacity-50 text-white custom-scrollbar">
          <button onClick={() => setOpenAnalysis(false)} className="absolute right-4 top-4 p-2">
            <MdClose className="text-gray-300 text-xl" />
          </button>
          {memoizedViewAnalysisData}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TimeTablePlan;
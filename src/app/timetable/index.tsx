"use client";

import React, { useState, useMemo, useEffect } from "react";
import TimeTablePlanForm from "./timetableform";
import { Button, Card, Dialog, DialogContent } from "@mui/material";
import { MdClose } from "react-icons/md";
import { useLoading } from "../loader/context/loadingprovider";
import useStudyPlanStore from "@/state/store/timetablestore";
import TimeTable from "@/app/components/timetableui";
import CardTimeTable from "./cardTimeTable";
import { StudyPlanInterface } from "@/interface/studysession";
import SessionUI from "../components/sessionui";
import { motion } from "framer-motion";
import { FaChartLine, FaCalendarAlt, FaChevronRight } from "react-icons/fa";
function TimeTablePlan() {
  const [open, setOpen] = useState(false);
  const [openTimeTable, setOpenTimeTable] = useState(false);
  const [passData,setPassData]=useState<StudyPlanInterface|null>(null);
  const [viewAnalysis,setViewAnalysis]=useState(false);
  const { formData, studyPlan, setFormData, fetchStudyPlan, saveStudyPlan,getTimeTable,currentStudyPlan} = useStudyPlanStore();
  const { setLoading } = useLoading();
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
  const getCurrentDate = () => {
    const now = new Date();
    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'), // Months are 0-indexed
      String(now.getDate()).padStart(2, '0')
    ].join('-');
  };
  
  console.log(getCurrentDate(),"current date menas aaj ki date");
   const hasCurrentDate = (currentStudyPlan: any) => {
     if (!currentStudyPlan || !currentStudyPlan.date) return false;
     console.log(currentStudyPlan.date,getCurrentDate(),"this is for date check");
     return currentStudyPlan.date === getCurrentDate();
   };
   console.log(currentStudyPlan,"this is current study plan");
   console.log(hasCurrentDate(currentStudyPlan),"this is hasCurrent");
   const handleOpenTimeTable = async () => {
    await getTimeTable(setLoading); 
    setOpenTimeTable(true);
  };
  const handleViewAnalyiss=async()=>{
    await getTimeTable(setLoading);
    setViewAnalysis(true);
  }
   useEffect(() => {
     const fetchTimeTable = async () => {
      console.log(hasCurrentDate(currentStudyPlan),"this is form button on and off");
       if (hasCurrentDate(currentStudyPlan)) {
         setShowSaveButton(false);
         setPassData(currentStudyPlan);
       } else if (!studyPlan) {
         setShowSaveButton(false);
         setPassData(currentStudyPlan);
       } else {
         setShowSaveButton(true);
         setPassData(studyPlan);
       }
     };
 
     fetchTimeTable();
   }, [studyPlan, currentStudyPlan]);
 
   const handleSaveConfirmedData = async () => {
    setLoading(true);
    const savedData:any = await saveStudyPlan(setLoading);
    setLoading(false);
    if (savedData) {
      setShowSaveButton(false);
    }
  };

  
 

  const memoizedTimeTable = useMemo(() => {
    return passData ? <TimeTable data={passData} /> : null;
  }, [passData]);

  // const memoizedViewAnalysisdata=useMemo(()=>{
  //   return analysizedData?<></>
  // },analysizedData);
  return (
    <div className="bg-slate-100 text-gray-800 h-auto p-3 relative">
      <CardTimeTable setOpen={setOpen} open={showSaveButton} />
       <SessionUI data={passData?.schedule}/>
      
       <div className="fixed bottom-5 right-5 z-50 flex gap-4">
  {/* Floating Background Effect */}
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
      onClick={() => setOpen(true)}
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
      
     {/* view analysis toggle*/}
     <Dialog open={openTimeTable} onClose={() => setOpenTimeTable(false)} fullScreen>
        <DialogContent className="bg-slate-300 bg-opacity-50 text-white custom-scrollbar">
          <button onClick={() => setOpenTimeTable(false)} className="absolute right-4 top-4 p-2">
            <MdClose className="text-gray-300 text-xl" />
          </button>
          {memoizedTimeTable}
          
        </DialogContent>
      </Dialog>
      {/* Dialog for Time Table form */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" >
        <DialogContent className="bg-slate-100 relative max-h-[90vh] overflow-y-auto w-[100%] custom-scrollbar rounded-md">
          <button onClick={() => setOpen(false)} className="absolute right-4 top-4 p-2">
            <MdClose className="text-gray-600 text-xl" />
          </button>
          <TimeTablePlanForm
            handleformdata={(newData, openState) => {
              setFormData(newData);
              setOpen(openState);
              fetchStudyPlan(newData, setLoading);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog for TimeTable */}
      <Dialog open={openTimeTable} onClose={() => setOpenTimeTable(false)} fullScreen>
        <DialogContent className="bg-slate-300 bg-opacity-50 text-white custom-scrollbar">
          <button onClick={() => setOpenTimeTable(false)} className="absolute right-4 top-4 p-2">
            <MdClose className="text-gray-300 text-xl" />
          </button>
          {memoizedTimeTable}
          {showSaveButton && (
        <Button
          onClick={handleSaveConfirmedData}
          className="w-full mt-4 rounded-full border-2 border-green-400 bg-green-50 text-green-800 hover:bg-green-500 hover:text-white"
        >
          Save Confirmed TimeTable
        </Button>
      )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TimeTablePlan;



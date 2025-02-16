"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import TimeTablePlanForm from "./timetableform";
import { Button, Card, Dialog, DialogContent } from "@mui/material";
import { MdClose } from "react-icons/md";
import { useLoading } from "../loader/context/loadingprovider";
import useCreateHook from "@/hooks/createhook";
import TimeTable from "@/app/components/timetableui";
import CardTimeTable from "./cardTimeTable";

export interface StudySession {
  time: string;
  subject: string;
  topic?: string;
  activity: string;
  notes?: string;
}

export interface StudyPlanInterface {
  date?: string;
  title?: string;
  description?: string;
  study_hours?: number;
  schedule?: StudySession[];
  quote?: string;
}

function TimeTablePlan() {
  const [open, setOpen] = useState(false);
  const [openTimeTable, setOpenTimeTable] = useState(false);
  const [data, setData] = useState<StudyPlanInterface | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [finalTimeTable,setFinalTimeTabe]=useState<StudyPlanInterface| null>(null);
  const { setLoading } = useLoading();
  const Token: string = process.env.NEXT_PUBLIC_TOKEN || "";
  console.log(Token,"this is token");
  // Fetch data using useCreateHook
  const { data: result } = useCreateHook<StudyPlanInterface>({
    url: "http://localhost:5000/timetables/generatetimetable",
    token: Token,
    bodyData: formData,
    setLoading,
  });

  // saving the final time table data 
  // const { updatedResult,error } = useCreateHook({
  //   url: "http://localhost:5000/timetables",
  //   token: Token,
  //   bodyData: finalTimeTable,
  //   setLoading,
  // });
  useEffect(() => {
    if (result && JSON.stringify(result) !== JSON.stringify(data)) {
      setData(result);
    }
  }, [result]);

  // the is updated data means data after posting final time table
  // useEffect(() => {
  //   if (updatedResult) {
  //     console.log(updatedResult,"this is final result");
  //     setData(updatedResult); 
  //   }
  // }, [updatedResult]);
  function handleTimeTable(data:any){
    setFinalTimeTabe(data);
  }
  console.log(finalTimeTable,"this is data i will send to timeTable");
  console.log(data,"this is i am send to props");
  const memoizedTimeTable = useMemo(() => {
    return data ? <TimeTable data={data} handleTimeTable={handleTimeTable} /> : null;
  }, [data]);

  return (
    <div className="bg-slate-100 text-gray-800 min-h-screen p-3 relative">
      
      <CardTimeTable setOpen={setOpen} />

      
      {data && (
        <div className="fixed bottom-5 right-5 z-50 flex gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={() => setOpen(true)}
          >
            Open Study Plan
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
            onClick={() => setOpenTimeTable(true)}
          >
            View TimeTable
          </button>
        </div>
      )}

      {/* Dialog for Study Plan */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogContent className="bg-slate-100">
          <button onClick={() => setOpen(false)} className="absolute right-4 top-4 p-2">
            <MdClose className="text-gray-600 text-xl" />
          </button>
          <TimeTablePlanForm handleformdata={(newData, openState) => {
            setFormData(newData);
            setOpen(openState);
          }} />
        </DialogContent>
      </Dialog>

      {/* Dialog for TimeTable */}
      <Dialog open={openTimeTable} onClose={() => setOpenTimeTable(false)} fullScreen>
        <DialogContent className="bg-slate-300 bg-opacity-50 text-white">
          <button onClick={() => setOpenTimeTable(false)} className="absolute right-4 top-4 p-2">
            <MdClose className="text-gray-300 text-xl" />
          </button>
          {memoizedTimeTable}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TimeTablePlan;

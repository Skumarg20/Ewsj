"use client";

import React, { useState, useEffect } from "react";
import TimeTablePlanForm from "./timetableform";
import { Button, Card, Dialog, DialogContent } from "@mui/material";
import { MdClose, MdAccessTime } from "react-icons/md";
import { FaCalendarCheck, FaRegClock } from "react-icons/fa";
import { useLoading } from "../loader/context/loadingprovider";

type TimetableData = {
  type: "heading" | "paragraph" | "list" | "table";
  content: any;
}[];
export interface StudySession {
  time: string;
  subject: string;
  topic?: string;
  activity: string;
  notes?: string;}

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
  const [data, setData] = useState<StudyPlanInterface | null>(null);
  const [formData, setFormdata] = useState<any>(null);
  const { setLoading } = useLoading();
  const Token=process.env.NEXT_PUBLIC_TOKEN;
  const formatText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

const handleformdata=(data:any,open:any)=>{

  setFormdata(data);
  setOpen(open);

}


  useEffect(() => {
    if(!formData) return;
    const fetchData = async () => {
      setLoading(true);
      try {
         
        const response = await fetch(
          "http://localhost:5000/timetables/generatetimetable",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
             setLoading(false);
          throw new Error("Failed to fetch timetable");
        
        }

        const result: StudyPlanInterface = await response.json();
        
        console.log("Fetched timetable:", result);
        setLoading(false);
        setData(result);
        
      } catch (error) {
        console.error("Error fetching timetable:", error);
      }
    };

    fetchData();
  }, [formData]);

console.log("---->>",data)
  return (
    <div className="bg-slate-100 text-gray-800 min-h-screen p-3">
      <Card className="p-6 text-center bg-white shadow-lg relative rounded-2xl">
        <div className="absolute top-4 right-4 text-blue-500 text-3xl">
          <MdAccessTime />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
          <FaRegClock className="text-green-500" /> Master Your Time, Achieve Your Goals
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          <span className="text-blue-500 font-medium">Plan</span> your day,
          <span className="text-green-500 font-medium"> stay consistent</span>, and
          <span className="text-yellow-500 font-medium"> boost productivity</span>. A well-structured timetable is the secret to success!
        </p>

        {/* Centered Button */}
        <div className="mt-5 flex justify-center">
          <Button
            onClick={() => setOpen(true)}
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <FaCalendarCheck /> Create Your Timetable Now!
          </Button>
        </div>
      </Card>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: "10px",
            backgroundColor: "#f1f5f9",
            overflow: "hidden",
            margin: "16px",
            maxHeight: "100vh",
          },
        }}
      >
        <div className="relative bg-slate-100">
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 p-2 rounded-2xl hover:bg-slate-200 transition-colors bg-white shadow-md"
            aria-label="Close dialog"
          >
            <MdClose className="text-gray-600 text-xl" />
          </button>

          {/* Dialog content with custom scrollbar */}
          <DialogContent className="!p-0">
            <div className="max-h-screen overflow-y-auto transition-all">
              <div className="p-6">
                <TimeTablePlanForm handleformdata={handleformdata}/>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>

      {/* Time Table Display */}
      <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Get Your Perfect Timetable</h2>
      {data ? (
        <div>
          {/* {data.map((item, index) => {
            if (item.type === "heading") {
              return (
                <h2 key={index} className="text-xl font-bold mt-4">
                  {formatText(item.content)}
                </h2>
              );
            } else if (item.type === "paragraph") {
              return (
                <p key={index} className="mt-2 text-gray-700">
                  {formatText(item.content)}
                </p>
              );
            } else if (item.type === "list") {
              return (
                <ul key={index} className="list-disc list-inside mt-2">
                  {item.content.map((point: string, i: number) => (
                    <li key={i}>{formatText(point)}</li>
                  ))}
                </ul>
              );
            } else if (item.type === "table") {
              return (
                <table key={index} className="border-collapse border border-gray-400 w-full mt-4">
                  <tbody>
                    {item.content.map((row: string[], i: number) => (
                      <tr key={i} className="border border-gray-300">
                        {row.map((cell: string, j: number) => (
                          <td key={j} className="border border-gray-300 p-2">
                            {formatText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            }
            return null;
          })} */}
        </div>
      ) : (
       <></>
      )}
    </div>
    </div>
  );
}

export default TimeTablePlan;

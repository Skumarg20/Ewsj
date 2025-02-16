"use client";
import React, { useEffect, useState } from "react";
import ActionAreaCard from "@/app/components/utils/card";
import TimeTables from "./utils/table";
import TypographyBlockquote from "./utils/quote";
import { Button } from "@/components/ui/button";
import studyplan from "./utils/studyplan.png";
import StudyPlan from "../studyplan";
import Image from "next/image"; // Ensure you have this import if needed
import { StaticImageData } from "next/image";
import { useLoading } from "../loader/context/loadingprovider";
import useCreateHook from "@/hooks/createhook";
// interface ActionAreaCardProps {
//   title: string;
//   paragraph: string;
//   image: string|StaticImageData;
// }

// interface TimeTableProps {
//   caption?: string;
//   headers: string[];
//   data: { [key: string]: string }[];
// }

// interface TypographyBlockquoteProps {
//   quote: string;
// }
// const data= {
//   "date": "Sat Feb 15 2025",
//   "title": "JEE Advanced Study Plan - February 15, 2025",
//   "description": "A well-balanced study schedule for JEE Advanced preparation, focusing on Maths, Physics, and Chemistry.",
//   "study_hours": 8,
//   "schedule": [
//       {
//           "time": "6:00 AM - 7:00 AM",
//           "subject": "Maths",
//           "topic": "Calculus - Integration",
//           "activity": "Problem Solving",
//           "notes": "Focus on solving problems from previous year's JEE Advanced papers."
//       },
//       {
//           "time": "7:00 AM - 7:15 AM",
//           "subject": null,
//           "topic": null,
//           "activity": "Break",
//           "notes": "Light exercise or stretching"
//       },
//       {
//           "time": "7:15 AM - 8:45 AM",
//           "subject": "Maths",
//           "topic": "Coordinate Geometry",
//           "activity": "Theory Revision & Practice",
//           "notes": "Review important concepts and solve selected problems from a textbook."
//       },
//       {
//           "time": "8:45 AM - 9:00 AM",
//           "subject": null,
//           "topic": null,
//           "activity": "Break",
//           "notes": "Hydration and quick snack"
//       },
//       {
//           "time": "9:00 AM - 10:30 AM",
//           "subject": "Physics",
//           "topic": "Electromagnetism",
//           "activity": "Concept Understanding",
//           "notes": "Focus on understanding the underlying principles and solve conceptual problems."
//       },
//       {
//           "time": "10:30 AM - 10:45 AM",
//           "subject": null,
//           "topic": null,
//           "activity": "Break",
//           "notes": "Short walk or relaxation"
//       },
//       {
//           "time": "10:45 AM - 12:15 PM",
//           "subject": "Physics",
//           "topic": "Electromagnetism - Problem Solving",
//           "activity": "Problem Solving",
//           "notes": "Solve a mix of easy, medium, and difficult problems."
//       },
//       {
//           "time": "12:15 PM - 1:15 PM",
//           "subject": null,
//           "topic": null,
//           "activity": "Lunch Break",
//           "notes": "Nourishing meal"
//       },
//       {
//           "time": "1:15 PM - 2:45 PM",
//           "subject": "Chemistry",
//           "topic": "Organic Chemistry - Reactions",
//           "activity": "Revision & Practice",
//           "notes": "Review reaction mechanisms and solve practice problems."
//       },
//       {
//           "time": "2:45 PM - 3:00 PM",
//           "subject": null,
//           "topic": null,
//           "activity": "Break",
//           "notes": "Light snack and hydration"
//       },
//       {
//           "time": "3:00 PM - 4:30 PM",
//           "subject": "Chemistry",
//           "topic": "Physical Chemistry - Equilibrium",
//           "activity": "Problem Solving",
//           "notes": "Focus on numerical problems related to equilibrium."
//       },
//       {
//           "time": "4:30 PM - 5:00 PM",
//           "subject": null,
//           "topic": null,
//           "activity": "Revision",
//           "notes": "Review key concepts from all three subjects."
//       }
//   ],
//   "quote": "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
// }
type Props = {
  data: any;
};
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

const header = ["time", "subject", "topic", "activity", "notes"];
export default function TimeTable({ data }: Props) {
  const [finalData, setFinalData] = useState<any>(null);
  const [mainData,setMainData]=useState<any>(null);
  const { setLoading } = useLoading();
  const [dataForPostAPI, setDataForPostAPI] = useState<StudyPlanInterface | null>(null);
  const Token: string = process.env.NEXT_PUBLIC_TOKEN || "";

  const handleFinalupdatedData = () => {
    const finalTimeTable = {
      data: { ...data.data, schedule: finalData },
    };
  
    setDataForPostAPI(finalTimeTable.data); 
  };

 const {result,error}=useCreateHook<StudyPlanInterface>({
  url:'http://localhost:5000/timetables',
  token:Token,
  bodyData:dataForPostAPI,
  setLoading,
 });

 useEffect(()=>{
  setMainData(result);
 },[result]);
 
  
  const handleFinalData = (data_: any) => {
    setFinalData(data_);
  };
  console.log(finalData,"this is final data i want to send to api");

  return (
    <div className="h-auto flex justify-center items-center bg-transparent text-gray-800 pb-8 pt-8">
      <div className="flex w-[70%] flex-col justify-center items-center gap-6">
        <ActionAreaCard
          title={data?.data?.title || "Create your own time table"}
          paragraph={data?.data?.description || "Discipline is the bridge between goals and accomplishments"}
          image={studyplan || "/path/to/default-image.jpg"}
        />
        <TimeTables
          caption="Time is your greatest asset—spend it wisely on your dreams!"
          headers={header}
          data={data?.data?.schedule || []}
          handleonChange={handleFinalData}
        />
        <TypographyBlockquote quote={data?.data.quote} />
        <Button onClick={handleFinalupdatedData}
        className="w-full rounded-full border-2 border-blue-300 bg-slate-50 text-blue-800 hover:bg-blue-500 hover:text-white">
          Save
        </Button>
      </div>
    </div>
  );
}

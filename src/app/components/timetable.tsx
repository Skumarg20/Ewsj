"use client"
import React from 'react'
import ActionAreaCard from '@/app/components/utils/card'
import TimeTables from './utils/table'
import TypographyBlockquote from './utils/quote'
import { Button } from '@/components/ui/button'

interface ActionAreaCardProps {
  title: string;
  paragraph: string;
  image: string;
}


interface TimeTableProps {
  caption?: string;
  headers: string[];
  data: { [key: string]: string }[];
}


interface TypographyBlockquoteProps {
  quote: string;
}
const data= {
  "date": "Sat Feb 15 2025",
  "title": "JEE Advanced Study Plan - February 15, 2025",
  "description": "A well-balanced study schedule for JEE Advanced preparation, focusing on Maths, Physics, and Chemistry.",
  "study_hours": 8,
  "schedule": [
      {
          "time": "6:00 AM - 7:00 AM",
          "subject": "Maths",
          "topic": "Calculus - Integration",
          "activity": "Problem Solving",
          "notes": "Focus on solving problems from previous year's JEE Advanced papers."
      },
      {
          "time": "7:00 AM - 7:15 AM",
          "subject": null,
          "topic": null,
          "activity": "Break",
          "notes": "Light exercise or stretching"
      },
      {
          "time": "7:15 AM - 8:45 AM",
          "subject": "Maths",
          "topic": "Coordinate Geometry",
          "activity": "Theory Revision & Practice",
          "notes": "Review important concepts and solve selected problems from a textbook."
      },
      {
          "time": "8:45 AM - 9:00 AM",
          "subject": null,
          "topic": null,
          "activity": "Break",
          "notes": "Hydration and quick snack"
      },
      {
          "time": "9:00 AM - 10:30 AM",
          "subject": "Physics",
          "topic": "Electromagnetism",
          "activity": "Concept Understanding",
          "notes": "Focus on understanding the underlying principles and solve conceptual problems."
      },
      {
          "time": "10:30 AM - 10:45 AM",
          "subject": null,
          "topic": null,
          "activity": "Break",
          "notes": "Short walk or relaxation"
      },
      {
          "time": "10:45 AM - 12:15 PM",
          "subject": "Physics",
          "topic": "Electromagnetism - Problem Solving",
          "activity": "Problem Solving",
          "notes": "Solve a mix of easy, medium, and difficult problems."
      },
      {
          "time": "12:15 PM - 1:15 PM",
          "subject": null,
          "topic": null,
          "activity": "Lunch Break",
          "notes": "Nourishing meal"
      },
      {
          "time": "1:15 PM - 2:45 PM",
          "subject": "Chemistry",
          "topic": "Organic Chemistry - Reactions",
          "activity": "Revision & Practice",
          "notes": "Review reaction mechanisms and solve practice problems."
      },
      {
          "time": "2:45 PM - 3:00 PM",
          "subject": null,
          "topic": null,
          "activity": "Break",
          "notes": "Light snack and hydration"
      },
      {
          "time": "3:00 PM - 4:30 PM",
          "subject": "Chemistry",
          "topic": "Physical Chemistry - Equilibrium",
          "activity": "Problem Solving",
          "notes": "Focus on numerical problems related to equilibrium."
      },
      {
          "time": "4:30 PM - 5:00 PM",
          "subject": null,
          "topic": null,
          "activity": "Revision",
          "notes": "Review key concepts from all three subjects."
      }
  ],
  "quote": "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
}
type Props = {
  
}

export default function TimeTable({ }:Props) {
 

  return (
    <div className="h-auto w-full flex justify-center items-center bg-white text-gray-800 pb-8">
      <div className="w-[70%] flex flex-col justify-center items-center gap-6">
        <ActionAreaCard 
          title={data?.title || "Default Title"} 
          paragraph={data?.description || "No description available."}
          image={data?.image || "/path/to/default-image.jpg"}
        />
        <TimeTables 
          caption="Time is your greatest asset—spend it wisely on your dreams!" 
          headers={["time", "subject", "topic", "activity", "notes"]} 
          data={data?.schedule || []} 
        />
        <TypographyBlockquote quote={data.quote} />
        <Button className="w-full rounded-full border-2 border-blue-300 bg-slate-50 text-blue-800 hover:bg-blue-500 hover:text-white">
  Save
</Button>

      </div>
      
    </div>
  );
}



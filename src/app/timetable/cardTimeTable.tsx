import { Button } from '@/components/ui/button'
import Card from '@mui/material/Card'
import React from 'react'
import { FaCalendarCheck, FaRegClock } from 'react-icons/fa'
import { MdAccessTime } from 'react-icons/md'

type Props = {
    setOpen: (value: boolean) => void;
};


export default function cardTimeTable({setOpen}: Props) {
  return (
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
  )
}
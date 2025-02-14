'use client'

import React, { useState } from 'react'
import StudyPlanForm from "./studyplanform";
import { Button, Card, Dialog, DialogContent } from '@mui/material';
import { MdOutlineStar, MdClose } from 'react-icons/md';
import { FaBookOpen, FaClock, FaUserGraduate } from 'react-icons/fa';

type Props = {}

function StudyPlan({}: Props) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div className="bg-slate-100 text-gray-800 min-h-screen p-3">
      <Card className="p-6 text-center bg-white shadow-lg relative rounded-2xl">
        {/* Star Icon in Top Right */}
        <div className="absolute top-4 right-4 text-yellow-500 text-3xl">
          <MdOutlineStar />
        </div>

        {/* Heading with Icon */}
        <h1 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
          <FaBookOpen className="text-blue-500" /> Study Smarter, Not Harder
        </h1>

        {/* Description Text */}
        <p className="mt-3 text-gray-600 text-lg">
          <span className="text-blue-500 font-medium">Maximize</span> your learning efficiency with a personalized study plan designed to fit your 
          <span className="text-green-500 font-medium"> goals</span>, 
          <span className="text-yellow-500 font-medium"> schedule</span>, and 
          <span className="text-red-500 font-medium"> learning style</span>.
        </p>

        {/* Centered Button */}
        <div className="mt-5 flex justify-center">
          <Button 
            onClick={handleOpenDialog}
            className="bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-600 transition-colors"
          >
            <FaUserGraduate /> Get Your Study Plan Now!
          </Button>
        </div>
      </Card>

      {/* Dialog */}
      <Dialog 
        open={open} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '10px',
            backgroundColor: '#f1f5f9', // slate-100
            overflow: 'hidden',
            margin: '16px',
            maxHeight: '100vh'
          }
        }}
      >
        <div className="relative bg-slate-100">
          {/* Close button */}
          <button
            onClick={handleCloseDialog}
            className="absolute right-4 top-4 z-10 p-2 rounded-2xl hover:bg-slate-200 transition-colors bg-white shadow-md"
            aria-label="Close dialog"
          >
            <MdClose className="text-gray-600 text-xl" />
          </button>

          {/* Dialog content with custom scrollbar */}
          <DialogContent className="!p-0">
            <div className="max-h-screen overflow-y-auto 
                          [&::-webkit-scrollbar]:w-2
                          [&::-webkit-scrollbar-track]:bg-gray-100
                          [&::-webkit-scrollbar-thumb]:bg-gray-300
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-scrollbar-thumb]:hover:bg-gray-400
                          [&::-webkit-scrollbar]:hover:w-3
                          transition-all">
              <div className="p-6">
                <StudyPlanForm />
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default StudyPlan;
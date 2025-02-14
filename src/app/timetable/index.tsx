"use client";

import React, { useState } from "react";
import TimeTablePlanForm from "./timetableform";
import { Button, Card, Dialog, DialogContent } from "@mui/material";
import { MdOutlineStar, MdClose, MdAccessTime } from "react-icons/md";
import {
  FaBookOpen,
  FaCalendarCheck,
  FaClock,
  FaRegClock,
  FaUserGraduate,
} from "react-icons/fa";

type Props = {};

function TimeTablePlan({}: Props) {
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
        <div className="absolute top-4 right-4 text-blue-500 text-3xl">
          <MdAccessTime />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
          <FaRegClock className="text-green-500" /> Master Your Time, Achieve
          Your Goals
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          <span className="text-blue-500 font-medium">Plan</span> your day,
          <span className="text-green-500 font-medium"> stay consistent</span>,
          and
          <span className="text-yellow-500 font-medium">
            {" "}
            boost productivity
          </span>
          . A well-structured timetable is the secret to success!
        </p>

        {/* Centered Button */}
        <div className="mt-5 flex justify-center">
          <Button
            onClick={handleOpenDialog}
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <FaCalendarCheck /> Create Your Timetable Now!
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
            borderRadius: "10px",
            backgroundColor: "#f1f5f9", // slate-100
            overflow: "hidden",
            margin: "16px",
            maxHeight: "100vh",
          },
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
            <div
              className="max-h-screen overflow-y-auto 
                          [&::-webkit-scrollbar]:w-2
                          [&::-webkit-scrollbar-track]:bg-gray-100
                          [&::-webkit-scrollbar-thumb]:bg-gray-300
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-scrollbar-thumb]:hover:bg-gray-400
                          [&::-webkit-scrollbar]:hover:w-3
                          transition-all"
            >
              <div className="p-6">
                <TimeTablePlanForm />
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default TimeTablePlan;

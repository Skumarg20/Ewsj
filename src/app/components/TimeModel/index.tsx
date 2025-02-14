'use client';
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { ClockIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Stopwatch from "../../screen/stopwatch/index";

const TimerModal = () => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Reset Timer when the user leaves the dashboard
  useEffect(() => {
    const handleTabClose = () => {
      setTime(0);
      setIsRunning(false);
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => window.removeEventListener("beforeunload", handleTabClose);
  }, []);

  return (
    <>
      {/* Button to Open Modal */}
      <IconButton onClick={() => setOpen(true)}>
        <ClockIcon className="w-6 h-6 text-gray-600" />
      </IconButton>

      {/* Timer Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen disableScrollLock>
        {/* Close Button - Fixed on Top with High z-index */}
        <div className="absolute top-4 right-4 z-50">
          <IconButton onClick={() => setOpen(false)} className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full">
            <XMarkIcon className="w-6 h-6 text-white" />
          </IconButton>
        </div>

        {/* Stopwatch Component with Controlled State */}
        <DialogContent className="relative">
          <Stopwatch time={time} setTime={setTime} isRunning={isRunning} setIsRunning={setIsRunning} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TimerModal;

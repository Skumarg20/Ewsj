"use client";
import { useTodoStore } from "@/state/store/todosstore";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CheckCircle,
  BookOpen,
  Video,
  ClipboardCheck,
  Edit,
} from "lucide-react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import CongratulationsPopup from "@/app/utils/CongratulationPop";
import StickyNotes from "../StickyNotes";
import SessionUI from "../sessionui";
import DashBoardChat from "@/components/dashboardchat";
import ChatBuddie from "@/components/chatbuddie";
import useStudyPlanStore from "@/state/store/timetablestore";
import NotesApp from "@/components/shortnotes";
import TodoApp from "@/components/todo";
const RightDashboard = () => {
  const [showChat, setShowChat] = useState(false);
  const { currentStudyPlan } = useStudyPlanStore();
  

  return (
    <div className="h-auto bg-slate-100 text-gray-900 p-6">
      <div className="text-2xl font-bold mb-4 mt-0 pt-0">
        Welcome Back, Sanjeev! 🚀
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {showChat ? (
          <ChatBuddie onClose={() => setShowChat(false)} />
        ) : (
          <DashBoardChat onStartChat={() => setShowChat(true)} />
        )}
        <div>
          <SessionUI data={currentStudyPlan?.schedule} />
        </div>
      </div>

     
        {/* <StickyNotes /> */}
        <div className="w-full rounded-lg">
            <TodoApp/>
        </div>
      


      {/* Performance Analytics */}
    </div>
  );
};

export default RightDashboard;

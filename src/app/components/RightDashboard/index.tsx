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

const RightDashboard = () => {
  const [showChat, setShowChat] = useState(false);
  const { currentStudyPlan } = useStudyPlanStore();
  // const { todos, addTodo, toggleTodo, removeTodo, updateTodo } = useTodoStore();
  // const [editingId, setEditingId] = useState<number | null>(null);
  // const [newText, setNewText] = useState("");
  // const [showPopup, setShowPopup] = useState(false);

  // const completedCount: number = todos.reduce(
  //   (count, items) => (items.completed ? count + 1 : count),
  //   0
  // );
  // const taskCompletedPercentage: number = todos.length
  // ? (completedCount / todos.length) * 100
  // : 0;

  // const handleUpdate = () => {
  //   if (editingId !== null && newText.trim() !== "") {
  //     updateTodo(editingId, newText);
  //   }
  //   setEditingId(null);
  //   setNewText("");
  // };

  // const handleEdit = (id: number, text: string) => {
  //   setEditingId(id);
  //   setNewText(text);
  // };

  // useEffect(() => {
  //   if (taskCompletedPercentage === 100) {
  //     setShowPopup(true);
  //   }
  // }, [taskCompletedPercentage]);

  // const performanceData = [
  //   { subject: "Physics", score: 80 },
  //   { subject: "Maths", score: 75 },
  //   { subject: "Chemistry", score: 85 },
  // ];

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

      <Card className="bg-slate-100 p-4 rounded-none h-auto self-start mt-5">
        {/* <StickyNotes /> */}
        <NotesApp/>
      </Card>

      {/* Performance Analytics */}
    </div>
  );
};

export default RightDashboard;

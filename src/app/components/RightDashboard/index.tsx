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

const RightDashboard = () => {
  const { todos, addTodo, toggleTodo, removeTodo, updateTodo } = useTodoStore();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newText, setNewText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const completedCount: number = todos.reduce(
    (count, items) => (items.completed ? count + 1 : count),
    0
  );
  const taskCompletedPercentage: number = todos.length
  ? (completedCount / todos.length) * 100
  : 0;
 
  const handleUpdate = () => {
    if (editingId !== null && newText.trim() !== "") {
      updateTodo(editingId, newText);
    }
    setEditingId(null);
    setNewText("");
  };

  const handleEdit = (id: number, text: string) => {
    setEditingId(id);
    setNewText(text);
  };

  useEffect(() => {
    if (taskCompletedPercentage === 100) {
      setShowPopup(true);
    }
  }, [taskCompletedPercentage]);

  const performanceData = [
    { subject: "Physics", score: 80 },
    { subject: "Maths", score: 75 },
    { subject: "Chemistry", score: 85 },
  ];

  return (
    <div className="h-auto bg-slate-100 text-gray-900 p-6">
 
  <div className="text-2xl font-bold mb-4">Welcome Back, Sanjeev! 🚀</div>

 
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 
  <Card className="bg-slate-100 p-4 rounded-xl h-auto w-full">
    <h2 className="text-lg font-semibold mb-3">📌 To-Do List</h2>
    <ul>
      {todos.map((task) => (
        <li key={task.id} className="flex items-center gap-2 mb-2">
          <button onClick={() => toggleTodo(task.id)}>
            <CheckCircle
              className={`w-5 h-5 ${task.completed ? "text-green-400" : "text-gray-500"}`}
            />
          </button>
          {editingId === task.id ? (
            <input
              className="bg-slate-100 text-white p-1 rounded"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onBlur={handleUpdate}
              autoFocus
            />
          ) : (
            <span className={task.completed ? "line-through text-gray-400" : ""}>
              {task.text}
            </span>
          )}
          <button onClick={() => handleEdit(task.id, task.text)} className="ml-2 text-yellow-400">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => removeTodo(task.id)} className="ml-auto text-red-500">
            X
          </button>
        </li>
      ))}
    </ul>
    <Button className="mt-2 w-full sm:w-full bg-blue-600" onClick={() => addTodo("New Task")}>
      Add Task
    </Button>
  </Card>

  {/* Learning Progress */}
  <Card className="bg-slate-100 p-4 rounded-xl h-auto w-full">
    <h2 className="text-lg font-semibold mb-3">📖 Learning Progress</h2>
    <p>Today's Goal: Complete {completedCount} Topics</p>
    <Progress value={taskCompletedPercentage} className="mt-2" />
    <Typography variant="h6" component="h4" className="font-semibold text-lg mt-3">
      Completed: <span className="text-green-400">{taskCompletedPercentage.toFixed()} %</span>
    </Typography>
    {showPopup && <CongratulationsPopup onClose={() => setShowPopup(false)} />}
  </Card>
</div>

  <Card className="bg-slate-100 p-4 rounded-none h-auto self-start mt-5">
      <StickyNotes />
    </Card>

  {/* Performance Analytics */}
 
</div>

  );
};

export default RightDashboard;

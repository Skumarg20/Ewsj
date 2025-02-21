"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Trash2,
  BookOpen,
  Calendar,
  Clock,
  Tag,
  GraduationCap,
} from "lucide-react";
import { IoDocumentText } from "react-icons/io5";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import SessionCard from "@/components/Custom/sessionCard";

const TimeFrame = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
} as const;

// Zod Schema based on the DTO
const subjectPrioritySchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  weightage: z.number().min(1).max(100, "Weightage must be between 1 and 100"),
});

const timetableSchema = z.object({
  dailyRoutine: z.string().min(1, "Daily routine description is required"),
  studyHours: z.number().min(1).max(16, "Study hours must be between 1 and 16"),
  targetExam: z.string().min(1, "Target exam is required"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  priorities: z.array(subjectPrioritySchema).optional(),
  includeBreaks: z.boolean(),
});

type TimetableFormValues = z.infer<typeof timetableSchema>;

export default function TimetableForm({ handleformdata }: any) {
  const [subjectInput, setSubjectInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TimetableFormValues>({
    resolver: zodResolver(timetableSchema),
    defaultValues: {
      subjects: [],
      priorities: [],
      includeBreaks: true,
    },
  });

  const subjects = watch("subjects");
  const priorities = watch("priorities") || [];

  const handleAddSubject = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && subjectInput.trim()) {
      e.preventDefault();
      const newSubject = subjectInput.trim();
      if (!subjects.includes(newSubject)) {
        setValue("subjects", [...subjects, newSubject]);
        setSubjectInput("");
      }
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setValue(
      "subjects",
      subjects.filter((s) => s !== subject)
    );
    setValue(
      "priorities",
      priorities.filter((p) => p.subject !== subject)
    );
  };

  const handleAddPriority = (subject: string, weightage: number) => {
    const newPriorities = [...priorities];
    const existingIndex = priorities.findIndex((p) => p.subject === subject);

    if (existingIndex >= 0) {
      newPriorities[existingIndex] = { subject, weightage };
    } else {
      newPriorities.push({ subject, weightage });
    }

    setValue("priorities", newPriorities);
  };

  const onSubmit = (data: TimetableFormValues) => {
    handleformdata(data, false);
  };

  return (
    <div className="w-full h-auto mx-auto p-6 bg-white rounded-lg shadow-md">
      <SessionCard
        topic="Create Your Perfect Timetable"
        notes="Customize your study schedule for maximum efficiency"
        notesClass="text-black font-bold"
        cardClass="bg-[#14284f] p-6 m-4 rounded-xl"
      />

<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative overflow-hidden w-[80%] m-auto p-auto">
  {/* Floating Background Elements */}
  <div className="absolute inset-0 pointer-events-none">
    <motion.div 
      className="absolute top-20 left-20 w-48 h-48 bg-blue-100 rounded-full blur-xl opacity-20"
      animate={{ y: [0, -40, 0] }}
      transition={{ duration: 8, repeat: Infinity }}
    />
    <motion.div 
      className="absolute bottom-20 right-20 w-32 h-32 bg-purple-100 rounded-full blur-xl opacity-20"
      animate={{ y: [0, 40, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
    />
  </div>

  {/* Daily Routine */}
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
  >
    <Label htmlFor="dailyRoutine">Daily Routine</Label>
    <div className="relative">
      <Input
        id="dailyRoutine"
        type="text"
        {...register("dailyRoutine")}
        placeholder="Describe your daily routine"
        className="pl-10 rounded-full border-gray-300 bg-white/90 backdrop-blur-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-500"
      />
      <motion.div 
        whileHover={{ rotate: 15 }}
        className="absolute left-3 top-1/2 -translate-y-1/2"
      >
        <IoDocumentText className="text-blue-500 h-5 w-5" />
      </motion.div>
    </div>
    {errors.dailyRoutine && (
      <p className="text-red-500 text-sm mt-1">{errors.dailyRoutine.message}</p>
    )}
  </motion.div>

  {/* Target Exam */}
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 }}
  >
    <Label htmlFor="targetExam">Target Exam</Label>
    <div className="relative">
      <Input
        id="targetExam"
        {...register("targetExam")}
        placeholder="Enter your target exam"
        className="pl-10 rounded-full border-gray-300 bg-white/90 backdrop-blur-sm hover:border-purple-400 focus:ring-2 focus:ring-purple-500"
      />
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className="absolute left-3 top-1/2 -translate-y-1/2"
      >
        <GraduationCap className="text-purple-500 h-5 w-5" />
      </motion.div>
    </div>
    {errors.targetExam && (
      <p className="text-red-500 text-sm mt-1">{errors.targetExam.message}</p>
    )}
  </motion.div>

  {/* Study Hours */}
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
  >
    <Label htmlFor="studyHours">Study Hours</Label>
    <div className="relative">
      <Input
        id="studyHours"
        type="number"
        {...register("studyHours", { valueAsNumber: true })}
        min="1"
        max="16"
        className="pl-10 rounded-full border-gray-300 bg-white/90 backdrop-blur-sm hover:border-green-400 focus:ring-2 focus:ring-green-500"
      />
      <motion.div 
        whileHover={{ scale: 1.1 }}
       
        className="absolute left-3 top-1/2 -translate-y-1/2"
      >
        <Clock className="text-green-500 h-5 w-5" />
      </motion.div>
    </div>
    {errors.studyHours && (
      <p className="text-red-500 text-sm mt-1">{errors.studyHours.message}</p>
    )}
  </motion.div>

  {/* Subjects */}
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
  >
    <Label>Subjects</Label>
    <div className="space-y-2">
      <div className="relative">
        <Input
          placeholder="Add a subject and press Enter"
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
          onKeyDown={handleAddSubject}
          className="pl-10 rounded-full border-gray-300 bg-white/90 backdrop-blur-sm hover:border-yellow-400 focus:ring-2 focus:ring-yellow-500"
        />
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="absolute left-3 top-1/2 -translate-y-1/2"
        >
          <BookOpen className="text-yellow-500 h-5 w-5" />
        </motion.div>
      </div>

      <div className="space-y-2">
        {subjects.map((subject) => (
          <motion.div
            key={subject}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-white p-3 rounded-2xl shadow-sm border border-gray-100"
          >
            <span className="flex-grow">{subject}</span>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Priority (1-100)"
                className="w-32 rounded-full bg-gray-50"
                onChange={(e) => handleAddPriority(subject, parseInt(e.target.value))}
              />
              <motion.button
                type="button"
                onClick={() => handleRemoveSubject(subject)}
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>

  {/* Include Breaks Switch */}
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center space-x-2 p-3 bg-blue-50 rounded-xl"
  >
    <Switch
      id="includeBreaks"
      checked={watch("includeBreaks")}
      onCheckedChange={(checked) => setValue("includeBreaks", checked)}
      className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-300"
    />
    <Label htmlFor="includeBreaks" className="text-gray-700">
      Include study breaks in timetable
    </Label>
  </motion.div>

  {/* Submit Button */}
  <motion.div 
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full py-6 text-lg font-semibold shadow-lg transition-all"
    >
      <motion.span
        animate={{ x: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🚀
      </motion.span>
      Generate Timetable
    </Button>
  </motion.div>
</form>
    </div>
  );
}

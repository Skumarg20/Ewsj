"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, BookOpen, Clock, GraduationCap } from "lucide-react";
import { IoDocumentText } from "react-icons/io5";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";

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

// Specify props type instead of using 'any'
interface TimetableFormProps {
  handleformdata: (data: TimetableFormValues, openState: boolean) => void;
}

export default function TimetableForm({ handleformdata }: TimetableFormProps) {
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
    setValue("subjects", subjects.filter((s) => s !== subject));
    setValue("priorities", priorities.filter((p) => p.subject !== subject));
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
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl shadow-lg mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 animate-pulse" />
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <GraduationCap className="w-12 h-12 text-yellow-300" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold text-white drop-shadow-md">
                Craft Your Epic Study Timetable
              </h2>
              <p className="text-blue-200 text-lg italic drop-shadow-sm">
                &quot;Master your goals with a schedule that shines!&quot;
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2 justify-end">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <BookOpen className="w-6 h-6 text-white/80" />
            </motion.div>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}>
              <Clock className="w-6 h-6 text-white/80" />
            </motion.div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="relative group"
          >
            <Label htmlFor="dailyRoutine" className="text-blue-200 font-semibold">
              Daily Routine
            </Label>
            <div className="relative mt-2">
              <input
                id="dailyRoutine"
                type="text"
                {...register("dailyRoutine")}
                placeholder="Describe your daily grind..."
                className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-inner group-hover:shadow-blue-500/20"
              />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
              >
                <IoDocumentText className="w-5 h-5" />
              </motion.div>
            </div>
            {errors.dailyRoutine && (
              <p className="text-red-400 text-sm mt-1">{errors.dailyRoutine.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <Label htmlFor="targetExam" className="text-purple-200 font-semibold">
              Target Exam
            </Label>
            <div className="relative mt-2">
              <input
                id="targetExam"
                {...register("targetExam")}
                placeholder="Your ultimate exam goal..."
                className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-inner group-hover:shadow-purple-500/20"
              />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400"
              >
                <GraduationCap className="w-5 h-5" />
              </motion.div>
            </div>
            {errors.targetExam && (
              <p className="text-red-400 text-sm mt-1">{errors.targetExam.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <Label htmlFor="studyHours" className="text-green-200 font-semibold">
              Study Hours
            </Label>
            <div className="relative mt-2">
              <input
                id="studyHours"
                type="number"
                {...register("studyHours", { valueAsNumber: true })}
                min="1"
                max="16"
                placeholder="Hours to conquer..."
                className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 shadow-inner group-hover:shadow-green-500/20"
              />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400"
              >
                <Clock className="w-5 h-5" />
              </motion.div>
            </div>
            {errors.studyHours && (
              <p className="text-red-400 text-sm mt-1">{errors.studyHours.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <Label className="text-yellow-200 font-semibold">Subjects</Label>
            <div className="space-y-4 mt-2">
              <div className="relative">
                <input
                  placeholder="Add subjects (press Enter)..."
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  onKeyDown={handleAddSubject}
                  className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 shadow-inner group-hover:shadow-yellow-500/20"
                />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400"
                >
                  <BookOpen className="w-5 h-5" />
                </motion.div>
              </div>

              <div className="space-y-3">
                {subjects.map((subject) => (
                  <motion.div
                    key={subject}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 bg-gray-700/70 p-3 rounded-xl shadow-md border border-gray-600 hover:bg-gray-600/70 transition-colors"
                  >
                    <span className="flex-grow text-white font-medium">{subject}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Priority (1-100)"
                        className="w-28 p-2 bg-gray-800/50 border border-gray-500 rounded-full text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-inner"
                        onChange={(e) => handleAddPriority(subject, parseInt(e.target.value))}
                      />
                      <motion.button
                        type="button"
                        onClick={() => handleRemoveSubject(subject)}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        className="p-2 rounded-full bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-xl border border-gray-600"
          >
            <Switch
              id="includeBreaks"
              checked={watch("includeBreaks")}
              onCheckedChange={(checked) => setValue("includeBreaks", checked)}
              className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-500"
            />
            <Label htmlFor="includeBreaks" className="text-blue-200 font-medium">
              Include Study Breaks
            </Label>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🚀
              </motion.span>
              Generate Your Timetable
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
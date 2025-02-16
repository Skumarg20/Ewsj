"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, BookOpen, Calendar, Clock, Tag, GraduationCap } from "lucide-react";
import { IoDocumentText } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";


const TimeFrame = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly'
} as const;

// Zod Schema based on the DTO
const subjectPrioritySchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  weightage: z.number().min(1).max(100, "Weightage must be between 1 and 100")
});

const timetableSchema = z.object({
  dailyRoutine: z.string().min(1, "Daily routine description is required"),
  studyHours: z.number().min(1).max(16, "Study hours must be between 1 and 16"),
  targetExam: z.string().min(1, "Target exam is required"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  priorities: z.array(subjectPrioritySchema).optional(),
  includeBreaks: z.boolean()
});

type TimetableFormValues = z.infer<typeof timetableSchema>;
type FormData = z.infer<typeof timetableSchema>;
export default function TimetableForm({handleformdata}:any) {
  const [subjectInput, setSubjectInput] = useState("");
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<TimetableFormValues>({
    resolver: zodResolver(timetableSchema),
    defaultValues: {
      subjects: [],
      priorities: [],
      includeBreaks: true,
    }
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
    setValue("subjects", subjects.filter(s => s !== subject));
    setValue("priorities", priorities.filter(p => p.subject !== subject));
  };

  const handleAddPriority = (subject: string, weightage: number) => {
    const newPriorities = [...priorities];
    const existingIndex = priorities.findIndex(p => p.subject === subject);
    
    if (existingIndex >= 0) {
      newPriorities[existingIndex] = { subject, weightage };
    } else {
      newPriorities.push({ subject, weightage });
    }
    
    setValue("priorities", newPriorities);
  };

  const onSubmit = (data: TimetableFormValues) => {
    handleformdata(data,false);
    
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Create Your Perfect Timetable
        </h1>
        <p className="text-lg text-gray-600">
          Customize your study schedule for maximum efficiency
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Daily Routine */}
          <div>
          <Label htmlFor="dailyRoutine">Daily Routine</Label>
          <div className="relative">
            <Input
              id="dailyRoutine"
              {...register("dailyRoutine")}
              placeholder="Describe your daily routine"
              className="pl-10 rounded-full"
            />
          
            <IoDocumentText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          </div>
          {errors.dailyRoutine && (
            <p className="text-red-500 text-sm">{errors.dailyRoutine.message}</p>
          )}
        </div>
        {/* Target Exam */}
        <div>
          <Label htmlFor="targetExam">Target Exam</Label>
          <div className="relative">
            <Input
              id="targetExam"
              {...register("targetExam")}
              placeholder="Enter your target exam"
              className="pl-10 rounded-full"
            />
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          </div>
          {errors.targetExam && (
            <p className="text-red-500 text-sm">{errors.targetExam.message}</p>
          )}
        </div>

      

        {/* Study Hours */}
        <div>
          <Label htmlFor="studyHours">Enter Your Study Hours for Today</Label>
          <div className="relative">
            <Input
              id="studyHours"
              type="number"
              {...register("studyHours", { valueAsNumber: true })}
              min="1"
              max="16"
              className="pl-10 rounded-full"
            />
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          </div>
          {errors.studyHours && (
            <p className="text-red-500 text-sm">{errors.studyHours.message}</p>
          )}
        </div>

      
      
        {/* Subjects and Priorities */}
        <div>
          <Label>Subjects</Label>
          <div className="space-y-2">
            <div className="relative">
              <Input
                placeholder="Add a subject and press Enter"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onKeyDown={handleAddSubject}
                className="pl-10 rounded-full"
              />
              <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>
            
            <div className="space-y-2">
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center gap-2 bg-gray-50 p-3 rounded-2xl">
                  <span className="flex-grow">{subject}</span>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Priority (1-100)"
                      className="w-32 rounded-full"
                      onChange={(e) => handleAddPriority(subject, parseInt(e.target.value))}
                      defaultValue={priorities.find(p => p.subject === subject)?.weightage}
                    />
                    <Button
                      type="button"
                      onClick={() => handleRemoveSubject(subject)}
                      variant="destructive"
                      className="rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Include Breaks Switch */}
        <div className="flex items-center space-x-2">
          <Switch
            id="includeBreaks"
            checked={watch("includeBreaks")}
            onCheckedChange={(checked) => setValue("includeBreaks", checked)}
          />
          <Label htmlFor="includeBreaks">Include study breaks in timetable</Label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full active:bg-blue-950"
        >
          Generate Timetable
        </Button>
      </form>
    </div>
  );
}
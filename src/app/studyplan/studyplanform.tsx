"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Clock, BookOpen, ListOrdered, X, Tag } from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";



export enum DurationUnit {
  Weeks = "weeks",
  Months = "months",
  Years = "years",
}

// Zod Schema
const studyPlanSchema = z.object({
  exam: z.string().min(1, "Exam name is required"),
  duration: z.number().positive("Duration must be positive"),
  durationUnit: z.nativeEnum(DurationUnit),
  isBoardExam: z.boolean(),
  dailyStudyHours: z.number().min(1).max(24),
  targetTopics: z.array(z.string()).optional(),
  targetQuestionsPerSubject: z.record(z.string(), z.number().positive()),
  probleminStudies: z.string().min(1, "This field is required"),
});

type StudyPlanFormValues = z.infer<typeof studyPlanSchema>;

export default function StudyPlanForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StudyPlanFormValues>({
    resolver: zodResolver(studyPlanSchema),
    defaultValues: {
      isBoardExam: false,
      targetTopics: [],
      targetQuestionsPerSubject: {},
    },
  });

  const addSubject = () => {
    setValue("targetQuestionsPerSubject", {
      ...watch("targetQuestionsPerSubject"),
      ["New Subject"]: 0,
    });
  };

  const [inputValue, setInputValue] = useState("");
  const topics = watch("targetTopics") || [];

  const handleAddTopic = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setValue("targetTopics", [...topics, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setValue("targetTopics", topics.filter((t) => t !== topic));
  };

  const onSubmit = (data: StudyPlanFormValues) => {
    console.log("Form data:", data);
  };

  const className =
    "rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow hover:border-blue-400 shadow-sm";

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="relative space-y-4 mb-8 flex flex-col items-center">
        <div className="absolute top-0 right-0 min-w-16 min-h-16 md:w-[20%] md:h-[20%] -z-5">
          <Image src='/studyplan' alt="Study Icon" layout="responsive" />
        </div>
        <h1 className="text-4xl font-bold text-left text-blue-600 z-10">
          Your Path to Success Starts Here
        </h1>
        <p className="text-lg text-center text-gray-600 z-10">
          Create Your Personalized Study Strategy
        </p>
      </div>

      <div className="absolute top-0 right-0 translate-x-4 -translate-y-4">
        <svg width="50" height="50" viewBox="0 0 50 50" className="text-blue-300">
          <path
            d="M25 0L30 20L40 25L30 30L25 50L20 30L10 25L20 20L25 0Z"
            fill="currentColor"
            className="animate-pulse"
          />
        </svg>
      </div>

      <form
        onSubmit={handleSubmit((data) => {
          console.log("Form submitted with data:", data); // Debugging log
          onSubmit(data);
        })}
        className="space-y-6"
      >
         <div>
          <Label htmlFor="exam">Exam Name</Label>
          <div className="relative w-full">
            <Input
              id="exam"
              {...register("exam")}
              placeholder="Enter exam name"
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow hover:border-blue-400 shadow-sm w-full"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <GraduationCap className="h-5 w-5" />
            </span>
          </div>
          {errors.exam && (
            <p className="text-red-500 text-sm">{errors.exam.message}</p>
          )}
        </div>

        {/* Duration & Unit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="duration">Duration</Label>
            <div className="relative w-full">
              <Input
                id="duration"
                type="number"
                {...register("duration", { valueAsNumber: true })}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow hover:border-blue-400 shadow-sm w-full"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Clock className="h-5 w-5" />
              </span>
            </div>
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="durationUnit">Duration Unit</Label>
            <Select
              onValueChange={(value) =>
                setValue("durationUnit", value as DurationUnit)
              }
            >
              <SelectTrigger className={className}>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent className="bg-slate-200 rounded-3xl">
                {Object.values(DurationUnit).map((unit) => (
                  <SelectItem
                    key={unit}
                    value={unit}
                    className={className.concat(
                      "m-3 mt-3 bg-slate-100 text-black"
                    )}
                  >
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Daily Study Hours */}
        <div>
          <Label htmlFor="dailyStudyHours">Daily Study Hours</Label>
          <div className="relative w-full">
            <Input
              id="dailyStudyHours"
              type="number"
              {...register("dailyStudyHours", { valueAsNumber: true })}
              min="1"
              max="24"
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow hover:border-blue-400 shadow-sm w-full"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <BookOpen className="h-5 w-5" />
            </span>
          </div>
          {errors.dailyStudyHours && (
            <p className="text-red-500 text-sm">
              {errors.dailyStudyHours.message}
            </p>
          )}
        </div>

        {/* Board Exam Checkbox */}
        <div className="flex items-center space-x-2">
          <Switch
            checked={watch("isBoardExam")}
            onCheckedChange={(value) => setValue("isBoardExam", value)}
          />
          <Label>Is this a board exam?</Label>
        </div>

        {/* Target Topics (Multi-select) */}
        <div>
          <Label htmlFor="targetTopics">Target Topics</Label>
          <div className="border p-2 flex flex-wrap items-center rounded-3xl">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
              >
                {topic}
                <button type="button" onClick={() => handleRemoveTopic(topic)}>
                  <X className="h-4 w-4 text-red-500 cursor-pointer" />
                </button>
              </div>
            ))}
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Tag className="h-5 w-5 mt-1" />
              </span>
              <Input
                id="targetTopics"
                placeholder="Type and press Enter..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleAddTopic}
                className="border border-gray-300 focus:ring-2 focus:ring-blue-500 w-auto rounded-full pl-10 py-2 mt-1"
              />
            </div>
          </div>
        </div>

        {/* Target Questions per Subject */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">
              Target Questions per Subject
            </h3>
            <Button
              type="button"
              onClick={addSubject}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              Add Subject
            </Button>
          </div>

          {Object.entries(watch("targetQuestionsPerSubject")).map(
            ([subject, count], index) => (
              <div key={index} className="flex gap-4 items-center">
                <Input
                  placeholder="Subject name"
                  value={subject}
                  onChange={(e) => {
                    const subjects = watch("targetQuestionsPerSubject");
                    const newSubjects = { ...subjects };
                    delete newSubjects[subject];
                    newSubjects[e.target.value] = subjects[subject];
                    setValue("targetQuestionsPerSubject", newSubjects);
                  }}
                  className={className}
                />
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <ListOrdered className="h-5 w-5" />
                  </span>
                  <Input
                    type="number"
                    placeholder="Number of questions"
                    {...register(`targetQuestionsPerSubject.${subject}`, {
                      valueAsNumber: true,
                    })}
                    className="pl-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    const subjects = watch("targetQuestionsPerSubject");
                    const newSubjects = { ...subjects };
                    delete newSubjects[subject];
                    setValue("targetQuestionsPerSubject", newSubjects);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-3xl"
                >
                  <X />
                </Button>
              </div>
            )
          )}
        </div>

        {/* <div>
          <Label htmlFor="probleminStudies">Describe the problem you're facing in your studies:</Label>
          <div className="relative w-full">
            <Input
              id="probleminStudies"
              {...register("probleminStudies")}
              placeholder="Explain your biggest study challenge here..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow hover:border-blue-400 shadow-sm w-full"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <GraduationCap className="h-5 w-5" />
            </span>
          </div>
          {errors.exam && (
            <p className="text-red-500 text-sm">{errors.exam.message}</p>
          )}
        </div> */}

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
        >
          Get Perfect Study Plan
        </Button>
      </form>
    </div>
  );
}
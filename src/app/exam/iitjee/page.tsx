"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  VideoIcon,
  BookOpen,
  Clock,
  Users,
  Award,
  ArrowRight,
  Calculator,
  Atom,
  FlaskConical,
  Lightbulb,
} from "lucide-react";
import VideoCard from "@/components/iitjee/VideoCard";
import PDFCard from "@/components/iitjee/PDFCard";
import contentData from "@/constant/iitjeecontent.json";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Video {
  title: string;
  src: string;
  thumbnail: string;
  duration: string;
}

interface PDF {
  title: string;
  description: string;
  fileUrl: string;
  subject: string;
}

interface Content {
  id: string;
  video: Video;
  pdf?: PDF;
}

export default function Page() {
  const [selectedVideo, setSelectedVideo] = useState<Content | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();

  const onHandleClick = () => {
    router.push("/mentorship");
  };

  const handleContentClick = (content: Content) => {
    setSelectedVideo(content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const allContent = contentData as Content[];

  // Extract unique subjects, safely handling missing pdf
  const rawSubjects = Array.from(
    new Set(
      allContent
        .filter((item) => item?.pdf?.subject)
        .map((item) => item.pdf!.subject.toLowerCase())
    )
  );

  // Include "all" and "study-tips" if no subjects exist
  const subjects = rawSubjects.length > 0 
    ? ["all", ...rawSubjects]
    : ["all", "study-tips"];

  // Filter content by active tab
  const filteredContent =
    activeTab === "all"
      ? allContent
      : activeTab === "study-tips"
      ? allContent // Show all content for study-tips as a fallback
      : allContent.filter(
          (item) => item?.pdf?.subject?.toLowerCase() === activeTab
        );

  // Extract YouTube video ID from src
  const getYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto rounded-xl">
          <div className="bg-gradient-to-b from-white to-cogenist-light rounded-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 animate-fade-in">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                    Master IIT-JEE with{" "}
                    <span className="bg-gradient-to-r from-cogenist-indigo to-cogenist-purple bg-clip-text text-transparent">
                      Cogenist
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 mb-6">
                    Join India&apos;s premier mentorship platform designed by
                    IITians to help you crack one of the toughest exams. Get
                    personalized guidance, advanced study materials, and
                    strategic preparation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="bg-gradient-to-r from-cogenist-indigo to-cogenist-purple hover:from-cogenist-purple hover:to-cogenist-indigo transition-all duration-300 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg flex items-center gap-2 normal-case"
                      onClick={() =>
                        window.open(
                          "https://pages.razorpay.com/pl_QGWUUbAvGJsarg/view",
                          "_blank"
                        )
                      }
                    >
                      <BookOpen size={20} />
                      Join Mentorship Program
                      <ArrowRight
                        size={18}
                        className="ml-1 animate-bounce-slow"
                      />
                    </Button>

                    <Button
                      className="border-cogenist-indigo text-cogenist-indigo hover:bg-cogenist-light normal-case"
                      onClick={onHandleClick}
                    >
                      Explore Resources
                    </Button>
                  </div>
                </div>
                <div className="order-1 md:order-2 flex justify-center">
                  <div className="relative">
                    <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-r from-cogenist-indigo/20 to-cogenist-purple/20 rounded-full absolute animate-pulse" />
                    <Image
                      src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      alt="Students studying"
                      width={600}
                      height={400}
                      className="w-full max-w-md rounded-2xl shadow-lg relative z-10"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-cogenist-light rounded-full flex items-center justify-center mb-4">
                    <Award className="text-cogenist-indigo" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Expert IITian Mentors
                  </h3>
                  <p className="text-gray-600">
                    Learn from mentors who have cracked IIT-JEE with top ranks
                    and understand what it takes to succeed.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-cogenist-light rounded-full flex items-center justify-center mb-4">
                    <Users className="text-cogenist-purple" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Personalized Guidance
                  </h3>
                  <p className="text-gray-600">
                    Get customized study plans, doubt-clearing sessions, and
                    regular performance analysis.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-cogenist-light rounded-full flex items-center justify-center mb-4">
                    <Clock className="text-cogenist-blue" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Strategic Preparation
                  </h3>
                  <p className="text-gray-600">
                    Optimize your preparation with time-tested strategies and
                    targeted practice materials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {selectedVideo && (
            <div className="mb-12 animate-fade-in">
              <div className="rounded-lg overflow-hidden shadow-xl max-w-4xl mx-auto">
                {getYouTubeId(selectedVideo.video.src) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo.video.src)}`}
                    title={selectedVideo.video.title}
                    className="w-full aspect-video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full aspect-video bg-gray-200 flex items-center justify-center text-gray-600">
                    Invalid YouTube URL
                  </div>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mt-6 text-gray-800">
                {selectedVideo.video.title}
              </h2>
              {selectedVideo.pdf && (
                <div className="mt-8 mb-12">
                  <div className="max-w-md">
                    <PDFCard
                      title={selectedVideo.pdf.title}
                      description={selectedVideo.pdf.description}
                      fileUrl={selectedVideo.pdf.fileUrl}
                      subject={selectedVideo.pdf.subject}
                    />
                  </div>
                </div>
              )}
              <button
                onClick={() => setSelectedVideo(null)}
                className="mt-4 px-4 py-2 bg-jeepurple-600 text-white rounded-lg hover:bg-jeepurple-700 transition-all duration-300"
              >
                Back to Videos
              </button>
            </div>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-5 mt-5"
          >
            <TabsList className="bg-gradient-to-r from-jeepurple-100 via-cogteal-200 to-jeepurple-200 rounded-2xl p-3 flex justify-start gap-2 sm:gap-4 w-full h-auto sm:w-auto flex-wrap shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-jeepurple-300/30 to-transparent animate-shimmer" />
              {subjects.map((subject, index) => (
                <TabsTrigger
                  key={subject}
                  value={subject}
                  className="group flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-bold text-jeepurple-800 bg-white/95 data-[state=active]:bg-gradient-to-r data-[state=active]:from-jeepurple-600 data-[state=active]:via-cogteal-500 data-[state=active]:to-jeepurple-500 data-[state=active]:text-cogteal-50 data-[state=active]:shadow-xl data-[state=active]:ring-2 data-[state=active]:ring-cogteal-300 data-[state=active]:animate-bounce-slow rounded-xl transition-all duration-300 hover:bg-jeepurple-100 hover:scale-105 hover:shadow-lg animate-slide-in-up z-10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {subject === "all" ? (
                    <VideoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-jeepurple-700 group-hover:text-cogteal-600 transition-colors duration-200" />
                  ) : subject === "study-tips" ? (
                    <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-jeepurple-700 group-hover:text-cogteal-600 transition-colors duration-200" />
                  ) : subject.toLowerCase() === "mathematics" ? (
                    <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-jeepurple-700 group-hover:text-cogteal-600 transition-colors duration-200" />
                  ) : subject.toLowerCase() === "physics" ? (
                    <Atom className="w-5 h-5 sm:w-6 sm:h-6 text-jeepurple-700 group-hover:text-cogteal-600 transition-colors duration-200" />
                  ) : subject.toLowerCase() === "chemistry" ? (
                    <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-jeepurple-700 group-hover:text-cogteal-600 transition-colors duration-200" />
                  ) : (
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-jeepurple-700 group-hover:text-cogteal-600 transition-colors duration-200" />
                  )}
                  <span className="capitalize">
                    {subject === "study-tips" ? "Study Tips" : subject}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-jeepurple-600 to-cogteal-600 mb-8 animate-slide-in-left">
                {activeTab === "all"
                  ? "Explore All Video Lessons & Materials"
                  : activeTab === "study-tips"
                  ? "Study Tips & Strategies"
                  : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Mastery Hub`}
              </h2>

              <div className="space-y-10">
                {activeTab === "study-tips" ? (
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-jeepurple-800 mb-4">
                      Top Study Tips for Exam Success
                    </h3>
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-cogteal-600" />
                        <span>
                          <strong>Create a Study Schedule:</strong> Plan your study sessions and stick to a routine to cover all topics systematically.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-cogteal-600" />
                        <span>
                          <strong>Practice Active Recall:</strong> Test yourself regularly to reinforce concepts and improve retention.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-cogteal-600" />
                        <span>
                          <strong>Take Breaks:</strong> Use techniques like Pomodoro to maintain focus and avoid burnout.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-cogteal-600" />
                        <span>
                          <strong>Stay Organized:</strong> Keep your notes and resources well-organized for quick revision.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-cogteal-600" />
                        <span>
                          <strong>Seek Help:</strong> Don’t hesitate to ask mentors or peers for clarification on difficult topics.
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : filteredContent.length > 0 ? (
                  filteredContent.map((content, index) => (
                    <div
                      key={content.id}
                      className="border-2 border-jeepurple-200 rounded-xl p-4 sm:p-6 bg-white shadow-lg hover:shadow-2xl hover:border-jeepurple-300 transition-all duration-300 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div
                          className={
                            content.pdf ? "md:col-span-2" : "md:col-span-3"
                          }
                        >
                          <VideoCard
                            title={content.video.title}
                            thumbnail={content.video.thumbnail}
                            duration={content.video.duration}
                            src={content.video.src}
                            onClick={() => handleContentClick(content)}
                          />
                        </div>
                        {content.pdf && (
                          <div className="md:col-span-1">
                            <PDFCard
                              title={content.pdf.title}
                              description={content.pdf.description}
                              fileUrl={content.pdf.fileUrl}
                              subject={content.pdf.subject}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-lg text-gray-500 text-center animate-fade-in">
                    No content available yet—stay tuned for {activeTab} lessons!
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t py-6 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>© 2025 Cogenist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
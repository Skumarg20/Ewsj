'use client';

import Hero from "./components/Hero";
import Services from "./components/Ourservice";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import Dashboard from "./screen/dashboard";
import Login from "./utils/SignIn";
import StopWatch from "./screen/stopwatch";
import TimeTable from "./components/timetableui";
import TimeTablePlan from "./timetable";
import ChatComponent from "./talksphere/components/chatcomponent";
import SessionUI from "./components/sessionui";
import HomeLayout from "@/components/homepage";

export default function Home() {
  return (
    <HomeLayout>
      <Hero />
      <Services />
      <Contact />
    </HomeLayout>
  );
}

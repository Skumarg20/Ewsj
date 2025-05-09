'use client';

import Hero from "./components/Hero";
import Services from "./components/Ourservice";
import Contact from "./components/Contact";
import HomeLayout from "@/components/homepage";
import AboutUs from "./components/aboutsus";

export default function Home() {
  return (
    <HomeLayout>
      <Hero />
      <div className="services">
        <Services />
      </div>
      <AboutUs/>
      
      <Contact />
    </HomeLayout>
  );
}

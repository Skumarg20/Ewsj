'use client';

import Hero from "./components/Hero";
import Services from "./components/Ourservice";
import Contact from "./components/Contact";
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

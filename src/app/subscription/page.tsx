"use client";

import { JSX, useState } from "react";
import Header from "@/components/subscriptioncomponent/Header";
import PlansSection from "@/components/subscriptioncomponent/PlansSection";
import SuccessStories from "@/components/subscriptioncomponent/SuccessStories";
import CTA from "@/components/subscriptioncomponent/CTA";
import Footer from "@/components/subscriptioncomponent/Footer";
import { SuccessStory } from "@/interface/type";
import { plans } from "@/components/subscriptioncomponent/plans";
import { featureIcons } from "@/components/subscriptioncomponent/featureIcons";
import { IoMdSchool, IoMdStar } from "react-icons/io";
import { FaLightbulb, FaStar } from "react-icons/fa";
import withAuth from "@/lib/withAuth";

 function Home(): JSX.Element {
  const [userPlan, setUserPlan] = useState<string>("free");

  const successStories: SuccessStory[] = [
    { icon: <IoMdSchool className="h-8 w-8 text-teal-500" />, title: "Top Mentors", desc: "Learn from the best to become the best." },
    { icon: <FaLightbulb className="h-8 w-8 text-yellow-500" />, title: "Smart Tools", desc: "Study smarter, not harder, with AI-powered tools." },
    { icon: <FaStar className="h-8 w-8 text-orange-500" />, title: "Big Results", desc: "Boost grades and confidence with proven strategies." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-900 overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10 pointer-events-none" />
    <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
      <Header userPlan={userPlan} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <PlansSection
            key={plan.id}
            plan={plan}
            featureIcons={featureIcons}
            setUserPlan={setUserPlan}
          />
        ))}
      </div>
      <SuccessStories stories={successStories} />
      <CTA />
      <Footer />
    </div>
  </div>
  );
}

export default withAuth(Home);
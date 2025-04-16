"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  Shield,
  BookOpen,
  UserCheck,
  UserPlus,
  ArrowLeft,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  Target,
  GraduationCap,
  Star,
  Smile,
  Heart,
  Clock,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import PricingCard from "@/components/PricingCard";
import FAQItem from "@/components/FAQItem";
import MobileCTA from "@/components/MobileCTA";


const CollegeCounselingPage = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setShowTooltip(prev=>!prev);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  const { toast } = useToast();

 
  const handleMobileCTA = () => {
    toast({
      title: "Ready to Start?",
      description: "Explore our plans to find your perfect fit.",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const services = [
    {
      title: "Free 10-Min Call",
      price: "₹0",
      description: "A quick chat to spark your journey",
      features: [
        "Overview of JoSAA/CSAB counselling process",
        "Basic idea of what colleges you can get",
        "Answer to your most urgent doubt",
        "Guidance on next steps based on your rank",
        "Understand what to expect in upcoming rounds",
      ],
      ctaText: "Book Free Call",
      paymentLink: "https://pages.razorpay.com/pl_QJqbaDUTLvC1jn/view",
      icon: <Phone className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "30-Min Senior Chat",
      price: "₹149",
      description: "Real insights from a pro",
      features: [
        "Talk to an IIT/NIT/IIIT senior who’s been through it",
        "Life at top colleges: hostel, placements, culture",
        "Learn from their mistakes during counselling",
        "Branch vs college choice – real-world opinion",
        "Get mental clarity before choice filling begins",
      ],
      ctaText: "Book Now",
      paymentLink: "https://pages.razorpay.com/pl_QJqqgdO4EYVPqT/view",
      icon: <Star className="h-8 w-8 text-teal-600" />,
      popular: true,
    },
    {
      title: "1-Hr 1:1 Session",
      price: "₹199",
      description: "Your personalized college plan",
      features: [
        "One-on-one guidance from our top counselling experts",
        "Get a personalized list of best-fit colleges & branches",
        "Understand how to fill smart choice orders",
        "Get advice based on your category, home state & quota",
        "Cutoff comparison for 2023, 2022, and your rank",
      ],
      ctaText: "Book Now",
      paymentLink: "https://pages.razorpay.com/pl_QJqx5k0dRQV2zd/view",
      icon: <UserCheck className="h-8 w-8 text-teal-600" />,
    },
    {
      title: "JoSAA Counseling",
      price: "₹999",
      description: "Master JoSAA & CSAB",
      features: [
        "Full support for JoSAA choice filling (all rounds)",
        "Customized college list based on your rank",
        "Strategy call for Round 1 to Final Round",
        "Live support while locking your choices",
        "Post-round advice + float/slide/freeze strategy",
      ],
      ctaText: "Get Started",
      paymentLink: "https://pages.razorpay.com/pl_QJr3ZlZxXhZKmV/view",
      icon: <GraduationCap className="h-8 w-8 text-teal-600" />,
    },
    {
      title: "JoSAA + CSAB + Private",
      price: "₹1299",
      description: "Cover every admission angle",
      features: [
        "All JoSAA & CSAB rounds support + private college help",
        "Private college shortlist (VIT, SRM, BITS, Shiv Nadar)",
        "Compare top private colleges vs NITs",
        "Help with multiple applications (forms, timelines)",
        "Your ideal list for seat security + backup options",
      ],
      ctaText: "Join Now",
      paymentLink: "https://pages.razorpay.com/pl_QJrF03IJT0IKOf/view",
      icon: <Target className="h-8 w-8 text-teal-600" />,
      popular: true,
    },
    {
      title: "Ultimate Counseling",
      price: "₹1699",
      description: "From JEE to Victory – Complete End-to-End Support",
      features: [
        "Full support for JoSAA, CSAB, State & Private counselling",
        "Live WhatsApp/Call support during all choice fillings",
        "Guidance till you get a confirmed seat in top college",
        "Branch & college prediction using our advanced tool",
        "ROI analysis, fee structure, hostel & placement data",
      ],
      ctaText: "Join Now",
      paymentLink: "https://pages.razorpay.com/pl_QJrHsUAAgU7kpM/view",
      icon: <Sparkles className="h-8 w-8 text-teal-600" />,
    },
  ];
  const faqs = [
    {
      question: "What’s JoSAA Counseling?",
      answer:
        "JoSAA (Joint Seat Allocation Authority) handles seat allocation for IITs, NITs, IIITs, and GFTIs based on JEE Main and Advanced ranks.",
      isOpen: true,
    },
    {
      question: "What’s a CSAB Special Round?",
      answer:
        "CSAB conducts additional rounds after JoSAA to fill vacant seats in NITs, IIITs, and GFTIs. These rounds are crucial if you didn’t get a seat earlier or want a better option.",
    },
    {
      question: "Can I switch branches later?",
      answer:
        "Yes, many institutes allow branch change after the first year, depending on your performance (CGPA) and seat availability in the desired branch.",
    },
    {
      question: "Will you guarantee a seat?",
      answer:
        "We don’t guarantee a seat, but we significantly improve your chances with smart choices, expert guidance, and proven strategies.",
    },
    {
      question: "Is this service for both JEE Main and Advanced students?",
      answer:
        "Absolutely! Whether you're aiming for NITs via JEE Main or IITs via JEE Advanced, our counseling covers all scenarios.",
    },
    {
      question: "What if I already got a seat but want a better one?",
      answer:
        "You can participate in further JoSAA rounds or CSAB special rounds to try for an upgrade. We help you plan this smartly without risking your current seat.",
    },
    {
      question: "How do I know if my choice filling is correct?",
      answer:
        "We review your academic profile, preferences, and trends to build a personalized, mistake-proof choice list for you.",
    },
    {
      question: "Is there a risk in participating in CSAB Special Rounds?",
      answer:
        "Yes, if not handled properly, you might lose your previous seat. We guide you on how to proceed safely without losing what you’ve secured.",
    },
    {
      question: "How much does this counseling cost?",
      answer:
        "We offer both free and premium personalized plans. Book a free call with our team to explore what suits you best.",
    },
    {
      question: "Will you help me understand college cutoffs?",
      answer:
        "Yes! We use past year data and real-time trends to guide you on where you stand and what’s realistically achievable.",
    },
    {
      question: "Do you assist with state counseling too?",
      answer:
        "Currently, our primary focus is on JoSAA and CSAB. But we do offer limited guidance on major state counseling processes upon request.",
    },
    {
      question: "Who are the mentors behind this?",
      answer:
        "Our team includes IITians and top NITians with years of experience in counseling and mentoring thousands of students successfully.",
    },
    {
      question: "Is this service online?",
      answer:
        "Yes, the entire process is online — from profile analysis to choice filling and doubt sessions. You can access it from anywhere in India.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
        .animate-pulse {
          animation: pulse 2s infinite ease-in-out;
        }
      `}</style>
      {/* Main Content */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 mb-12 overflow-hidden bg-gradient-to-br from-teal-600 to-blue-800">
          {/* Navigation Arrow */}
          <div className="absolute top-4 left-4 z-20 bg-slate-300 rounded-2xl">
            <Link href="/">
              <Button
                className="p-0 w-20 h-10 text-gray-700 hover:text-gray-900 transition-colors duration-300"
                aria-label="Navigate to home"
              >
                <ArrowLeft className="h-15 w-15" />
                <p className="font-bold">Home</p>
              </Button>
            </Link>
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight drop-shadow-lg">
              Unlock Your Dream College Seat
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Confused by JoSAA, CSAB, or private admissions? Our IITian mentors
              simplify everything — from rank analysis to mistake-proof choice
              filling.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button
                className="bg-white hover:bg-teal-50 text-teal-700 px-10 py-4 text-lg font-semibold rounded-full transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                onClick={() =>
                  window.open(
                    "https://pages.razorpay.com/pl_QJqbaDUTLvC1jn/view",
                    "_blank"
                  )
                } // Opens the link in a new tab
                aria-label="Book free 10-minute call"
              >
                <Phone className="h-5 w-5 mr-2" /> Free 10-Min Call
              </Button>
              <Button
                className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 text-lg font-semibold rounded-full transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                onClick={() =>
                  window.open("https://forms.gle/w7agAzveCkv7TqJEA", "_blank")
                } // Opens the Google Form in a new tab
                aria-label="Explore services"
              >
                <UserPlus className="h-5 w-5 mr-2" /> Fill this form
              </Button>
            </div>
          </div>
        </section>

        {/* 2. Why College Counselling Matters */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-12 bg-gradient-to-br from-teal-50 to-blue-50">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 flex items-center justify-center animate-fade-in-up">
            <Shield className="h-8 w-8 mr-2 text-teal-600" /> Why Counseling
            Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <Target className="h-16 w-16 text-teal-600 group-hover:text-teal-700 transition-colors duration-300" />
                ),
                title: "Too Many Choices?",
                description:
                  "Overwhelmed by options? We simplify it to find your perfect college match.",
              },
              {
                icon: (
                  <UserCheck className="h-16 w-16 text-teal-600 group-hover:text-teal-700 transition-colors duration-300" />
                ),
                title: "Mistake-Proof Picks",
                description:
                  "Scared of errors? We ensure your JoSAA/CSAB choices are spot-on.",
              },
              {
                icon: (
                  <BookOpen className="h-16 w-16 text-teal-600 group-hover:text-teal-700 transition-colors duration-300" />
                ),
                title: "Guided by Experts",
                description:
                  "Feeling lost? Our mentors pave a clear path to your dream college.",
              },
              {
                icon: (
                  <Clock className="h-16 w-16 text-teal-600 group-hover:text-teal-700 transition-colors duration-300" />
                ),
                title: "Time-Sensitive Guidance",
                description:
                  "Beat the clock. Get timely advice for choice locking and seat acceptance before deadlines hit.",
              },
              {
                icon: (
                  <Users className="h-16 w-16 text-teal-600 group-hover:text-teal-700 transition-colors duration-300" />
                ),
                title: "Parents’ Peace of Mind",
                description:
                  "We help families make informed decisions together. No confusion, just clarity.",
              },
              {
                icon: (
                  <ShieldCheck className="h-16 w-16 text-teal-600 group-hover:text-teal-700 transition-colors duration-300" />
                ),
                title: "Avoid Regret Later",
                description:
                  "One wrong choice can cost you years. We make sure that never happens.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="relative group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-teal-100 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                <div className="bg-gradient-to-br from-teal-200 to-blue-200 p-4 rounded-full mx-auto mb-6 w-24 h-24 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-teal-700 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Our Services */}
        <section
          id="services"
          className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 flex items-center justify-center animate-fade-in-up">
            <Star className="h-8 w-8 mr-2 text-teal-500" /> Your Plan, Your
            Future
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <PricingCard
                key={service.title}
                title={service.title}
                price={service.price}
                description={service.description}
                features={service.features}
                ctaText={service.ctaText}
                gradientClass="bg-gradient-to-br from-teal-50 to-blue-50"
                showDurationLabel={false}
                icon={service.icon}
                animationClass={`animate-fade-in-up`}
                paymentLink={service.paymentLink}
                popular={service.popular}
              />
            ))}
          </div>
        </section>

        {/* 4. How It Works */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-12 bg-gradient-to-br from-teal-50 to-blue-50">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 flex items-center justify-center animate-fade-in-up">
            <GraduationCap className="h-8 w-8 mr-2 text-teal-600" /> Your
            Roadmap to College Success
          </h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {[
              {
                icon: <Phone className="h-8 w-8 text-teal-600" />,
                title: "Free Kickoff Call",
                description:
                  "Talk to our expert in a 10-minute call. Understand how JoSAA & CSAB work, and get personalized clarity on your options.",
              },
              {
                icon: <Check className="h-8 w-8 text-teal-600" />,
                title: "Pick Your Support Plan",
                description:
                  "Choose the right plan — from quick doubt-clearing calls to full 1:1 guidance throughout all rounds of counselling.",
              },
              {
                icon: <UserCheck className="h-8 w-8 text-teal-600" />,
                title: "Deep-Dive 1:1 Counseling",
                description:
                  "Create your personalized preference list with an IITian mentor. Get branch insights, category advice & cutoff analysis.",
              },
              {
                icon: <Shield className="h-8 w-8 text-teal-600" />,
                title: "Lock with Confidence",
                description:
                  "Get real-time support on choice locking day. We’ll ensure you submit the safest yet smartest preference order.",
              },
              {
                icon: <Smile className="h-8 w-8 text-teal-600" />,
                title: "Post-Admission Support",
                description:
                  "Got your seat? We’ll help with document verification, college prep, and even hostel advice. You’re never alone in the journey.",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="flex items-start gap-6 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-teal-50 animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-teal-200 p-4 rounded-full transition-colors duration-300 group-hover:bg-teal-300">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-700 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Resources / FAQs */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-16 bg-gradient-to-br from-teal-50 to-white">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-900 flex items-center justify-center animate-fade-in-up">
            <BookOpen className="h-10 w-10 mr-3 text-teal-600 animate-pulse" />
            Clear Your Doubts
          </h2>
          <div className="p-8 bg-white rounded-3xl shadow-2xl animate-fade-in-up">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={faq.isOpen}
              />
            ))}
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-500 to-blue-700 text-white text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">
            Your Future Starts Here
          </h2>
          <p
            className="text-xl mb-8 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            Don’t leave your college to chance—connect with our experts now!
          </p>
          <Button
            className="bg-white hover:bg-teal-50 text-teal-700 px-12 py-5 text-xl font-semibold rounded-full transform hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
            onClick={() =>
              window.open(
                "https://pages.razorpay.com/pl_QJqbaDUTLvC1jn/view",
                "_blank"
              )
            }
            style={{ animationDelay: "200ms" }}
          >
            <Phone className="h-6 w-6 mr-2" /> Book Free Call
          </Button>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 flex items-center justify-center animate-fade-in-up">
            <Target className="h-8 w-8 mr-2 text-teal-500" /> Explore All Plans
          </h2>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg animate-fade-in-up">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-teal-50">
                  <th className="p-6 font-semibold text-gray-800 text-lg">
                    Plan
                  </th>
                  <th className="p-6 font-semibold text-gray-800 text-lg">
                    Price
                  </th>
                  <th className="p-6 font-semibold text-gray-800 text-lg">
                    What’s Included
                  </th>
                  <th className="p-6 font-semibold text-gray-800 text-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr
                    key={service.title}
                    className="border-b border-gray-200 hover:bg-teal-50 transition-colors duration-200"
                  >
                    <td className="p-6 text-gray-800 font-medium">
                      {service.title}
                    </td>
                    <td className="p-6 text-teal-600 font-semibold">
                      {service.price}
                    </td>
                    <td className="p-6">
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center text-gray-600"
                          >
                            <Check className="h-5 w-5 text-teal-500 mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-6">
                      <a
                        href={service.paymentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-300">
                          {service.ctaText}
                        </Button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center animate-fade-in-up">
            <Mail className="h-8 w-8 mr-2 text-teal-200" /> Connect With Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div
              className="flex items-center justify-center animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <Button
                variant="ghost"
                className="w-full flex items-center justify-center text-teal-100 hover:text-white hover:bg-teal-700/50 p-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <a href="tel:+919696402486">
                  <Phone className="h-6 w-6 mr-3 text-teal-200" />
                  <span>+91 9696402486</span>
                </a>
              </Button>
            </div>
            <div
              className="flex items-center justify-center animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <Button
                variant="ghost"
                className="w-full flex items-center justify-center text-teal-100 hover:text-white hover:bg-teal-700/50 p-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <a
                  href="https://wa.me/919696402486?text=Hi%2C%20I%27m%20interested%20in%20college%20counseling%21"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="h-6 w-6 mr-3 text-teal-200" />
                  <span>WhatsApp</span>
                </a>
              </Button>
            </div>
            <div
              className="flex items-center justify-center animate-fade-in-up"
              style={{ animationDelay: "300ms" }}
            >
              <Button
                variant="ghost"
                className="w-full flex items-center justify-center text-teal-100 hover:text-white hover:bg-teal-700/50 p-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <a href="mailto:cogenist@gmail.com">
                  <Mail className="h-6 w-6 mr-3 text-teal-200" />
                  <span>cogenist@gmail.com</span>
                </a>
              </Button>
            </div>
          </div>
          <div className="text-center">
            <p
              className="text-sm flex items-center justify-center animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              <Heart className="h-4 w-4 mr-2 text-teal-200" />© 2025 Cogenist |
              Built for Aspiring Engineers
            </p>
          </div>
        </div>
      </footer>

      <MobileCTA onClick={handleMobileCTA} />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-2">
  {showTooltip && (
    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-xl animate-fade-in-out transition-opacity duration-300">
      💬 Chat with us on WhatsApp!
    </div>
  )}

  <a
    href="https://wa.me/919696402486?text=Hi%2C%20I%27m%20interested%20in%20college%20counseling%21"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button
      className="bg-gradient-to-br from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-300 animate-pulse"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageSquare className="h-8 w-8" />
    </Button>
  </a>
</div>

    </div>
  );
};

export default CollegeCounselingPage;

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { LoadingProvider } from "@/app/loader/context/loadingprovider";
import { UpgradeProvider} from "@/context/UpgradeContext";
import LoadingSpinner from "./loader/LoadingSpinner";
import UpgradePopup from "@/components/UpgradePopup";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cogenist - AI-Powered Learning & Productivity Platform",
  description:
    "Cogenist is an AI-driven platform designed for IIT JEE & NEET aspirants, improving productivity, focus, and exam preparation.",
  openGraph: {
    title: "Cogenist - AI-Powered Learning & Productivity",
    description: "Boost your exam preparation with AI-powered tools for IIT JEE & NEET.",
    url: "https://cogenist.com",
    siteName: "Cogenist",
    images: [{ url: "https://ewsj12.s3.ap-south-1.amazonaws.com/coginest-logo+(1).png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cogenist - AI-Powered Learning",
    description: "Enhance your focus & time management for IIT JEE & NEET.",
    images: ["https://ewsj12.s3.ap-south-1.amazonaws.com/coginest-logo+(1).png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Cogenist",
    url: "https://cogenist.com",
    description:
      "Cogenist offers productivity tools, mentorship, and time management strategies for IIT JEE & NEET aspirants.",
    publisher: {
      "@type": "Organization",
      name: "Cogenist",
      logo: "https://ewsj12.s3.ap-south-1.amazonaws.com/coginest-logo+(1).png",
    },
  };
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 m-auto`}
      >
        <UpgradeProvider>
          <LoadingProvider>
            <div className="z-50">
               <UpgradePopup/>
            </div>
           
            <LoadingSpinner />
            <div className="border">{children}</div>
          </LoadingProvider>
        </UpgradeProvider>
        <Script
          src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"
          strategy="beforeInteractive"
        />
        <Script
          id="schema-markup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
     
      </body>
    </html>
  );
}

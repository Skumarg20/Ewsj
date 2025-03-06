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
  description: "Cogenist is an AI-driven platform designed to enhance student productivity, focus, and exam preparation with smart tools and personalized learning insights.",  
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
     
      </body>
    </html>
  );
}

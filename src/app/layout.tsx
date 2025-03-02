import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import {LoadingProvider }from "@/app/loader/context/loadingprovider"

import LoadingSpinner from "./loader/LoadingSpinner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cogenist",
  description: "Cogenist is a platform for students to learn and grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className=" scroll-smooth" lang="en" suppressHydrationWarning>
        <head>
      
        <Script
          src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"
          strategy="beforeInteractive" 
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-auto bg-white  text-gray-900`}
      >
        <LoadingProvider>
       
        <LoadingSpinner />
        <div className="">
          <div className="w-[100%] m-auto backdrop-blur-md sticky top-0 z-50 bg-slate-100">

         
          </div>
          <div className=" border">
          {children}
          </div>
        </div>
       
     
        </LoadingProvider>
      </body>
      
    </html>
  );
}

'use client';

import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React, { ReactNode } from 'react';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-[100%]  md:p-6 md:mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;

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
      <main className="flex-grow w-full mx-auto p-6">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;

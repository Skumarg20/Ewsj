'use client'

import { createContext, useContext, useState, ReactNode } from "react";

// Define context type
interface LoadingContextType {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
}

// Create Context
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Provider Component
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom Hook for easy access
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within LoadingProvider");
  return context;
};

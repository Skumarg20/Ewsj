'use client'
import { createContext, useContext, useState, useEffect } from "react";
import eventEmitter from "../lib/eventEmitter";

interface UpgradeContextType {
  isUpgradePopupVisible: boolean;
  showUpgradePopup: () => void;
  hideUpgradePopup: () => void;
}

const UpgradeContext = createContext<UpgradeContextType | undefined>(undefined);

export const UpgradeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUpgradePopupVisible, setUpgradePopupVisible] = useState(false);

  const showUpgradePopup = () => setUpgradePopupVisible(true);
  const hideUpgradePopup = () => setUpgradePopupVisible(false);

  useEffect(() => {
    // Listen for the 429 event and show the upgrade popup
    const handleShowPopup = () => setUpgradePopupVisible(true);

    eventEmitter.on("showUpgradePopup", handleShowPopup);

    return () => {
      eventEmitter.off("showUpgradePopup", handleShowPopup);
    };
  }, []);

  return (
    <UpgradeContext.Provider value={{ isUpgradePopupVisible, showUpgradePopup, hideUpgradePopup }}>
      {children}
    </UpgradeContext.Provider>
  );
};

// Custom hook for accessing the Upgrade context
export const useUpgrade = () => {
  const context = useContext(UpgradeContext);
  if (!context) {
    throw new Error("useUpgrade must be used within an UpgradeProvider");
  }
  return context;
};

// Global function to trigger the popup from outside React
export const triggerUpgradePopup = () => {
  eventEmitter.emit("showUpgradePopup");
};

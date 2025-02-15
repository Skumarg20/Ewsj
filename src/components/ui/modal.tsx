"use client"

import { CloseOutlined } from "@mui/icons-material";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";


// Modal Component
 interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    showCrossIcon?: boolean;
    maxWidth?: number;
  }

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  showCrossIcon = true,
  children,
  maxWidth = 520
}) => {

  if (!isOpen) return null;
  
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div
       className="relative bg-white rounded-lg shadow-lg p-4 w-[530px]"
    //    style={{ maxWidth: ${maxWidth}px }}
      >
        {showCrossIcon && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-2xl h-6 w-6 text-neutral-400 flex justify-center items-center rounded-full bg-white shadow-md"
          >
            <CloseOutlined sx={{fontSize:18}} />
          </button>
        )}
        <div className="  h-full w-full">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
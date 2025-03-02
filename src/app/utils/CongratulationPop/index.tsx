import { Button } from '@mui/material';
import React from 'react';

// Removed unused Props type and fixed the prop type definition
const CongratulationsPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center text-gray-900">
        <h2 className="text-2xl font-bold">🎉 Congratulations! 🎉</h2>
        <p className="mt-2">You have completed all your tasks!</p>
        <Button onClick={onClose} className="mt-4 bg-blue-600">Great!</Button>
      </div>
    </div>
  );
};

export default CongratulationsPopup;
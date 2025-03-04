"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Coffee, Sun } from "lucide-react";

interface SettingsPanelProps {
  settings: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
    autoStartBreaks: boolean;
    autoStartPomodoros: boolean;
  };
  onSave: (settings: SettingsPanelProps["settings"]) => void;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSave, onClose }) => {
  const [formValues, setFormValues] = useState({ ...settings });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : parseInt(value, 10),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formValues);
  };

  return (
    <div className="fixed h-[100%] inset-0 bg-black/70 flex items-center justify-center z-50 p-4 ">
      <motion.div
        className="bg-gradient-to-br h-[100%] from-purple-50 to-blue-50 rounded-2xl w-full max-w-md shadow-2xl border border-white/20 overflow-y-auto custom-scrollbar"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/30 flex justify-between items-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Clock className="w-6 h-6 animate-spin-slow" /> Tune Your Study Flow
          </h2>
          <motion.button
            whileHover={{ rotate: 90 }}
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-all"
          >
            <X size={24} className="text-white" />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Pomodoro Duration */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" /> Pomodoro (min)
            </label>
            <motion.input
              type="number"
              name="pomodoro"
              min="1"
              max="60"
              value={formValues.pomodoro}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white/80 text-gray-800 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          {/* Short Break Duration */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Coffee className="w-5 h-5 text-blue-500" /> Short Break (min)
            </label>
            <motion.input
              type="number"
              name="shortBreak"
              min="1"
              max="30"
              value={formValues.shortBreak}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white/80 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          {/* Long Break Duration */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-500" /> Long Break (min)
            </label>
            <motion.input
              type="number"
              name="longBreak"
              min="1"
              max="60"
              value={formValues.longBreak}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white/80 text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          {/* Auto-Start Breaks */}
          <div className="flex items-center gap-3">
            <motion.input
              type="checkbox"
              id="autoStartBreaks"
              name="autoStartBreaks"
              checked={formValues.autoStartBreaks}
              onChange={handleChange}
              className="h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-400 cursor-pointer"
              whileHover={{ scale: 1.1 }}
            />
            <label htmlFor="autoStartBreaks" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Coffee className="w-5 h-5 text-purple-500" /> Auto-Start Breaks
            </label>
          </div>

          {/* Auto-Start Pomodoros */}
          <div className="flex items-center gap-3">
            <motion.input
              type="checkbox"
              id="autoStartPomodoros"
              name="autoStartPomodoros"
              checked={formValues.autoStartPomodoros}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-400 cursor-pointer"
              whileHover={{ scale: 1.1 }}
            />
            <label htmlFor="autoStartPomodoros" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" /> Auto-Start Pomodoros
            </label>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              Save Vibes <Sun className="w-5 h-5" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SettingsPanel;
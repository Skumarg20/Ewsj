import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SettingsPanelProps {
  settings: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
    autoStartBreaks: boolean;
    autoStartPomodoros: boolean;
  };
  onSave: (settings: SettingsPanelProps['settings']) => void;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSave, onClose }) => {
  const [formValues, setFormValues] = useState({ ...settings });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : parseInt(value, 10)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formValues);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Timer Settings</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pomodoro Duration (minutes)
              </label>
              <input
                type="number"
                name="pomodoro"
                min="1"
                max="60"
                value={formValues.pomodoro}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 bg-white text-black"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Break Duration (minutes)
              </label>
              <input
                type="number"
                name="shortBreak"
                min="1"
                max="30"
                value={formValues.shortBreak}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 bg-white text-black"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Long Break Duration (minutes)
              </label>
              <input
                type="number"
                name="longBreak"
                min="1"
                max="60"
                value={formValues.longBreak}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 bg-white text-black"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoStartBreaks"
                name="autoStartBreaks"
                checked={formValues.autoStartBreaks}
                onChange={handleChange}
                className="h-4 w-4  rounded-xl bg-white text-black"
              />
              <label htmlFor="autoStartBreaks" className="ml-2 block text-sm text-gray-700">
                Auto-start breaks
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoStartPomodoros"
                name="autoStartPomodoros"
                checked={formValues.autoStartPomodoros}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded bg-white "
              />
              <label htmlFor="autoStartPomodoros" className="ml-2 block text-sm text-gray-700">
                Auto-start pomodoros
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-xl hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPanel;
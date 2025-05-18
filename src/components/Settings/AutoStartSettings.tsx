import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

const AutoStartSettings: React.FC = () => {
  const { settings, updateSettings } = useSettings();

  const toggleAutoStartBreaks = () => {
    updateSettings({ autoStartBreaks: !settings.autoStartBreaks });
  };

  const toggleAutoStartFocus = () => {
    updateSettings({ autoStartFocus: !settings.autoStartFocus });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700">Auto Start Breaks</label>
        <ToggleSwitch 
          enabled={settings.autoStartBreaks} 
          toggle={toggleAutoStartBreaks} 
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700">Auto Start Focus</label>
        <ToggleSwitch 
          enabled={settings.autoStartFocus} 
          toggle={toggleAutoStartFocus} 
        />
      </div>
    </div>
  );
};

interface ToggleSwitchProps {
  enabled: boolean;
  toggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, toggle }) => {
  return (
    <label className="inline-flex me-5 cursor-pointer">
  <input 
    type="checkbox" 
    className="sr-only peer" 
    checked={enabled}
    onChange={toggle}
  />
  <div className="relative w-12 h-6 bg-gray-200 peer-checked:bg-indigo-500 rounded-full 
    peer dark:bg-gray-300 
    dark:border-gray-600 dark:peer-checked:bg-indigo-500
    after:content-[''] after:absolute after:top-0.5 after:start-[2px] 
    after:bg-white after:border-gray-300 after:border after:rounded-full 
    after:h-5 after:w-5 after:transition-all duration-200 ease-in-out
    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
    peer-checked:after:border-white"></div>
</label>
  );
};

export default AutoStartSettings;
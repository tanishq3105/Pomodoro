import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

const SoundSettings: React.FC = () => {
  const { settings, updateSettings } = useSettings();

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  return (
    <div className='flex flex-col justify-center'>
      <h3 className="text-sm text-gray-600 mb-2">Sound</h3>
      
      <label className="inline-flex  me-5 cursor-pointer">
  <input 
    type="checkbox" 
    className="sr-only peer" 
    checked={settings.soundEnabled}
    onChange={toggleSound}
  />
  <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-teal-500 rounded-full 
    peer dark:bg-gray-300 
    dark:border-gray-600 dark:peer-checked:bg-teal-500
    after:content-[''] after:absolute after:top-0.5 after:start-[2px] 
    after:bg-white after:border-gray-300 after:border after:rounded-full 
    after:h-5 after:w-5 after:transition-all
    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
    peer-checked:after:border-white"></div>
</label>
    </div>
  );
};

export default SoundSettings;
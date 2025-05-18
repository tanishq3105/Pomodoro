import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

const TimerSettings: React.FC = () => {
  const { settings, updateSettings } = useSettings();

  const handleChange = (field: string, value: number) => {
    updateSettings({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <TimerSetting
          label="Focus Time"
          value={settings.focusTime}
          onChange={(value) => handleChange('focusTime', value)}
          min={5}
          max={60}
        />
        <TimerSetting
          label="Short Break"
          value={settings.shortBreakTime}
          onChange={(value) => handleChange('shortBreakTime', value)}
          min={1}
          max={15}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TimerSetting
          label="Long Break"
          value={settings.longBreakTime}
          onChange={(value) => handleChange('longBreakTime', value)}
          min={5}
          max={30}
        />
        <TimerSetting
          label="Pomodoro Set"
          value={settings.pomodoroSet}
          onChange={(value) => handleChange('pomodoroSet', value)}
          min={1}
          max={10}
        />
      </div>
    </div>
  );
};

interface TimerSettingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

const TimerSetting: React.FC<TimerSettingProps> = ({
  label,
  value,
  onChange,
  min,
  max
}) => {
  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      <div className="flex items-center">
        <button
          onClick={decrease}
          className="w-8 h-8 flex items-center justify-center text-lg bg-gray-100 rounded-l-md hover:bg-gray-200 border border-gray-300"
          disabled={value <= min}
        >
          -
        </button>
        <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white">
          {value}
        </div>
        <button
          onClick={increase}
          className="w-8 h-8 flex items-center justify-center text-lg bg-gray-100 rounded-r-md hover:bg-gray-200 border border-gray-300"
          disabled={value >= max}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default TimerSettings;
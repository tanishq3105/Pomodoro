import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

interface TimerCircleProps {
  percentage: number;
  timerState: 'focus' | 'shortBreak' | 'longBreak';
}

const TimerCircle: React.FC<TimerCircleProps> = ({ percentage, timerState }) => {
  const { settings } = useSettings();
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 16;
  
  // Set stroke color based on timer state and theme
  const getStrokeColor = () => {
    if (settings.theme === 'blue') {
      return timerState === 'focus' ? '#6366F1' : '#818CF8';
    } else if (settings.theme === 'coral') {
      return timerState === 'focus' ? '#F97316' : '#FB923C';
    } else { // teal
      return timerState === 'focus' ? '#14B8A6' : '#2DD4BF';
    }
  };

  return (
    <div className="relative">
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#E5E7EB"
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          strokeWidth={strokeWidth}
          stroke={getStrokeColor()}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percentage / 100) * circumference}
          className="transition-all duration-200 ease-linear"
        />
      </svg>
    </div>
  );
};

export default TimerCircle;
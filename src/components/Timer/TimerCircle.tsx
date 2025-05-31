import React from 'react';

interface TimerCircleProps {
  percentage: number;
  timerState: 'focus' | 'shortBreak' | 'longBreak';
}

const TimerCircle: React.FC<TimerCircleProps> = ({ percentage, timerState }) => {
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 12;
  
  const getStrokeColor = () => {
    return timerState === 'focus' ? '#F97316' : '#FB923C';
  };

  return (
    <div className="relative">
      <svg
        width="280"
        height="280"
        viewBox="0 0 280 280"
        className="transform -rotate-90 w-[280px] h-[280px] md:w-[300px] md:h-[300px]"
      >
        {/* Background circle */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#E5E7EB"
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx="140"
          cy="140"
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
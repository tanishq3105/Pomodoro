import React from 'react';


interface TimerCircleProps {
  percentage: number;
  timerState: 'focus' | 'shortBreak' | 'longBreak';
}

const TimerCircle: React.FC<TimerCircleProps> = ({ percentage, timerState }) => {
 
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 16;
  
  // Set stroke color based on timer state and theme
  const getStrokeColor = () => {
      return timerState === 'focus' ? '#F97316' : '#FB923C';
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
import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { useTimer } from '../../contexts/TimerContext';

const TimerControls: React.FC = () => {
  const { isActive, isPaused, startTimer, pauseTimer, resetTimer, skipTimer } = useTimer();
  
  return (
    <div className="flex items-center space-x-6">
      <button
        onClick={resetTimer}
        className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <RotateCcw className="h-5 w-5" />
      </button>
      
      <button
        onClick={isActive && !isPaused ? pauseTimer : startTimer}
        className={`outline-none w-16 h-16 rounded-full flex items-center justify-center bg-indigo-500 text-white shadow-lg transition-transform transform hover:scale-105 `}
      >
        {isActive && !isPaused ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6 ml-1" />
        )}
      </button>

      <button
        onClick={skipTimer}
        className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <SkipForward className="h-5 w-5" />
      </button>
      
      
    </div>
  );
};

export default TimerControls;
import React from 'react';
import { useTimer } from '../../contexts/TimerContext';
import { useSettings } from '../../contexts/SettingsContext';
import TimerControls from './TimerControls';
import TimerCircle from './TimerCircle.tsx';

const TimerDisplay: React.FC = () => {
  const { seconds, timerState } = useTimer();
  const { settings } = useSettings();
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getTotalSeconds = (): number => {
    if (timerState === 'focus') {
      return settings.focusTime * 60;
    } else if (timerState === 'shortBreak') {
      return settings.shortBreakTime * 60;
    } else {
      return settings.longBreakTime * 60;
    }
  };

  const getSessionLabel = (): string => {
    if (timerState === 'focus') {
      return 'Focus Time';
    } else if (timerState === 'shortBreak') {
      return 'Short Break';
    } else {
      return 'Long Break';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 w-full max-w-xl px-4">
      <h2 className="text-xl md:text-2xl font-bold text-indigo-600">Focus Session</h2>
      
      <div className="relative w-[280px] md:w-auto">
        <TimerCircle 
          percentage={(seconds / getTotalSeconds()) * 100} 
          timerState={timerState}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">{formatTime(seconds)}</h1>
          <p className="text-lg md:text-xl text-gray-500 mt-2">{getSessionLabel()}</p>
        </div>
      </div>
      
      <TimerControls />
    </div>
  );
};

export default TimerDisplay;
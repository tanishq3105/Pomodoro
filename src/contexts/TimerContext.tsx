import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSettings } from './SettingsContext';
import { 
  playNotificationSound, 
  preloadNotificationSounds, 
  showBrowserNotification 
} from '../utils/notification';

type TimerState = 'focus' | 'shortBreak' | 'longBreak';

interface TimerContextType {
  seconds: number;
  isActive: boolean;
  isPaused: boolean;
  timerState: TimerState;
  completedPomodoros: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipTimer: () => void;
  focusTimeSpent: number;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useSettings();
  const [seconds, setSeconds] = useState(settings.focusTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>('focus');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [currentPomodoro, setCurrentPomodoro] = useState(1);
  const [focusTimeSpent, setFocusTimeSpent] = useState(0);

  // Preload notification sounds when component mounts
  useEffect(() => {
    // Always preload sounds regardless of settings to avoid latency if user enables sound later
    preloadNotificationSounds();
  }, []);

  // Reset timer when settings change
  useEffect(() => {
    if (timerState === 'focus') {
      setSeconds(settings.focusTime * 60);
    } else if (timerState === 'shortBreak') {
      setSeconds(settings.shortBreakTime * 60);
    } else {
      setSeconds(settings.longBreakTime * 60);
    }
  }, [settings, timerState]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            // Play notification with zero latency (sound was preloaded)
            playNotificationSound(settings.soundEnabled);
            
            // Show appropriate notification based on the next state
            if (timerState === 'focus') {
              const isLongBreak = currentPomodoro % settings.pomodoroSet === 0;
              showBrowserNotification(
                isLongBreak ? 'Time for a long break!' : 'Time for a short break!', 
                { 
                  body: `You completed ${currentPomodoro} pomodoro${currentPomodoro > 1 ? 's' : ''}!`,
                  tag: 'pomodoro-break'
                }
              );
              
              setCompletedPomodoros(prev => prev + 1);
              if (isLongBreak) {
                setTimerState('longBreak');
                return settings.longBreakTime * 60;
              } else {
                setTimerState('shortBreak');
                return settings.shortBreakTime * 60;
              }
            } else {
              showBrowserNotification('Focus time!', { 
                body: 'Time to get back to work.',
                tag: 'pomodoro-focus'
              });
              
              if (timerState === 'longBreak') {
                setCurrentPomodoro(1);
              } else {
                setCurrentPomodoro(prev => prev + 1);
              }
              setTimerState('focus');
              return settings.focusTime * 60;
            }
          } 
          
          // Track focus time spent
          if (timerState === 'focus') {
            setFocusTimeSpent(prev => prev + 1);
          }
          
          return prevSeconds - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timerState, currentPomodoro, settings]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    if (timerState === 'focus') {
      setSeconds(settings.focusTime * 60);
    } else if (timerState === 'shortBreak') {
      setSeconds(settings.shortBreakTime * 60);
    } else {
      setSeconds(settings.longBreakTime * 60);
    }
    setIsActive(false);
    setIsPaused(false);
  };

  const skipTimer = () => {
    if (timerState === 'focus') {
      if (currentPomodoro % settings.pomodoroSet === 0) {
        setTimerState('longBreak');
        setSeconds(settings.longBreakTime * 60);
      } else {
        setTimerState('shortBreak');
        setSeconds(settings.shortBreakTime * 60);
      }
    } else {
      if (timerState === 'longBreak') {
        setCurrentPomodoro(1);
      } else {
        setCurrentPomodoro(prev => prev + 1);
      }
      setTimerState('focus');
      setSeconds(settings.focusTime * 60);
    }
    setIsActive(false);
    setIsPaused(false);
  };

  return (
    <TimerContext.Provider
      value={{
        seconds,
        isActive,
        isPaused,
        timerState,
        completedPomodoros,
        startTimer,
        pauseTimer,
        resetTimer,
        skipTimer,
        focusTimeSpent
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
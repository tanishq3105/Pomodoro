import React from 'react';
import { 
  LayoutDashboard,  
  Clock 
} from 'lucide-react';
import { useTimer } from '../../contexts/TimerContext';
import { useTasks } from '../../contexts/TaskContext';

const Sidebar: React.FC = () => {
  const { completedPomodoros, focusTimeSpent } = useTimer();
  const { completedTasks } = useTasks();
  
  const hoursSpent = Math.floor(focusTimeSpent / 3600);
  const efficiency = completedPomodoros > 0 
    ? Math.round((completedTasks / completedPomodoros) * 100) 
    : 0;

  return (
    <div className="w-64 bg-indigo-600 text-white h-full flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center space-x-2">
        <Clock className="h-6 w-6" />
        <h1 className="text-xl font-bold">Flowdoro</h1>
      </div>
      
      {/* Nav Links */}
      <nav className="flex-1 py-6">
        <NavItem icon={<LayoutDashboard />} label="Dashboard" active />
      </nav>
      
      {/* Stats */}
      <div className="p-4 bg-indigo-700 rounded-tl-lg">
        <h2 className="text-indigo-200 font-semibold mb-4">Today's Progress</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-3xl font-bold">{completedPomodoros}</p>
            <p className="text-xs text-indigo-200">Pomodoros</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{completedTasks}</p>
            <p className="text-xs text-indigo-200">Tasks Done</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold">{hoursSpent}h</p>
            <p className="text-xs text-indigo-200">Focus Time</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{efficiency}%</p>
            <p className="text-xs text-indigo-200">Efficiency</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => {
  return (
    <a 
      href="#" 
      className={`flex items-center space-x-3 px-6 py-3 hover:bg-indigo-700 transition-colors ${
        active ? 'bg-indigo-700' : ''
      }`}
    >
      <span className="text-indigo-200">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
};

export default Sidebar;
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import TimerDisplay from '../Timer/TimerDisplay';
import TasksPanel from '../Tasks/TaskPanel';
import SettingsPanel from '../Settings/SettingsPanel';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Center Content - Timer */}
          <div className="flex-1 p-4 flex flex-col items-center justify-center overflow-y-auto">
            <TimerDisplay />
          </div>
          
          {/* Right Sidebar - Tasks and Settings */}
          <div className="w-80 bg-white shadow-lg overflow-y-auto">
            <SettingsPanel />
            <TasksPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
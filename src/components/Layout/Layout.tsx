import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import TimerDisplay from '../Timer/TimerDisplay';
import TasksPanel from '../Tasks/TaskPanel';
import SettingsPanel from '../Settings/SettingsPanel';
import { X } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Sliding Menu */}
        <div 
          className={`relative w-64 h-full bg-indigo-700 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full">
            <Sidebar />
            <div className="p-2 flex flex-col justify-start">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Settings Overlay */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
          isSettingsOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 backdrop-blur-sm"
          onClick={() => setIsSettingsOpen(false)}
        />
        
        {/* Sliding Settings Panel */}
        <div 
          className={`relative w-80 h-full bg-white ml-auto transform transition-transform duration-300 ease-in-out ${
            isSettingsOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-bold">Settings</h2>
            <button 
              onClick={() => setIsSettingsOpen(false)}
              className="hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <SettingsPanel />
        </div>
      </div>

      <div className="flex h-full">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            onMenuClick={() => setIsMenuOpen(true)}
            onSettingsClick={() => setIsSettingsOpen(true)}
          />
          
          <div className="flex flex-1 overflow-hidden">
            {/* Center Content - Timer */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <TimerDisplay />
              </div>
              
              {/* Tasks Panel - Only visible on mobile */}
              <div className="md:hidden">
                <TasksPanel />
              </div>
            </div>

            {/* Right Sidebar - Hidden on mobile */}
            <div className="hidden md:block w-80 bg-white shadow-lg overflow-y-auto">
              <SettingsPanel />
              <TasksPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
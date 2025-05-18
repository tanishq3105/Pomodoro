import React from 'react';
import { Bell } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

const Header: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-gray-700">{formattedDate}</h2>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
          </button>
          <UserAvatar />
        </div>
      </div>
    </header>
  );
};

const UserAvatar: React.FC = () => {
 
  
  return (
    <div className={`bg-teal-500 rounded-full h-8 w-8 flex items-center justify-center text-white font-medium`}>
      TK
    </div>
  );
};

export default Header;
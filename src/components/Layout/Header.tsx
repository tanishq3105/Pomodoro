import React from 'react';
import { Bell, Menu, Settings2 } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onSettingsClick }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-sm md:text-base text-gray-700">{formattedDate}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onSettingsClick}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <Settings2 className="h-6 w-6" />
          </button>
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
    <div className="bg-teal-500 rounded-full h-8 w-8 flex items-center justify-center text-white font-medium">
      TK
    </div>
  );
};

export default Header;
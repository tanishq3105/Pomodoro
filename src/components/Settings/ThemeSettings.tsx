import React from 'react';


const ThemeSettings: React.FC = () => {
  return (
    <div>
      <h3 className="text-sm text-gray-600 mb-2">Theme</h3>
      <div className="flex space-x-2">
        <ThemeButton 
          color="bg-indigo-500"  
        />
        <ThemeButton 
          color="bg-orange-500" 
        />
        <ThemeButton 
          color="bg-teal-500" 
        />

        
      </div>
    </div>
  );
};

interface ThemeButtonProps {
  color: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ color }) => {
  return (
    <button
      className={`h-8 w-8 rounded-full ${color} flex items-center justify-center transition-transform
      }`}
    >
    </button>
  );
};

export default ThemeSettings;
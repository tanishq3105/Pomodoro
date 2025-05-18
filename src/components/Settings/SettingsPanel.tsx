
import TimerSettings from './TimerSettings';
import ThemeSettings from './ThemeSettings';
import SoundSettings from './SoundSettings';

const SettingsPanel: React.FC = () => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Settings</h2>
      
      <div className="space-y-6">
        <TimerSettings />
        <div className="grid grid-cols-2 gap-6">
          <ThemeSettings />
          <SoundSettings />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
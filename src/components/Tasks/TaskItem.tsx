import React from 'react';
import { Trash2 } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import { useSettings } from '../../contexts/SettingsContext';

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
  };
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, deleteTask } = useTasks();
  const { settings } = useSettings();
  
  const getPriorityColor = (priority: string) => {
    if (priority === 'high') {
      return 'text-red-500';
    } else if (priority === 'medium') {
      return 'text-orange-500';
    } else {
      return 'text-green-500';
    }
  };
  
  const getPriorityDots = (priority: string) => {
    if (priority === 'high') {
      return '●●●';
    } else if (priority === 'medium') {
      return '●●';
    } else {
      return '●';
    }
  };
  
  // Get checkbox color based on theme
  const getCheckboxColor = () => {
    if (settings.theme === 'blue') {
      return 'text-indigo-600';
    } else if (settings.theme === 'coral') {
      return 'text-orange-500';
    } else { // teal
      return 'text-teal-500';
    }
  };

  return (
    <div className={`flex items-start justify-between p-2 rounded-md ${
      task.completed ? 'bg-gray-50' : 'hover:bg-gray-50'
    } transition-colors group`}>
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className={`mt-1 h-4 w-4 rounded border-gray-300 ${getCheckboxColor()} focus:ring-indigo-500`}
        />
        <div className="ml-3">
          <p className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
            {task.title}
          </p>
          <span className={`text-xs ${getPriorityColor(task.priority)}`}>
            {getPriorityDots(task.priority)}
          </span>
        </div>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-gray-400 md:hover:text-red-500 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TaskItem;
import React, { useState } from 'react';
import { useTasks } from '../../contexts/TaskContext';

interface AddTaskProps {
  onCancel: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onCancel }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const { addTask } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim(), priority);
      setTitle('');
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-gray-50 rounded-md">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task name"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        autoFocus
      />
      
      <div className="mt-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <PriorityButton 
            value="low" 
            label="Low" 
            current={priority} 
            onClick={setPriority} 
          />
          <PriorityButton 
            value="medium" 
            label="Med" 
            current={priority} 
            onClick={setPriority} 
          />
          <PriorityButton 
            value="high" 
            label="High" 
            current={priority} 
            onClick={setPriority} 
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

interface PriorityButtonProps {
  value: 'low' | 'medium' | 'high';
  label: string;
  current: string;
  onClick: (value: 'low' | 'medium' | 'high') => void;
}

const PriorityButton: React.FC<PriorityButtonProps> = ({ 
  value, label, current, onClick 
}) => {
  const getColor = () => {
    if (value === 'high') {
      return current === value 
        ? 'bg-red-100 text-red-800 border-red-300' 
        : 'hover:bg-red-50 text-gray-600';
    } else if (value === 'medium') {
      return current === value 
        ? 'bg-orange-100 text-orange-800 border-orange-300' 
        : 'hover:bg-orange-50 text-gray-600';
    } else {
      return current === value 
        ? 'bg-green-100 text-green-800 border-green-300' 
        : 'hover:bg-green-50 text-gray-600';
    }
  };

  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`px-2 py-1 text-xs rounded-md border ${getColor()} transition-colors`}
    >
      {label}
    </button>
  );
};

export default AddTask;
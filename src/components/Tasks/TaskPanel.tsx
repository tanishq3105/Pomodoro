import React, { useState } from 'react';
import { useTasks } from '../../contexts/TaskContext';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

const TasksPanel: React.FC = () => {
  const { tasks } = useTasks();
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <div className="border-t border-gray-200 px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <input type="checkbox" className="mr-2 h-4 w-4 text-indigo-600" checked readOnly />
          Today's Tasks
        </h2>
      </div>
      
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
        
        {showAddTask ? (
          <AddTask onCancel={() => setShowAddTask(false)} />
        ) : (
          <button
            onClick={() => setShowAddTask(true)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mt-4"
          >
            <span className="text-xl mr-2">+</span>
            <span>Add New Task</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TasksPanel;
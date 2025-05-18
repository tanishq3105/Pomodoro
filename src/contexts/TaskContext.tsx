import React, { createContext, useState, useContext, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, priority: 'low' | 'medium' | 'high') => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  completedTasks: number;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

// Sample initial tasks
const initialTasks: Task[] = [
  { id: '1', title: 'Morning team meeting', completed: true, priority: 'medium' },
  { id: '2', title: 'Review project requirements', completed: true, priority: 'high' },
  { id: '3', title: 'Design wireframes for new landing page', completed: false, priority: 'high' },
  { id: '4', title: 'Prepare presentation for client', completed: false, priority: 'medium' },
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  
  const [completedTasks, setCompletedTasks] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setCompletedTasks(tasks.filter(task => task.completed).length);
  }, [tasks]);

  const addTask = (title: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        completedTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
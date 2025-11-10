import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext.jsx';

// Task Context Hook
export default function useTaskContext() {
  const context = useContext(TaskContext);

  // Catch error
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }

  return context;
}
import { create } from 'zustand';
import useMessageStore from './useMessageStore';

const useTaskStore = create((set, get) => ({
  tasks: [],
  
  // Load tasks from localStorage when app starts
  initializeTasks: () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      set({ tasks: JSON.parse(savedTasks) });
    }
  },
  
  // Save tasks to localStorage
  saveTasks: (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },
  
  addTask: (taskTitle) => {
    try {
      // Validation: Check if task title is empty
      if (!taskTitle.trim()) {
        useMessageStore.getState().setMessage('Task title cannot be empty!', 'error');
        return;
      }
      
      const newTask = {
        id: Date.now(),
        title: taskTitle.trim(),
        completed: false
      };
      
      const updatedTasks = [...get().tasks, newTask];
      set({ tasks: updatedTasks });
      get().saveTasks(updatedTasks);
      useMessageStore.getState().setMessage('Task added successfully!', 'success');
    } catch (error) {
      useMessageStore.getState().setMessage('Error adding task', 'error');
    }
  },
  
  removeTask: (id) => {
    try {
      const updatedTasks = get().tasks.filter(task => task.id !== id);
      set({ tasks: updatedTasks });
      get().saveTasks(updatedTasks);
      useMessageStore.getState().setMessage('Task removed successfully!', 'success');
    } catch (error) {
      useMessageStore.getState().setMessage('Error removing task', 'error');
    }
  },
  
  toggleTask: (id) => {
    try {
      const updatedTasks = get().tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      set({ tasks: updatedTasks });
      get().saveTasks(updatedTasks);
      useMessageStore.getState().setMessage('Task status updated!', 'success');
    } catch (error) {
      useMessageStore.getState().setMessage('Error updating task', 'error');
    }
  },
}));

export default useTaskStore;

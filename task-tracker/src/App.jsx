import { useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Snackbar from './components/Snackbar';
import useTaskStore from './store/useTaskStore';

const App = () => {
  const initializeTasks = useTaskStore(state => state.initializeTasks);
  
  // Load saved tasks when app starts
  useEffect(() => {
    initializeTasks();
  }, [initializeTasks]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Task Tracker</h1>
        </div>
        <TaskForm />
        <TaskList />
        <Snackbar />
      </div>
    </div>
  );
};

export default App;

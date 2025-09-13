import useTaskStore from '../store/useTaskStore';

const TaskList = () => {
  const { tasks, removeTask, toggleTask } = useTaskStore();
  
  // Sort tasks: incomplete tasks first, then completed tasks
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Task List</h2>
      {sortedTasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Add one above!</p>
      ) : (
        <ul className="list-none p-0">
          {sortedTasks.map(task => (
            <li key={task.id} className="flex items-center mb-2 p-2 rounded-md bg-gray-100">
              <span className={`flex-grow mr-4 text-left ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </span>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="mr-2 h-4 w-4 text-green-500 cursor-pointer"
              />
              <button
                onClick={() => removeTask(task.id)}
                className="bg-red-500 text-white rounded-md py-1 px-2 cursor-pointer hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

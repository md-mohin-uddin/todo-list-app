import { useState } from "react";
import "./App.css";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");
  const [editingTask, setEditingTask] = useState(null);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTasks = [
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        completed: false,
        priority,
      },
    ];
    setTasks(newTasks);
    setNewTask("");
    setPriority("low");
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? { ...task, title: newTask, priority } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setNewTask("");
    setPriority("low");
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <label htmlFor="newTask">New Task:</label>
        <input
          type="text"
          id="newTask"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};

export default App;

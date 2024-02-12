import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";

const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");
  const [editingTask, setEditingTask] = useState(null);
  const [filterPriority, setFilterPriority] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTask(taskToEdit);
    setNewTask(taskToEdit.title);
    setPriority(taskToEdit.priority);
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

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = filterPriority
    ? tasks.filter((task) => task.priority === filterPriority)
    : tasks;

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
        {editingTask ? (
          <button onClick={updateTask}>Update Task</button>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>
      <div>
        Filter by Priority:
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed Tasks: {tasks.filter((task) => task.completed).length}</p>
      </div>
      <TodoList
        tasks={filteredTasks}
        onEdit={editTask}
        onDelete={deleteTask}
        onToggleStatus={toggleTaskStatus}
      />
    </div>
  );
};

export default App;

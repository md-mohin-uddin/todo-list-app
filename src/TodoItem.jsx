/* eslint-disable react/prop-types */
const priorities = {
  low: "green",
  medium: "orange",
  high: "red",
};

const TodoItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className={`todo-item ${task.completed ? "completed" : ""}`}>
      <span style={{ color: priorities[task.priority] }}>{task.priority}</span>
      <span>{task.title}</span>
      <div>
        <button onClick={() => onToggleStatus(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => onEdit(task.id)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;

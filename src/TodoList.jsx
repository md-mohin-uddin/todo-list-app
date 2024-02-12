/* eslint-disable react/prop-types */

import TodoItem from "./TodoItem";

const TodoList = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default TodoList;

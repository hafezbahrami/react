import React from "react";
import "./TodoListItem.css";

const TodoListItem = ({
  todo,
  onRemovedPressed_prop,
  onCompletedPressed_prop,
}) => {
  return (
    <div className="todo-item-container">
      <h3>{todo.text}</h3>
      <div className="buttons-container">
        {todo.isCompleted ? null : (
          <button
            className="completed-button"
            onClick={() => onCompletedPressed_prop(todo.id)}
          >
            Mark As Completed
          </button>
        )}
        <button
          className="remove-button"
          onClick={() => onRemovedPressed_prop(todo.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;

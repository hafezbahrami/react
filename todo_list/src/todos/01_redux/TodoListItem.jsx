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
        {todo.isComplete ? null : (
          <button
            className="completed-button"
            onClick={() => onCompletedPressed_prop(todo.text)}
          >
            Mark As Completed
          </button>
        )}
        <button
          className="remove-button"
          onClick={() => onRemovedPressed_prop(todo.text)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;

import React, { useState } from "react";
import "./NewTodoForm.css";

const NewTodoForm = () => {
  // Create a piece of state, and initialize it to `true`
  // `inputValue` will hold the current value of the state,
  // and `setInputValue` will let us change it
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="new-todo-form">
      <input
        className="new-todo-input"
        type="text"
        placeholder="Type your new todo here"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="new-todo-button">Create Todo</button>
    </div>
  );
};

export default NewTodoForm;

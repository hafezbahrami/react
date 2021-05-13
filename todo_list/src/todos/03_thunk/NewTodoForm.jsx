import React, { useState } from "react";
import { connect } from "react-redux";
//import { create_todo_Action } from "./action.js";
import { add_todo_request_thunk } from "./thunk.js";
import "./NewTodoForm.css";

const NewTodoForm = ({ updated_state_from_reducer, onCreatePressed_prop }) => {
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
      <button
        onClick={() => {
          const isTextDuplicated = updated_state_from_reducer.some(
            (item) => item.text === inputValue
          );
          if (!isTextDuplicated) {
            onCreatePressed_prop(inputValue);
            setInputValue("");
          }
        }}
        className="new-todo-button"
      >
        Create Todo
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  updated_state_from_reducer: state.todo_reducer_1,
});
const mapDispatchToProps = (dispatch) => ({
  onCreatePressed_prop: (text) => dispatch(add_todo_request_thunk(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);

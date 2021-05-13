import {
  create_todo_Action,
  remove_todo_action,
  mark_todo_as_completed,
  load_todos_in_progress_action,
  load_todos_success_action,
  load_todos_failure_action,
} from "./action.js";

export const load_todo_thunk = () => async (dispatch, state) => {
  try {
    dispatch(load_todos_in_progress_action());
    const response = await fetch("http://localhost:8080/todos");
    const todos = await response.json();
    dispatch(load_todos_success_action(todos));
  } catch (e) {
    dispatch(load_todos_failure_action());
    dispatch(displayAlert(e));
  }
};

export const add_todo_request_thunk = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch("http://localhost:8080/todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body,
    });
    const todo = await response.json();
    dispatch(create_todo_Action(todo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const remove_todo_request_thunk = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "delete",
    });
    const todo = await response.json();
    dispatch(remove_todo_action(todo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const mark_todo_as_completed_thunk = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8080/todos/${id}/completed`,
      {
        method: "post",
      }
    );
    const updatedTodo = await response.json();
    dispatch(mark_todo_as_completed(updatedTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const displayAlert = (text) => {
  alert("fetching to server 8080 was not possible, with error: ", text);
};

import React from "react";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";

const inistialState = [{ text: "Hello" }, { text: "Hello2" }];
const TodoList = ({ todos = inistialState }) => {
  console.log("GGG: ", todos);
  return (
    <div className="list-wrapper">
      <NewTodoForm />
      {todos.map((todo_item) => (
        <TodoListItem todo={todo_item} />
      ))}
    </div>
  );
};

export default TodoList;

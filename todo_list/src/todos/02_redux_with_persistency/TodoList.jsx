import React from "react";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import { connect } from "react-redux";
import { remove_todo_action, mark_todo_as_completed } from "./action";
import "./TodoList.css";

const inistialState = [{ text: "Hello" }, { text: "Hello2" }];

const TodoList = ({
  updated_state_from_reducer = inistialState,
  onRemovedPressed_prop,
  onCompletedPressed_prop,
}) => {
  return (
    <div className="list-wrapper">
      <NewTodoForm />
      {updated_state_from_reducer.map((todo_item) => (
        <TodoListItem
          todo={todo_item}
          onRemovedPressed_prop={onRemovedPressed_prop}
          onCompletedPressed_prop={onCompletedPressed_prop}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  updated_state_from_reducer: state.todo_reducer_1,
});

const mapDispatchToProps = (dispatch) => ({
  onRemovedPressed_prop: (text) => dispatch(remove_todo_action(text)),
  onCompletedPressed_prop: (text) => dispatch(mark_todo_as_completed(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

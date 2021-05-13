import React, { useEffect } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import { connect } from "react-redux";
import {
  load_todo_thunk,
  remove_todo_request_thunk,
  mark_todo_as_completed_thunk,
} from "./thunk.js";
import "./TodoList.css";

const inistialState = [{ text: "Hello" }, { text: "Hello2" }];

const TodoList = ({
  updated_state_from_reducer = inistialState,
  onRemovedPressed_prop,
  onCompletedPressed_prop,
  isoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  console.log("lllll: ", updated_state_from_reducer);
  const loading_message = <div> Loading todos... </div>;
  const rendered_content = (
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
  return isoading ? loading_message : rendered_content;
};

const mapStateToProps = (state) => ({
  updated_state_from_reducer: state.todo_reducer_1,
  isoading: state.isLoading_reducer_2,
});

const mapDispatchToProps = (dispatch) => ({
  onRemovedPressed_prop: (id) => dispatch(remove_todo_request_thunk(id)),
  onCompletedPressed_prop: (id) => dispatch(mark_todo_as_completed_thunk(id)),
  startLoadingTodos: () => dispatch(load_todo_thunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

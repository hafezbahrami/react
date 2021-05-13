// action for creating a todo
export const CREATE_TODO = "CREATE_TODO";
export const create_todo_Action = (todo) => ({
  type: CREATE_TODO,
  payload: { todo },
});

//  for remove_todo
export const REMOVE_TODO = " REMOVE_TODO";
export const remove_todo_action = (todo) => ({
  type: REMOVE_TODO,
  payload: { todo },
});

//  for markeing a todo as completed
export const MARKE_TODO_AS_COMPLETED = "MARKE_TODO_AS_COMPLETED";
export const mark_todo_as_completed = (todo) => ({
  type: MARKE_TODO_AS_COMPLETED,
  payload: { todo },
});

//  for loading todos from server8080
export const LOAD_TODOS_IN_PROGRESS = "LOAD_TODOS_IN_PROGRESS";
export const load_todos_in_progress_action = () => ({
  type: LOAD_TODOS_IN_PROGRESS,
});

export const LOAD_TODOS_SUCCESS = "LOAD_TODOS_SUCCESS";
export const load_todos_success_action = (todos) => ({
  type: LOAD_TODOS_SUCCESS,
  payload: { todos },
});

export const LOAD_TODOS_FAILURE = "LOAD_TODOS_FAILURE";
export const load_todos_failure_action = () => ({
  type: LOAD_TODOS_FAILURE,
});

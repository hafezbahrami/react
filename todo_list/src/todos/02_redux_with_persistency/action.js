// action for creating a todo
export const CREATE_TODO = "CREATE_TODO";
export const create_todo_Action = (text) => ({
  type: CREATE_TODO,
  payload: { text },
});

//  for remove_todo
export const REMOVE_TODO = " REMOVE_TODO";
export const remove_todo_action = (text) => ({
  type: REMOVE_TODO,
  payload: { text },
});

//  for remove_todo
export const MARKE_TODO_AS_COMPLETED = "MARKE_TODO_AS_COMPLETED";
export const mark_todo_as_completed = (text) => ({
  type: MARKE_TODO_AS_COMPLETED,
  payload: { text },
});

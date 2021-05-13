import { CREATE_TODO, REMOVE_TODO, MARKE_TODO_AS_COMPLETED } from "./action.js";

export const todo_reducer_1 = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_TODO: {
      const { text } = payload;
      const new_todo_item = {
        text,
        isComplete: false,
      };
      return state.concat(new_todo_item);
    }
    case REMOVE_TODO: {
      const { text } = payload;
      const updated_state = state.filter((item) => item.text !== text);
      return updated_state;
    }
    case MARKE_TODO_AS_COMPLETED: {
      const { text } = payload;
      const updated_state = state.map((item) => {
        if (item.text === text) {
          return {
            ...item,
            isComplete: true,
          };
        }
        return item;
      });
      return updated_state;
    }
    default:
      return state;
  }
};

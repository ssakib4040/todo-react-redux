import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [
      {
        id: 1,
        name: "todo 1",
      },

      {
        id: 2,
        name: "todo 2",
      },

      {
        id: 3,
        name: "todo 3",
      },
    ],
  },
  reducers: {
    saveTodo: (state, action) => {
      state.todoList.push({
        id: Date.now(),
        name: action.payload,
      });
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    updateTodo: (state, action) => {
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id
          ? { ...action.payload, name: action.payload.name }
          : todo
      );
    },
  },
});

export const { saveTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;

import { useState } from "react";
import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, saveTodo, updateTodo } from "./todoSlice";

function App() {
  const todos = useSelector((state) => state.todo.todoList);
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!value) return;

    dispatch(saveTodo(value));
    setValue("");
  };

  return (
    <div className="App">
      <form onSubmit={handleAdd}>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />{" "}
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo}></TodoItem>;
        })}
      </ul>
    </div>
  );
}

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.name);
  const dispatch = useDispatch();

  console.log(todo);

  const handleEdit = (e) => {
    e.preventDefault();
    if (!editValue) return;

    dispatch(
      updateTodo({
        id: todo.id,
        name: editValue,
      })
    );
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <form onSubmit={handleEdit}>
            <input
              type="text"
              onChange={(e) => setEditValue(e.target.value)}
              value={editValue}
            />
            <button type="submit">Update</button>
            <button
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </form>
        </>
      ) : (
        <span>
          {todo.name}{" "}
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>{" "}
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this item?")
              ) {
                dispatch(deleteTodo(todo.id));
              }
            }}
          >
            Delete
          </button>
        </span>
      )}
    </li>
  );
}

export default App;

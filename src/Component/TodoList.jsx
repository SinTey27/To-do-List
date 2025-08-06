import React, { useState } from "react";
import {
  BiCheckDouble,
  BiEdit,
  BiRefresh,
  BiTrash,
  BiX,
  BiCheckCircle,
  BiReset,
} from "react-icons/bi";
import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      if (editIndex !== -1) {
        const updateTodos = [...todos];
        updateTodos[editIndex] = {
          task: inputValue,
          completed: updateTodos[editIndex].completed,
        };
        setTodos(updateTodos);
        setInputValue("");
        setEditIndex(-1);
      } else {
        setTodos([...todos, { task: inputValue, completed: false }]);
        setInputValue("");
      }
    }
  };

  const startEdit = (index) => {
    setInputValue(todos[index].task);
    setEditIndex(index);
  };

  const cancelEdit = () => {
    setInputValue("");
    setEditIndex(-1);
  };

  const removeTodo = (index) => {
    const updateTodos = todos.filter((_, i) => i !== index);
    setTodos(updateTodos);
  };

  const toggleCompleted = (index) => {
    const updateTodos = [...todos];
    updateTodos[index].completed = !updateTodos[index].completed;
    setTodos(updateTodos);
  };

  return (
    <>
      <h1 style={{ color: "black" }}>
        {" "}
        Youth Impact Development Association.{" "}
      </h1>

      <div className="todo-container">
        <h1>To-Do List</h1>
        <div className="input-section">
          <input
            type="text"
            className="input-field"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Write your tasks..."
          />
          {editIndex !== -1 ? (
            <>
              <button className="update-btn" onClick={addTodo}>
                <BiCheckDouble />
              </button>
              <button className="cancel-btn" onClick={cancelEdit}>
                <BiRefresh />
              </button>
            </>
          ) : (
            <button className="add-btn" onClick={addTodo}>
              Add
            </button>
          )}
        </div>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className={todo.completed ? "completed" : ""}>
              {todo.task}
              <div className="btn-group">
                <button className="btn-edit" onClick={() => startEdit(index)}>
                  <BiEdit />
                </button>
                <button
                  className="btn-remove"
                  onClick={() => removeTodo(index)}
                >
                  <BiTrash />
                </button>
                <button
                  className="btn-done"
                  onClick={() => toggleCompleted(index)}
                >
                  {todo.completed ? <BiReset /> : <BiCheckCircle />}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoList;

import React, { useState } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState("");
  const [listInputs, setListInputs] = useState({});

  const handleAddTodo = () => {
    if (headingInput.trim() !== "") {
      setTodos([...todos, { heading: headingInput, lists: [] }]);
      setHeadingInput("");
    }
  };
  const handleAddList = (listIndex) => {
    if (listInputs[listIndex] && listInputs[listIndex].trim() !== "") {
      const newTodos = [...todos];
      newTodos[listIndex].lists.push(listInputs[listIndex]);
      setTodos(newTodos);
      setListInputs({ ...listInputs, [listIndex]: "" });
    }
  };
  const handleListInputChange = (listIndex, value) => {
    setListInputs({ ...listInputs, [listIndex]: value });
  };
  const handleDeleteTodo = (todoIndex) => {
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };
  const handleDeleteList = (todoIndex, listIndex) => {
    const newTodos = [...todos];
    newTodos[todoIndex].lists.splice(listIndex, 1);
    setTodos(newTodos);
  };
  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(e) => {
              setHeadingInput(e.target.value);
            }}
          />
          <button className="add-list-button" onClick={handleAddTodo}>
            Add Heading
          </button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((todo, todoIndex) => (
          <div key={todoIndex} className="todo-card">
            <div className="heading_todo">
              <h3>{todo.heading}</h3>
              <button
                className="delete-button-heading"
                onClick={() => handleDeleteTodo(todoIndex)}
              >
                Delete Heading{" "}
              </button>
            </div>
            <ul>
              {todo.lists.map((list, listIndex) => (
                <li key={listIndex} className="todo_inside_list">
                  <p>{list}</p>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteList(todoIndex, listIndex)}
                  >
                    Delete List
                  </button>
                </li>
              ))}
            </ul>
            <div className="add_list">
              <input
                type="text"
                className="list-input"
                placeholder="Add List"
                value={listInputs[todoIndex] || ""}
                onChange={(e) =>
                  handleListInputChange(todoIndex, e.target.value)
                }
              />
              <button
                className="add-list-button"
                onClick={() => handleAddList(todoIndex)}
              >
                Add List
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;

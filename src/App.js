import React, { useState, useEffect } from "react";
import "./App.css";
import APIHelper from "./APIHelper.js";
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos();
      setTodos(todos);
    };
    fetchTodoAndSetTodos();
  }, []);

  const createTodo = async e => {
    e.preventDefault();
    if (!todo) {
      alert("please enter something");
      return;
    }
    if (todos.some(({ task }) => task === todo)) {
      alert(`Task: ${todo} already exists`);
      return;
    }
    const newTodo = await APIHelper.createTodo(todo);
    console.log(newTodo);
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      await APIHelper.deleteTodo(id);
      setTodos(todos.filter(({ _id: i }) => id !== i));
    } catch (err) {}
  };

  const updateTodo = async (e, id) => {
    e.stopPropagation();
    const payload = {completed: !todos.find(todo => todo._id === id).completed}
    const updatedTodo  = await APIHelper.updateTodo(id, payload);
    setTodos(todos.map((todo)=> todo._id === id ? updatedTodo: todo));
    
  };

  return (
    <div className="App">
      <h1>ToDo List App</h1>
      <div className="inputBlock">
        <input
          type="text"
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
          placeholder="Enter a todo"
        />
        <button type="button" onClick={createTodo}>
          <FaPlusCircle />
        </button>
      </div>

      <ul>
        {todos.length ? todos.map(({ _id, task, completed }, i) => (
          <li
            key={i}
            onClick={e => updateTodo(e, _id)}
            className={completed ? "completed" : ""}
          >
            {++i} {task} <span onClick={e => deleteTodo(e, _id)}><FaTrashAlt /></span>
          </li>
        )): <p>No Todo's here.</p>}
      </ul>
    </div>
  );
}

export default App;

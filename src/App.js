import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import TodosList from "./components/TodosList";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [showOnlyImportant, setShowOnlyImportant] = useState(false); // Novo estado

  useEffect(() => {
    fetch("todos.json")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  }, []);

  // Função para filtrar os todos importantes
  const filterImportantTodos = () => {
    return todos.filter((todo) => todo.important);
  };

  // Função para atualizar o estado do checkbox
  const handleCheckboxChange = () => {
    setShowOnlyImportant(!showOnlyImportant);
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>
        <div>
          <Form
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
          />
        </div>
        <div>
          <div className="importante">
            <input
              type="checkbox"
              id="important"
              name="important"
              value="important"
              checked={showOnlyImportant} // Vincule o estado do checkbox ao estado showOnlyImportant
              onChange={handleCheckboxChange} // Trate a alteração do checkbox
            />
            <label htmlFor="important">Importante</label>
          </div>
          <TodosList
            todos={showOnlyImportant ? filterImportantTodos() : todos} // Se showOnlyImportant for verdadeiro, filtre os todos importantes, caso contrário, exiba todos os todos
            setTodos={setTodos}
            setEditTodo={setEditTodo}
            setInput={setInput}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
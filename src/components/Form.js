import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  const [important, setImportant] = useState(false);

  const updateTodo = async () => {
    try {
      await axios.put(`http://localhost:3001/todo/${editTodo.id}`, {
        ...editTodo,
        title: input,
        important: important,
      });
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTodo.id) {
          return { ...todo, title: input, important: important };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setInput("");
      setImportant(false);
      setEditTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:3001/todo', {
        title: input,
        important: important,
      });
      setTodos([...todos, response.data]);
      setInput("");
      setImportant(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, important: false }]);
      setInput("");
    } else {
      updateTodo();
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <input
          type="text"
          placeholder="Adicione uma anotação..."
          className="task-input"
          value={input}
          required
          onChange={(event) => setInput(event.target.value)}
        />
        {/* quando edit for prescionado não terá addTodo*/}
        <button
          className="button-add"
          type="submit"
          onClick={editTodo ? updateTodo : addTodo}>
          {editTodo ? "OK" : "Adicionar"}
        </button>

      </div>
      <div className="importante">
        <input
          type="checkbox"
          id="important"
          name="important"
          value="important"
          checked={important}
          onChange={() => setImportant(!important)}
        />
        <label htmlFor="important">Importantes</label>
      </div>
    </form>
  );
};

export default Form;
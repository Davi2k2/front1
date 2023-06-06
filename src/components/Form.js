import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const updateTodo = async () => {
    try {
      await axios.put(`http://localhost:3001/todo/${editTodo.id}`, {
        ...editTodo,
        title: input,
      });
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTodo.id) {
          return { ...todo, title: input};
        }
        return todo;
      });
      setTodos(updatedTodos);
      setInput("");
      setEditTodo(null);
      setSuccessMessage("Item atualizado com sucesso!");

      // Remove a mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setErrorMessage("");
    } catch (error) {
      console.error('Error updating todo:', error);
      setSuccessMessage("");
      setErrorMessage("Erro ao atualizar item!");

      // Remove a mensagem de erro após 3 segundos
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const addTodo = async () => {
    if (input.trim() === "") {
      setErrorMessage("Campo de anotação vazio!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/todo', {
        title: input,
      });
      setTodos([...todos, response.data]);
      setInput("");
      setSuccessMessage("Item adicionado com sucesso!");

      // Remove a mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setErrorMessage("");
    } catch (error) {
      console.error('Error adding todo:', error);
      setSuccessMessage("");
      setErrorMessage("Erro ao adicionar item!");

      // Remove a mensagem de erro após 3 segundos
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <form onSubmit={onFormSubmit}>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div>
        <input
          type="text"
          placeholder="Adicione uma anotação..."
          className="task-input"
          value={input}
          required
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          className="button-add"
          type="submit"
          onClick={editTodo ? updateTodo : addTodo}
        >
          {editTodo ? "Editar" : "Adicionar"}
        </button>
      </div>
    </form>
  );
};

export default Form;
import React, { useEffect } from "react";
import axios from 'axios';

const TodosList = ({ todos, setTodos, setEditTodo, setInput }) => {
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/todo');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todo/${id}`);
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const updateTodo = (todo) => {
    setEditTodo(todo);
   setInput(todo.title);
  };

  return (
    <div>
      {todos.map((todo) => (
        <li className={`list-item ${todo.important ? "important" : ""}`} key={todo.id}>
          <span className={`list ${todo.important ? "important" : ""}`}>
            {todo.title}
          </span>
          
          <div className="main-edition">
            <button className="button-complete task-button" onClick={() => handleComplete(todo)}>
              <img src="/imagem/check.png" alt="imagem" />
            </button>
            <button className="button-edit task-button" onClick={() => updateTodo (todo)}>
              <img src="/imagem/edit.png" alt="imagem" />
            </button>
            <button className="button-delete task-button" onClick={() => deleteTodo (todo.id)}>
              <img src="/imagem/trash.png" alt="imagem" />
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default TodosList;
import React, { useState } from 'react';
import { createTodo } from '../services/todo';

const TodoForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTodo = await createTodo({
        title,
      });
      onSubmit(newTodo);
      setTitle('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;

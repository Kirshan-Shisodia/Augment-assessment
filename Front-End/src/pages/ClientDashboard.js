import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData, getData } from '../services/api';
import TodoList from '../components/TodoList';

const ClientDashboard = ({ user }) => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getData();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      const newTodo = await postData(todo);
      setTodos([...todos, newTodo]);
      setTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">Welcome, {user.name}!</h2>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="mb-6">
        <form className="flex" onSubmit={handleCreateTodo}>
          <input
            className="border border-gray-400 p-2 w-full rounded-l-lg"
            type="text"
            placeholder="Create new todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            required
          />
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded-r-lg hover:bg-blue-600"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
      <TodoList todos={todos} />
    </div>
  );
};

export default ClientDashboard;

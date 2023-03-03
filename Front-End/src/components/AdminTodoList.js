import React from 'react';
import TodoItem from './TodoItem';

const AdminTodoList = ({ todos, onDelete }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              isAdmin
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTodoList;

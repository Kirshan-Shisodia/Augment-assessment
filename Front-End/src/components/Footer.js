import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-6">
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Todo App
        </Link>
        <ul className="flex">
          <li className="mr-4">
            <Link to="/client/dashboard" className="hover:text-gray-400">
              Client Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/dashboard" className="hover:text-gray-400">
              Admin Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

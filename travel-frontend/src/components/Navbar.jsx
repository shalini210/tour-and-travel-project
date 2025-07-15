import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onLogout }) {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded ${
      location.pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-blue-600 hover:bg-blue-100'
    }`;

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center mb-4">
      <div className="flex gap-4">
        <Link to="/" className={linkClass('/')}>Dashboard</Link>
        <Link to="/packages" className={linkClass('/packages')}>Packages</Link>
        <Link to="/destinations" className={linkClass('/destinations')}>Destinations</Link>
      </div>
      <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </nav>
  );
}

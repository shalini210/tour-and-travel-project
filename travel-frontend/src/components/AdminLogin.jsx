import React, { useState } from 'react';

export default function AdminLogin({ setLoggedIn }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      localStorage.setItem('adminToken', 'true');
      setLoggedIn(true);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-white max-w-sm mx-auto p-6 mt-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-3"
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button className="bg-blue-600 w-full text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

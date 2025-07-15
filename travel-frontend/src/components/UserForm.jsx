import React, { useState } from 'react';
import api from '../api';

export default function UserForm() {
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/users', user);
    alert('User added!');
    setUser({ name: '', email: '', password: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Add User</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
    </form>
  );
}

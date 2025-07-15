import React, { useState, useEffect } from 'react';
import api from '../api';

export default function DestinationForm({ editing, setEditing }) {
  const [form, setForm] = useState({ name: '', location: '', description: '' });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('location', form.location);
    data.append('description', form.description);
    images.forEach((file) => data.append('images', file));

    if (editing && editing._id) {
      await api.put(`/destinations/${editing._id}`, data);
      alert('Destination updated!');
    } else {
      await api.post('/destinations', data);
      alert('Destination added!');
    }

    setForm({ name: '', location: '', description: '' });
    setImages([]);
    setEditing(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">
        {editing ? 'Edit Destination' : 'Add Destination'}
      </h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        className="mb-2"
        type="file"
        multiple
        onChange={(e) => setImages(Array.from(e.target.files))}
      />
      <button className="bg-purple-600 text-white px-4 py-2 rounded">
        {editing ? 'Update' : 'Add'} Destination
      </button>
    </form>
  );
}

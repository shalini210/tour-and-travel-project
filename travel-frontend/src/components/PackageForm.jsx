import React, { useState, useEffect } from 'react';
import api from '../api';

export default function PackageForm({ editing, setEditing }) {
  const [form, setForm] = useState({ title: '', description: '', price: '' });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('price', form.price);
    images.forEach((file) => data.append('images', file));

    if (editing && editing._id) {
      await api.put(`/packages/${editing._id}`, data);
      alert('Package updated!');
    } else {
      await api.post('/packages', data);
      alert('Package created!');
    }

    setForm({ title: '', description: '', price: '' });
    setImages([]);
    setEditing(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">
        {editing ? 'Edit Package' : 'Add Package'}
      </h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        className="mb-2"
        type="file"
        multiple
        onChange={(e) => setImages(Array.from(e.target.files))}
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        {editing ? 'Update' : 'Add'} Package
      </button>
    </form>
  );
}

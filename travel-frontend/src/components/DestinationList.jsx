import React, { useEffect, useState } from 'react';
import api from '../api';

export default function DestinationList({ onEdit }) {
  const [destinations, setDestinations] = useState([]);

  const fetchDestinations = async () => {
    const res = await api.get('/destinations');
    setDestinations(res.data);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this destination?')) {
      await api.delete(`/destinations/${id}`);
      fetchDestinations();
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div className="bg-white p-4 mt-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Destinations</h2>
      {destinations.map((dest) => (
        <div key={dest._id} className="flex justify-between items-center mb-2">
          <div>
            <strong>{dest.name}</strong> - {dest.location}
          </div>
          <div>
            <button onClick={() => onEdit(dest)} className="mr-2 text-blue-500">Edit</button>
            <button onClick={() => handleDelete(dest._id)} className="text-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

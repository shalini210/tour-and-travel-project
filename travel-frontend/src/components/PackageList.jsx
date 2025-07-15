import React, { useEffect, useState } from 'react';
import api from '../api';

export default function PackageList({ onEdit }) {
  const [packages, setPackages] = useState([]);

  const fetchPackages = async () => {
    const res = await api.get('/packages');
    setPackages(res.data);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this package?')) {
      await api.delete(`/packages/${id}`);
      fetchPackages();
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="bg-white p-4 mt-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Packages</h2>
      {packages.map((pack) => (
        <div key={pack._id} className="flex justify-between items-center mb-2">
          <div>
            <strong>{pack.title}</strong> - ₹{pack.price}
          </div>
          <div>
            <button onClick={() => onEdit(pack)} className="mr-2 text-blue-500">Edit</button>
            <button onClick={() => handleDelete(pack._id)} className="text-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

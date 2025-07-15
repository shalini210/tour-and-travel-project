import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PackagesPage from './pages/PackagesPage';
import DestinationsPage from './pages/DestinationsPage';
import Navbar from './components/Navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem('adminToken')
  );

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setLoggedIn(false);
  };

  if (!loggedIn) return <AdminLogin setLoggedIn={setLoggedIn} />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

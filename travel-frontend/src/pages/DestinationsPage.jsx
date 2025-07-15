import React, { useState } from 'react';
import DestinationForm from '../components/DestinationForm';
import DestinationList from '../components/DestinationList';

export default function DestinationsPage() {
  const [editing, setEditing] = useState(null);

  return (
    <div className="p-6">
      <DestinationForm editing={editing} setEditing={setEditing} />
      <DestinationList onEdit={setEditing} />
    </div>
  );
}

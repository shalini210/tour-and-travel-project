import React, { useState } from 'react';
import PackageForm from '../components/PackageForm';
import PackageList from '../components/PackageList';

export default function PackagesPage() {
  const [editing, setEditing] = useState(null);

  return (
    <div className="p-6">
      <PackageForm editing={editing} setEditing={setEditing} />
      <PackageList onEdit={setEditing} />
    </div>
  );
}

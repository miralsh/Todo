import React, { useState } from 'react';

export default function ProjectList({ projects, onAdd }) {
  const [name, setName] = useState('');

  return (
    <div className="mb-4">
      <h2 className="font-bold mb-2">Projects</h2>

      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          placeholder="New project"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-2 border rounded flex-grow"
        />
        <button
          onClick={() => { onAdd(name); setName(''); }}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add
        </button>
      </div>

      <ul className="flex space-x-2 overflow-x-auto">
        {projects.map(p => (
          <li
            key={p._id}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded whitespace-nowrap"
          >
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

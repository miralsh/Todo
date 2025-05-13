import React, { useState } from 'react';

export default function TaskForm({ projects, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: '', description: '', dueDate: '', priority: 'Medium', category: '', project: ''
  });

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Title', name: 'title', type: 'text' },
          { label: 'Description', name: 'description', type: 'text' },
          { label: 'Due Date', name: 'dueDate', type: 'date' },
          { label: 'Priority', name: 'priority', type: 'select', options: ['Low','Medium','High'] },
          { label: 'Category', name: 'category', type: 'text' },
          {
            label: 'Project', name: 'project', type: 'select',
            options: ['', ...projects.map(p => p._id)],
            optionLabels: ['None', ...projects.map(p => p.name)]
          }
        ].map(field => (
          <div key={field.name}>
            <label className="block mb-1">{field.label}</label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={form[field.name]}
                onChange={handle}
                className="w-full p-2 border rounded"
              >
                {field.options.map((opt,i) => (
                  <option key={opt} value={opt}>
                    {field.optionLabels ? field.optionLabels[i] : opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handle}
                className="w-full p-2 border rounded"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <button onClick={() => onSave(form)} className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
        <button onClick={onCancel}        className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
      </div>
    </div>);
}

import React from 'react';

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow mb-2 flex justify-between items-center">
      <div>
        <h3 className={`${task.status==='Completed' ? 'line-through' : ''} font-semibold`}>{task.title}</h3>
        <p className="text-sm">{task.description}</p>
        <p className="text-xs">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
      <div className="space-x-2">
        <button onClick={() => onToggle(task)} className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
          {task.status==='Completed' ? 'Undo' : 'Done'}
        </button>
        <button onClick={() => onDelete(task)} className="px-2 py-1 bg-red-500 text-white rounded text-sm">
          Delete
        </button>
      </div>
    </div>);
}

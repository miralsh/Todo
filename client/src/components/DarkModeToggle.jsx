import React, { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return (
    <button onClick={() => setDark(!dark)} className="px-3 py-1 border rounded">
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
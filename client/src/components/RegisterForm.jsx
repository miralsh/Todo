// client/src/components/RegisterForm.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function RegisterForm() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    await register(form.name, form.email, form.password);
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      {['name','email','password'].map(f => (
        <div key={f} className="mb-3">
          <label className="block">{f[0].toUpperCase()+f.slice(1)}</label>
          <input
            type={f==='password'?'password':'text'}
            name={f}
            value={form[f]}
            onChange={handle}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      ))}
      <button type="submit" className="w-full py-2 bg-green-500 text-white rounded">Register</button>
    </form>
  );
}

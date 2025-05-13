// client/src/components/LoginForm.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    try {
      const response = await login(form.email, form.password);
      console.log("resp " + JSON.stringify(response))
      if (response.status == 200) {
        navigate('/');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials or server error');
    }
  };

  return (
    <>
      <form onSubmit={submit} className="max-w-sm mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Log In</h2>
        {['email', 'password'].map(f => (
          <div key={f} className="mb-3">
            <label className="block">{f[0].toUpperCase() + f.slice(1)}</label>
            <input
              type={f === 'password' ? 'password' : 'email'}
              name={f}
              value={form[f]}
              onChange={handle}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">Login</button>
      </form>
      <p className='flex justify-center'>Don't have an account? <a href='/register'><span className='mx-1 underline text-blue'>Sign up</span></a></p>
    </>
  );
}

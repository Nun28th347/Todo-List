'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errMsg = await res.text();
      setError(errMsg);
      return;
    }

    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0c29] text-white">
      <div className="bg-[#1a1a2e] p-6 rounded shadow-md w-full max-w-md border border-purple-500/30">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-300">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-3 p-2 bg-[#2e2e4d] text-white rounded border border-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-2 bg-[#2e2e4d] text-white rounded border border-purple-500"
        />
        {error && <p className="text-red-400 mb-2 text-sm">{error}</p>}
        <button
          onClick={handleRegister}
          className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded"
        >
          Register
        </button>
        <p className="text-sm mt-4 text-center">
          Already have an account? <a href="/login" className="text-purple-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

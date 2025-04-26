'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errMsg = await res.text();
      setError(errMsg);
      return;
    }

    const data = await res.json();
    localStorage.setItem('userId', data.userId);
    router.push('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0c29] text-white">
      <div className="bg-[#1a1a2e] p-6 rounded shadow-md w-full max-w-md border border-purple-500/30">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-300">Login</h2>
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
          onClick={handleLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded"
        >
          Login
        </button>
        <p className="text-sm mt-4 text-center">
          Don't have an account? <a href="/register" className="text-purple-400 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}

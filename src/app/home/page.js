'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
      return;
    }

    const fetchTodos = async () => {
      const res = await fetch(`/api/todos?userId=${userId}`);
      const data = await res.json();
      setTodos(data.map(todo => ({ ...todo, id: todo._id })));
    };

    fetchTodos();
  }, [router]);

  const handleLogin = async () => {
    const res = await fetch('/api/users/login', {
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
    router.push('/');
  };

  const addTodo = async () => {
    if (input.trim()) {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Please login first.');
        return;
      }

      const newTodo = {
        text: input,
        completed: false,
        userId,
      };

      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        console.error('Error adding todo:', await response.text());
        return;
      }

      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
      setInput('');
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(todo => todo.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    await fetch(`/api/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });

    setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/${id}`, {
      method: 'DELETE',
    });

    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = async (id) => {
    const updatedTodo = { text: editingText };

    await fetch(`/api/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });

    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: editingText } : todo)));
    setEditingId(null);
    setEditingText('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      <main className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="bg-[#1a1a2e] rounded-xl shadow-lg p-6 mt-10 border border-purple-500/30">
          <h1 className="text-3xl font-bold text-center mb-6 text-purple-300 drop-shadow-lg">
            TO DO LIST
          </h1>

          {/* Input section */}
          <div className="flex flex-col sm:flex-row mb-4 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="w-full px-4 py-2 bg-[#2e2e4d] text-purple-100 placeholder-purple-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-600/30"
              placeholder="Enter your quantum task..."
            />
            <button
              onClick={addTodo}
              className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
            >
              Add
            </button>
          </div>

          {/* Todo list */}
          <ul className="divide-y divide-purple-800">
            {filteredTodos.map(todo => (
              <li key={todo.id || todo.text} className="py-3 flex items-center justify-between">
                <div className="flex items-center w-full overflow-hidden">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="h-5 w-5 text-purple-500 bg-[#2e2e4d] border-purple-600 focus:ring-purple-500"
                  />
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                      className="ml-3 flex-grow px-2 py-1 bg-[#2e2e4d] text-purple-100 border border-purple-500 rounded"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`ml-3 flex-grow truncate ${todo.completed ? 'line-through text-purple-400' : 'text-purple-100'}`}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>

                {editingId === todo.id ? (
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className="ml-2 text-green-400 hover:text-green-600"
                    title="Save"
                  >
                    💾
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
                      className="ml-2 text-yellow-400 hover:text-yellow-600"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="ml-2 text-red-400 hover:text-red-600"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* Footer */}
          {todos.length > 0 && (
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-purple-300 gap-2">
              <div>
                {todos.filter(t => !t.completed).length} items left
              </div>

              <div className="flex space-x-2">
                {['all', 'active', 'completed'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-2 py-1 rounded ${filter === f
                      ? 'bg-purple-700 text-white'
                      : 'hover:bg-purple-500/30'}`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              localStorage.removeItem('userId');
              router.push('/login');
            }}
            className="text-sm text-red-300 hover:underline mt-4"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

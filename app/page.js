'use client';
import { useState } from 'react';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username) return;

    setLoading(true);

    // Call API to create user
    const res = await fetch('/api/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      // Redirect to the new subdomain
      window.location.href = `https://${username}.mostasoft.com/`;
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl mb-4">Create your subdomain</h2>
      <input
        type="text"
        placeholder="Enter username"
        className="border p-2 w-full mb-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Go to subdomain'}
      </button>
    </div>
  );
}

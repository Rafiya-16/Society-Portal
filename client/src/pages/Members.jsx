import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Members() {
  const [members, setMembers] = useState([]);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
     const fetchMembers = async () => {
      try {
        const res = await api.get('/users');
        setMembers(res.data);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          setError('Unauthorized. Please login again.');
        } else {
          setError('Failed to load members.');
        }
      }finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div className="p-6">Loading members...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Members Directory</h1>
      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      <div className="grid gap-4">
        {members.map((m) => (
          <div
            key={m._id}
            className="border rounded-lg p-4 shadow-sm"
          >
       <h2 className="font-semibold text-lg">
              {m.name}
            </h2>

            <p>{m.email}</p>

            <p className="text-sm text-gray-500">
              Role: {m.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

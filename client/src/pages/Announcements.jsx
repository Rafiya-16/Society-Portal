import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await api.get('/announcements');
        setAnnouncements(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load announcements');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) return <p className="p-6">Loading announcements...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Announcements</h1>
      {announcements.length === 0 && (
        <p className="text-gray-600">No announcements available.</p>
      )}
      <ul className="space-y-4">
        {announcements.map((a) => (
          <li
            key={a._id}
            className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-lg">{a.title}</h3>
            <p className="text-gray-800">{a.content}</p>
            {a.date && (
              <p className="text-sm text-gray-500 mt-2">
                Date: {new Date(a.date).toLocaleDateString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;

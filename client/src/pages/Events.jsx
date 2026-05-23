import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Events() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', date: '' });

  useEffect(() => {
    api.get('/events').then(res => setEvents(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/events', form);
    setEvents([...events, res.data]);
    setForm({ title: '', description: '', date: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      {user?.role === 'admin' && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-2">
          <input className="border p-2 w-full" placeholder="Title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className="border p-2 w-full" placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input type="date" className="border p-2 w-full" value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Event</button>
        </form>
      )}
      <ul>
        {events.map(ev => (
          <li key={ev._id} className="p-4 border mb-2">
            <h2 className="font-semibold">{ev.title}</h2>
            <p>{ev.description}</p>
            <p className="text-sm">Date: {new Date(ev.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

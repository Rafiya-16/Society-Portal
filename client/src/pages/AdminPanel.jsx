import React, { useEffect, useState } from "react";
import api from "../services/api";

const AdminPanel = () => {
  // State for events
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "" });
  const [editEvent, setEditEvent] = useState(null);

  // State for announcements
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" });
  const [editAnnouncement, setEditAnnouncement] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await api.get("/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Events CRUD ----------------
  const addEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", newEvent);
      setNewEvent({ title: "", description: "", date: "" });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const updateEvent = async (id) => {
    try {
      await api.put(`/events/${id}`, editEvent);
      setEditEvent(null);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Announcements CRUD ----------------
  const addAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await api.post("/announcements", newAnnouncement);
      setNewAnnouncement({ title: "", content: "" });
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  const updateAnnouncement = async (id) => {
    try {
      await api.put(`/announcements/${id}`, editAnnouncement);
      setEditAnnouncement(null);
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await api.delete(`/announcements/${id}`);
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* ---------- Events Section ---------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Manage Events</h2>

        {/* Add Event Form */}
        <form onSubmit={addEvent} className="mb-6 space-y-2">
          <input
            type="text"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="border p-2 w-full"
            required
          />
          <textarea
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="border p-2 w-full"
            required
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="border p-2 w-full"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Event
          </button>
        </form>

        {/* Event List */}
        <ul>
          {events.map((event) => (
            <li key={event._id} className="mb-4 border p-3 rounded">
              {editEvent && editEvent._id === event._id ? (
                <>
                  <input
                    type="text"
                    value={editEvent.title}
                    onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
                    className="border p-2 w-full mb-2"
                  />
                  <textarea
                    value={editEvent.description}
                    onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="date"
                    value={editEvent.date}
                    onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
                    className="border p-2 w-full mb-2"
                  />
                  <button
                    onClick={() => updateEvent(event._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button onClick={() => setEditEvent(null)} className="bg-gray-400 text-white px-3 py-1 rounded">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3 className="font-bold">{event.title}</h3>
                  <p>{event.description}</p>
                  <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                  <div className="mt-2">
                    <button onClick={() => setEditEvent(event)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                      Edit
                    </button>
                    <button onClick={() => deleteEvent(event._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Announcements Section ---------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Manage Announcements</h2>

        {/* Add Announcement Form */}
        <form onSubmit={addAnnouncement} className="mb-6 space-y-2">
          <input
            type="text"
            placeholder="Title"
            value={newAnnouncement.title}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
            className="border p-2 w-full"
            required
          />
          <textarea
            placeholder="Content"
            value={newAnnouncement.content}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
            className="border p-2 w-full"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Announcement
          </button>
        </form>

        {/* Announcement List */}
        <ul>
          {announcements.map((a) => (
            <li key={a._id} className="mb-4 border p-3 rounded">
              {editAnnouncement && editAnnouncement._id === a._id ? (
                <>
                  <input
                    type="text"
                    value={editAnnouncement.title}
                    onChange={(e) => setEditAnnouncement({ ...editAnnouncement, title: e.target.value })}
                    className="border p-2 w-full mb-2"
                  />
                  <textarea
                    value={editAnnouncement.content}
                    onChange={(e) => setEditAnnouncement({ ...editAnnouncement, content: e.target.value })}
                    className="border p-2 w-full mb-2"
                  />
                  <button
                    onClick={() => updateAnnouncement(a._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button onClick={() => setEditAnnouncement(null)} className="bg-gray-400 text-white px-3 py-1 rounded">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3 className="font-bold">{a.title}</h3>
                  <p>{a.content}</p>
                  <div className="mt-2">
                    <button onClick={() => setEditAnnouncement(a)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                      Edit
                    </button>
                    <button onClick={() => deleteAnnouncement(a._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;

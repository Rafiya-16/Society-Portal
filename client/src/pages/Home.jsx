import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    api.get("/events").then((res) => setEvents(res.data.slice(0, 3))); // 3 upcoming
    api.get("/announcements").then((res) => setAnnouncements(res.data.slice(0, 3))); // 3 latest
  }, []);

  return (
    <div className="p-6">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-10 mb-10 shadow-lg text-center">
        <h1 className="text-4xl font-extrabold mb-4">
          🎉 Welcome to the Club Community Portal
        </h1>
        <p className="text-lg opacity-90 mb-6">
          Stay connected with events, announcements, and our amazing members!
        </p>
        <div className="space-x-4">
          <Link
            to="/events"
            className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Explore Events
          </Link>
          <Link
            to="/announcements"
            className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            View Announcements
          </Link>
        </div>
      </section>

      {/* Events Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
          <Link to="/events" className="text-blue-600 hover:underline">
            See all →
          </Link>
        </div>
        {events.length === 0 ? (
          <p className="text-gray-600">No upcoming events.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((ev) => (
              <div
                key={ev._id}
                className="border rounded-xl shadow-sm hover:shadow-md p-5 transition"
              >
                <h3 className="font-bold text-lg mb-2">{ev.title}</h3>
                <p className="text-gray-700 mb-3">{ev.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  📅 {new Date(ev.date).toLocaleDateString()}
                </p>
              
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Announcements Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Latest Announcements
          </h2>
          <Link to="/announcements" className="text-indigo-600 hover:underline">
            See all →
          </Link>
        </div>
        {announcements.length === 0 ? (
          <p className="text-gray-600">No announcements yet.</p>
        ) : (
          <div className="space-y-4">
            {announcements.map((a) => (
              <div
                key={a._id}
                className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-bold text-lg mb-1">{a.title}</h3>
                <p className="text-gray-700">{a.content}</p>
                {a.date && (
                  <p className="text-sm text-gray-500 mt-2">
                    📌 {new Date(a.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { getEvents, addEvent } from "./api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", location: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEvents()
      .then(res => setEvents(res.data))
      .catch(err => setError(err.message || "Failed to fetch events"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    addEvent(form)
      .then(res => {
        setEvents([...events, res.data]);
        setForm({ name: "", date: "", location: "" });
      })
      .catch(err => setError(err.message || "Failed to add event"));
  };

  if (loading) return <p>Loading events…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>📅 Event Management</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 400, marginBottom: 20 }}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Event</button>
      </form>

      {events.length === 0 ? (
        <p>No events yet. Add one!</p>
      ) : (
        <ul>
          {events.map((e) => (
            <li key={e.id}>
              <strong>{e.name}</strong> — {e.date} — {e.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

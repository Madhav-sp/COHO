"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventForm from "../../../components/EventForm";
import EventTable from "../../../components/EventTable";

export default function Dashboard() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // ✅ Check authentication via cookie
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/check");
      if (res.ok) {
        setAuthChecked(true);
        fetchEvents();
      } else {
        router.push("/admin");
      }
    };
    checkAuth();
  }, [router]);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = async (eventData) => {
    if (editingEvent) {
      await fetch(`/api/events/${editingEvent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      setEditingEvent(null);
    } else {
      await fetch(`/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
    }
    fetchEvents();
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin");
  };

  if (!authChecked || loading)
    return <div className="text-white">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <p className="mb-6">Total events: {events.length}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <EventForm
            key={editingEvent?._id || "new"}
            event={editingEvent}
            onCreate={handleFormSubmit}
          />
        </div>
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <EventTable
            events={events}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}

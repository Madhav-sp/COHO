"use client";
import { useState, useEffect } from "react";

export default function EventForm({ event, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      setDate(
        event.date ? new Date(event.date).toISOString().slice(0, 10) : ""
      );
      setApplyLink(event.applyLink || "");
      setImageUrl(event.imageUrl || "");
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, description, date, applyLink, imageUrl });
    setTitle("");
    setDescription("");
    setDate("");
    setApplyLink("");
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-100">
        {event ? "Edit Event" : "Create Event"}
      </h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Apply Link"
        value={applyLink}
        onChange={(e) => setApplyLink(e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
      >
        {event ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
}

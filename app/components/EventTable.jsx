"use client";

export default function EventTable({ events = [], onDelete, onEdit }) {
  if (!events || events.length === 0) {
    return <p className="text-gray-400">No events created yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div
          key={event._id}
          className="bg-gray-700 rounded-xl shadow hover:shadow-xl transition p-4 relative"
        >
          {/* Delete Button */}
          <button
            onClick={() => onDelete(event._id)}
            className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center text-lg"
            title="Delete Event"
          >
            ×
          </button>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(event)}
            className="absolute top-3 right-12 text-white bg-yellow-500 hover:bg-yellow-600 rounded-full w-8 h-8 flex items-center justify-center text-lg"
            title="Edit Event"
          >
            ✎
          </button>

          {/* Image */}
          {event.imageUrl && (
            <div
              className="w-full h-40 rounded-lg bg-cover bg-center mb-4"
              style={{ backgroundImage: `url(${event.imageUrl})` }}
            ></div>
          )}

          <h4 className="text-lg font-semibold">{event.title}</h4>
          {event.date && (
            <p className="text-gray-300 text-sm mb-2">
              📅 {new Date(event.date).toLocaleDateString()}
            </p>
          )}
          <p className="text-gray-300 text-sm mb-3">
            {event.description || "No description"}
          </p>

          <div className="flex gap-2 flex-wrap">
            <a
              href={event.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
            >
              View Form
            </a>

            {event.imageUrl && (
              <a
                href={event.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
              >
                View Image
              </a>
            )}
          </div>

          <small className="text-gray-400 text-xs block mt-2">
            Created: {new Date(event.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
}

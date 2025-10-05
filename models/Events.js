// models/Event.js
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String },
    description: { type: String },
    applyLink: { type: String, required: true },
    imageUrl: { type: String, required: true }, // new field for event image
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);

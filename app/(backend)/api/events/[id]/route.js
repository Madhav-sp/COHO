// app/api/events/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Events";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const deleted = await Event.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Event deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, description, date, applyLink, imageUrl } = body;

    const updatedEvent = await Event.findByIdAndUpdate(
      params.id,
      {
        title,
        description,
        date: date ? new Date(date) : undefined,
        applyLink,
        imageUrl,
      },
      { new: true } // return the updated document
    );

    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

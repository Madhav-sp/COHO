import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "../../../../models/Events";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({});
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const newEvent = await Event.create(data);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

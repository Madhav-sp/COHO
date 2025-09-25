import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";

export async function GET() {
  try {
    const db = await connectDB();

    // simple query: count users
    // const userCount = await User.countDocuments();

    return Response.json({
      success: true,
      message: "✅ MongoDB connected",
    //   users: userCount,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "❌ DB connection failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

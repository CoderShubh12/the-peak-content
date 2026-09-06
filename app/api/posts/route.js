import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

// GET: Saare published posts fetch karne ke liye
export async function GET(request) {
  try {
    await dbConnect();

    // URL se query parameters check karo (jaise slug agar specific post chahiye)
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const post = await Post.findOne({ slug });
      if (!post) {
        return NextResponse.json(
          { success: false, message: "Post not found" },
          { status: 404 },
        );
      }
      return NextResponse.json({ success: true, data: post }, { status: 200 });
    }

    // Agar slug nahi hai, toh saari posts ki list bhej do
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// POST: Naya markdown blog post create karne ke liye
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { title, slug, category, content, author } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const newPost = await Post.create({
      title,
      slug,
      category: category || "Tech",
      content,
      author: author || "The Peak Editorial Desk",
    });

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

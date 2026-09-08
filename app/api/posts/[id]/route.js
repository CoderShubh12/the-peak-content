import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

// PUT: Specific ID ke base par post update karne ke liye (/api/posts/[id])
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await request.json();

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title: body.title,
        slug: body.slug,
        category: body.category,
        subcategory: body.subcategory,
        content: body.content,
        snippet: body.snippet,
        image: body.image,
        author: body.author,
      },
      { new: true, runValidators: true },
    );

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, data: updatedPost },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// DELETE: Specific ID ke base par post delete karne ke liye
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Post deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

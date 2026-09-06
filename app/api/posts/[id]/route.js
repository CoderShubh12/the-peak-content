import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "../../models/Post";

// DELETE: Remove a post by ID
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
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

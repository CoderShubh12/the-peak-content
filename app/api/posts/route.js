import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

// GET: Saare published posts ya category/slug ke hisab se fetch karne ke liye
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");

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

    let query = {};
    if (category) {
      query.category = category;
    }

    const posts = await Post.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// POST: Naya blog post create karne ke liye
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const {
      title,
      slug,
      category,
      subcategory,
      content,
      author,
      image,
      snippet,
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields (title, slug, content)",
        },
        { status: 400 },
      );
    }

    const newPost = await Post.create({
      title,
      slug,
      category: category || "tech",
      subcategory: subcategory || "coding",
      content,
      snippet: snippet || "",
      image: image || "",
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

// PUT: Existing blog post ko edit / update karne ke liye
export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      _id,
      slug,
      title,
      content,
      subcategory,
      category,
      image,
      snippet,
      author,
    } = body;

    if (!_id && !slug) {
      return NextResponse.json(
        { success: false, message: "Post ID or slug is required for updating" },
        { status: 400 },
      );
    }

    const query = _id ? { _id } : { slug };

    const updatedPost = await Post.findOneAndUpdate(
      query,
      {
        title,
        slug,
        category,
        subcategory,
        content,
        snippet,
        image,
        author,
      },
      { new: true, runValidators: true }, // Yahan error tha (new: true kar diya hai)
    );

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, message: "Post not found to update" },
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

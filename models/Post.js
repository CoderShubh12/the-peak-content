import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    snippet: { type: String },
    content: { type: String, required: true },
    category: { type: String, required: true, default: "tech" },
    subcategory: { type: String, required: true }, // jaise: coding, ai-ml, digital-marketing, etc.
    image: { type: String }, // Cloudinary Image URL yahan save hoga
    author: { type: String, default: "Editorial Desk" },
  },
  { timestamps: true },
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

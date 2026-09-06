import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [150, "Title cannot be more than 150 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Tech", "Gaming", "SEO & Marketing", "AI & Development"],
      default: "Tech",
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
    },
    language: {
      type: String,
      enum: ["en", "hi"],
      default: "en",
    },
    isPriority: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      default: "The Peak Editorial Desk",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

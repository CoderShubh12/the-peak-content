import mongoose from "mongoose";

const PollSchema = new mongoose.Schema(
  {
    questionEn: { type: String, required: true },
    questionHi: { type: String, required: true },
    options: [
      {
        id: { type: Number, required: true },
        textEn: { type: String, required: true },
        textHi: { type: String, required: true },
        votes: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Poll || mongoose.model("Poll", PollSchema);

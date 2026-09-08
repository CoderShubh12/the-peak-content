import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Poll from "@/models/Poll";

export const dynamic = "force-dynamic";

// GET: Latest active poll fetch karne ke liye
export async function GET() {
  try {
    await dbConnect();
    // Sabse latest poll fetch karo
    let poll = await Poll.findOne().sort({ createdAt: -1 });

    // Agar database mein ek bhi poll nahi hai, toh default poll create kar do
    if (!poll) {
      poll = await Poll.create({
        questionEn:
          "Will upcoming digital media regulations effectively curb fake news?",
        questionHi:
          "क्या आगामी डिजिटल मीडिया रेगुलेशन से फर्जी खबरों पर रोक लगेगी?",
        options: [
          {
            id: 1,
            textEn: "Yes, absolutely",
            textHi: "हाँ, पूरी तरह से",
            votes: 420,
          },
          {
            id: 2,
            textEn: "No, it will create hurdles",
            textHi: "नहीं, इससे मुश्किलें बढ़ेंगी",
            votes: 310,
          },
          {
            id: 3,
            textEn: "Can't say for sure",
            textHi: "कह नहीं सकते",
            votes: 150,
          },
        ],
      });
    }

    return NextResponse.json({ success: true, data: poll }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// POST: Vote cast karne ke liye ya naya poll create karne ke liye (max 10 polls limit ke sath)
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Check karo kya yeh naya poll create karne ki request hai ya vote cast karne ki
    if (body.questionEn && body.options) {
      // 1. Check karo ki database mein kitne polls hain
      const count = await Poll.countDocuments();

      // 2. Agar 10 ya usse zyada polls hain, toh sabse purane polls ko delete kar do taaki limit 10 hi rahe
      if (count >= 10) {
        const excessCount = count - 10 + 1; // Naye poll ke liye jagah banane ke liye
        const oldestPolls = await Poll.find({})
          .sort({ createdAt: 1 })
          .limit(excessCount);
        const oldestIds = oldestPolls.map((p) => p._id);
        await Poll.deleteMany({ _id: { $in: oldestIds } });
      }

      // 3. Naya poll create karo
      const newPoll = await Poll.create({
        questionEn: body.questionEn,
        questionHi: body.questionHi,
        options: body.options,
      });

      return NextResponse.json(
        { success: true, data: newPoll },
        { status: 201 },
      );
    }

    // Agar yeh vote cast karne ki request hai
    const { pollId, optionId } = body;
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return NextResponse.json(
        { success: false, message: "Poll not found" },
        { status: 404 },
      );
    }

    const option = poll.options.find((opt) => opt.id === optionId);
    if (option) {
      option.votes += 1;
      await poll.save();
    }

    return NextResponse.json({ success: true, data: poll }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

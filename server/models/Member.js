import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  imageUrl: { type: String, required: true },
  public_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Member", memberSchema);
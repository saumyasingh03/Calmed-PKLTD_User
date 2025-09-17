import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true }, // <-- fileUrl use karenge
  public_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Document", documentSchema);
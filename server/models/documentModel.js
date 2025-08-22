import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,  // Cloudinary file URL
    required: true,
  },
  category: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

const Document = mongoose.model("Document", documentSchema);
export default Document; 

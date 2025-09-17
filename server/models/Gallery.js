import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: String,
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  createdAt: { 
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Gallery', gallerySchema);
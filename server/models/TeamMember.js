import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  description: String,
  imageUrl: String,  // Cloudinary image URL
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
export default TeamMember;

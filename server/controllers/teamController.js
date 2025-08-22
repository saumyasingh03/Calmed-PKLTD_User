import TeamMember from '../models/TeamMember.js';

export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();  // fetch all members
    res.status(200).json(members);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

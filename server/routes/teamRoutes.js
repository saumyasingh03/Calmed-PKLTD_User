import express from 'express';
import { getAllTeamMembers } from '../controllers/teamController.js';

const router = express.Router();

router.get('/team-members', getAllTeamMembers);

export default router;

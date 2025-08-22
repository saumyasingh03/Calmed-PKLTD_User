import express from 'express';

const router = express.Router();
import { getAllDocuments } from '../controllers/documentController.js';

router.get("/documents", getAllDocuments);  // GET /api/documents

export default router;

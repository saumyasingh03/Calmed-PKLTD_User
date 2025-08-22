
import express from 'express';
import { getGalleryImages } from '../controllers/galleryController.js';

const router = express.Router();
router.get('/gallery', getGalleryImages);
export default router;

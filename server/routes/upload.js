import express from 'express';
import {
  uploadVideo,
  uploadImage,
  deleteFile,
  getUploadSignature
} from '../controllers/uploadController.js';
import { authenticate, canEdit } from '../middleware/auth.js';
import { uploadVideo as uploadVideoMiddleware, uploadImage as uploadImageMiddleware } from '../middleware/upload.js';

const router = express.Router();

// Upload routes (require editor permissions)
router.post('/video', authenticate, canEdit, uploadVideoMiddleware, uploadVideo);
router.post('/image', authenticate, canEdit, uploadImageMiddleware, uploadImage);
router.delete('/file', authenticate, canEdit, deleteFile);

// Get upload signature for direct uploads
router.get('/signature', authenticate, canEdit, getUploadSignature);

export default router;
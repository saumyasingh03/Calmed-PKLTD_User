import express from 'express';
import {
  submitContactForm,
  getContactForms,
  updateContactFormStatus,
  deleteContactForm,
  getContactFormStats
} from '../controllers/contactController.js';
import { authenticate, canManageUsers } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for contact form submissions
const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes
router.post('/submit', contactFormLimiter, submitContactForm);

// Admin routes (require authentication and admin permissions)
router.get('/', authenticate, canManageUsers, getContactForms);
router.get('/stats', authenticate, canManageUsers, getContactFormStats);
router.patch('/:id', authenticate, canManageUsers, updateContactFormStatus);
router.delete('/:id', authenticate, canManageUsers, deleteContactForm);

export default router;
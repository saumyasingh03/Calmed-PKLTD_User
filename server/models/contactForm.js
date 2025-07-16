import mongoose from 'mongoose';

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  message: {
    type: String,
    required: true,
    maxlength: 2000
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'resolved'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  source: {
    type: String,
    default: 'website_contact_form'
  },
  ipAddress: String,
  userAgent: String,
  respondedAt: Date,
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  response: String,
  tags: [String],
  isSpam: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better performance
contactFormSchema.index({ status: 1, createdAt: -1 });
contactFormSchema.index({ email: 1 });
contactFormSchema.index({ priority: 1 });
contactFormSchema.index({ createdAt: -1 });

export default mongoose.model('ContactForm', contactFormSchema);
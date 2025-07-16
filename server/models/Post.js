import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    required: true
  },
  imagePublicId: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Prenatal Care',
      'Pregnancy Complications', 
      'Labor & Delivery',
      'Postpartum Care',
      'Emergency Signs',
      'Nutrition & Health',
      'Mental Health',
      'High-Risk Pregnancy',
      'Preventive Care',
      'Family Planning',
      'Maternal Mortality Prevention'
    ]
  },
  medicalLevel: {
    type: String,
    required: true,
    enum: ['Basic', 'Intermediate', 'Advanced', 'Emergency']
  },
  targetAudience: {
    type: String,
    required: true,
    enum: ['Expecting Mothers', 'Healthcare Workers', 'Family Members', 'General Public']
  },
  pregnancyStage: {
    type: String,
    required: true,
    enum: ['Pre-conception', 'First Trimester', 'Second Trimester', 'Third Trimester', 'Labor', 'Postpartum', 'All Stages']
  },
  warningLevel: {
    type: String,
    required: true,
    enum: ['Information', 'Caution', 'Warning', 'Emergency'],
    default: 'Information'
  },
  language: {
    type: String,
    required: true,
    enum: ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Urdu'],
    default: 'English'
  },
  medicalTags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorInfo: {
    specialization: String,
    hospital: String,
    experience: String,
    credentials: String
  },
  status: {
    type: String,
    enum: ['draft', 'under_review', 'published', 'archived'],
    default: 'draft'
  },
  reviewStatus: {
    isReviewed: { type: Boolean, default: false },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewDate: Date,
    reviewNotes: String
  },
  readTime: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  saves: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 500
    },
    isAnonymous: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  references: [{
    title: String,
    url: String,
    type: { type: String, enum: ['Research Paper', 'Medical Journal', 'Guidelines', 'Study'] }
  }],
  isEmergencyContent: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better performance
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1 });
blogSchema.index({ pregnancyStage: 1 });
blogSchema.index({ warningLevel: 1 });
blogSchema.index({ language: 1 });
blogSchema.index({ author: 1 });
blogSchema.index({ title: 'text', excerpt: 'text', content: 'text', medicalTags: 'text' });
blogSchema.index({ isEmergencyContent: 1 });

// Virtual for like count
blogSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for save count
blogSchema.virtual('saveCount').get(function() {
  return this.saves.length;
});

// Virtual for comment count
blogSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Pre-save middleware to set publishedAt and update lastUpdated
blogSchema.pre('save', function(next) {
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  this.lastUpdated = new Date();
  next();
});


const Post = mongoose.models.Blog || mongoose.model('Blog', postSchema);
export default Post;
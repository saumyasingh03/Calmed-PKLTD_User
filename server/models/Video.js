import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  videoUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  duration: {
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
      'Family Planning'
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
  cloudinaryPublicId: {
    type: String,
    required: true
  },
  thumbnailPublicId: {
    type: String,
    required: true
  },
  isEmergencyContent: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better performance
videoSchema.index({ status: 1, createdAt: -1 });
videoSchema.index({ category: 1 });
videoSchema.index({ pregnancyStage: 1 });
videoSchema.index({ warningLevel: 1 });
videoSchema.index({ language: 1 });
videoSchema.index({ author: 1 });
videoSchema.index({ title: 'text', description: 'text', medicalTags: 'text' });
videoSchema.index({ isEmergencyContent: 1 });

// Virtual for like count
videoSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for save count
videoSchema.virtual('saveCount').get(function() {
  return this.saves.length;
});

// Virtual for comment count
videoSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Pre-save middleware to update lastUpdated
videoSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

export default mongoose.model('Video', videoSchema);
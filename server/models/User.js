import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'doctor', 'admin', 'Editor'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  
  // Doctor-specific fields
  doctorProfile: {
    specialization: {
      type: String,
      enum: [
        'Obstetrics & Gynecology',
        'Maternal-Fetal Medicine',
        'High-Risk Pregnancy',
        'Reproductive Endocrinology',
        'Neonatology',
        'Midwifery',
        'Family Medicine',
        'Emergency Medicine',
        'Anesthesiology'
      ]
    },
    hospital: String,
    experience: String,
    credentials: String,
    medicalLicense: String,
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },
    verificationDocuments: [{
      type: String,
      url: String,
      documentType: String
    }],
    bio: String,
    languages: [String],
    consultationFee: Number,
    availableForConsultation: {
      type: Boolean,
      default: false
    }
  },

  // Patient-specific fields
  patientProfile: {
    pregnancyStatus: {
      type: String,
      enum: ['not_pregnant', 'trying_to_conceive', 'pregnant', 'postpartum'],
      default: 'not_pregnant'
    },
    pregnancyWeek: Number,
    dueDate: Date,
    riskLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'low'
    },
    medicalHistory: [{
      condition: String,
      date: Date,
      notes: String
    }],
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    },
    preferredLanguage: {
      type: String,
      enum: ['English', 'Hindi'],
      default: 'English'
    },
    location: {
      country: { type: String, default: 'India' },
      state: String,
      city: String
    },
    isAnonymous: {
      type: Boolean,
      default: true
    }
  },

  // Content interaction tracking
  contentInteraction: {
    videosWatched: [{
      videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
      watchedAt: Date,
      watchDuration: Number
    }],
    blogsRead: [{
      blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
      readAt: Date,
      readTime: Number
    }],
    savedContent: [{
      contentId: mongoose.Schema.Types.ObjectId,
      contentType: { type: String, enum: ['video', 'blog', 'post'] },
      savedAt: Date
    }],
    searchHistory: [{
      query: String,
      searchedAt: Date
    }]
  },

  // Notification preferences
  notificationPreferences: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    emergencyAlerts: { type: Boolean, default: true },
    weeklyDigest: { type: Boolean, default: true },
    contentUpdates: { type: Boolean, default: true }
  },

  // Privacy settings
  privacySettings: {
    profileVisibility: {
      type: String,
      enum: ['public', 'doctors_only', 'private'],
      default: 'private'
    },
    allowDataCollection: { type: Boolean, default: true },
    shareAnonymousData: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

// Indexes for better performance
userSchema.index({ clerkId: 1 });
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'doctorProfile.specialization': 1 });
userSchema.index({ 'doctorProfile.verificationStatus': 1 });
userSchema.index({ 'patientProfile.pregnancyStatus': 1 });
userSchema.index({ 'patientProfile.riskLevel': 1 });
userSchema.index({ 'patientProfile.location.state': 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Method to check if user has permission
userSchema.methods.hasPermission = function(requiredRole) {
  const roleHierarchy = {
    'patient': 1,
    'healthcare_worker': 2,
    'doctor': 3,
    'moderator': 4,
    'admin': 5
  };
  
  return roleHierarchy[this.role] >= roleHierarchy[requiredRole];
};

// Method to check if doctor is verified
userSchema.methods.isVerifiedDoctor = function() {
  return this.role === 'doctor' && 
         this.doctorProfile && 
         this.doctorProfile.verificationStatus === 'verified';
};

// Method to get display name (anonymous for patients if preferred)
userSchema.methods.getDisplayName = function() {
  if (this.role === 'patient' && this.patientProfile?.isAnonymous) {
    return 'Anonymous User';
  }
  return this.fullName;
};

export default mongoose.model('User', userSchema);
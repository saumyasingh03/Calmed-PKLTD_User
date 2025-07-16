import express from 'express';
import Video from '../models/Video.js';
import Blog from '../models/Blog.js';
import Post from '../models/Post.js';
import User from '../models/User.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard analytics
router.get('/dashboard', authenticate, authorize('admin', 'editor'), async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    const [contentStats, userStats, engagementStats] = await Promise.all([
      // Content statistics
      Promise.all([
        Video.countDocuments({ createdAt: { $gte: startDate } }),
        Blog.countDocuments({ createdAt: { $gte: startDate } }),
        Post.countDocuments({ createdAt: { $gte: startDate } }),
        Video.countDocuments({ status: 'published' }),
        Blog.countDocuments({ status: 'published' }),
        Post.countDocuments({ status: 'published' })
      ]),
      
      // User statistics
      Promise.all([
        User.countDocuments({ createdAt: { $gte: startDate } }),
        User.countDocuments({ isActive: true }),
        User.countDocuments({ lastLogin: { $gte: startDate } })
      ]),
      
      // Engagement statistics
      Promise.all([
        Video.aggregate([{ $group: { _id: null, totalViews: { $sum: '$views' } } }]),
        Blog.aggregate([{ $group: { _id: null, totalViews: { $sum: '$views' } } }]),
        Post.aggregate([{ $group: { _id: null, totalViews: { $sum: '$views' } } }])
      ])
    ]);

    const analytics = {
      period,
      content: {
        newVideos: contentStats[0],
        newBlogs: contentStats[1],
        newPosts: contentStats[2],
        publishedVideos: contentStats[3],
        publishedBlogs: contentStats[4],
        publishedPosts: contentStats[5]
      },
      users: {
        newUsers: userStats[0],
        activeUsers: userStats[1],
        recentLogins: userStats[2]
      },
      engagement: {
        videoViews: engagementStats[0][0]?.totalViews || 0,
        blogViews: engagementStats[1][0]?.totalViews || 0,
        postViews: engagementStats[2][0]?.totalViews || 0
      }
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: error.message
    });
  }
});

// Get content performance
router.get('/content-performance', authenticate, authorize('admin', 'editor'), async (req, res) => {
  try {
    const [topVideos, topBlogs, topPosts] = await Promise.all([
      Video.find({ status: 'published' })
        .sort({ views: -1 })
        .limit(5)
        .select('title views likes createdAt')
        .populate('author', 'firstName lastName'),
      
      Blog.find({ status: 'published' })
        .sort({ views: -1 })
        .limit(5)
        .select('title views likes createdAt')
        .populate('author', 'firstName lastName'),
      
      Post.find({ status: 'published' })
        .sort({ views: -1 })
        .limit(5)
        .select('title views likes createdAt')
        .populate('author', 'firstName lastName')
    ]);

    res.json({
      success: true,
      data: {
        topVideos,
        topBlogs,
        topPosts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching content performance',
      error: error.message
    });
  }
});

// Get user activity
router.get('/user-activity', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    const userActivity = await User.aggregate([
      {
        $match: {
          lastLogin: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$lastLogin'
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({
      success: true,
      data: userActivity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user activity',
      error: error.message
    });
  }
});

export default router;
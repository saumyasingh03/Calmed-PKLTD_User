import Video from '../models/Video.js';
import Blog from '../models/Blog.js';
import Post from '../models/Post.js';
import { cloudinary } from '../config/cloudinary.js';

// Get academy overview stats
export const getAcademyStats = async (req, res) => {
  try {
    const [videoStats, blogStats, postStats] = await Promise.all([
      Video.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalViews: { $sum: '$views' }
          }
        }
      ]),
      Blog.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalViews: { $sum: '$views' }
          }
        }
      ]),
      Post.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalViews: { $sum: '$views' }
          }
        }
      ])
    ]);

    const stats = {
      videos: {
        total: videoStats.reduce((sum, stat) => sum + stat.count, 0),
        published: videoStats.find(s => s._id === 'published')?.count || 0,
        totalViews: videoStats.reduce((sum, stat) => sum + stat.totalViews, 0)
      },
      blogs: {
        total: blogStats.reduce((sum, stat) => sum + stat.count, 0),
        published: blogStats.find(s => s._id === 'published')?.count || 0,
        totalViews: blogStats.reduce((sum, stat) => sum + stat.totalViews, 0)
      },
      posts: {
        total: postStats.reduce((sum, stat) => sum + stat.count, 0),
        published: postStats.find(s => s._id === 'published')?.count || 0,
        totalViews: postStats.reduce((sum, stat) => sum + stat.totalViews, 0)
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching academy stats',
      error: error.message
    });
  }
};

// VIDEO CONTROLLERS
export const getVideos = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category, search } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const videos = await Video.find(query)
      .populate('author', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Video.countDocuments(query);

    res.json({
      success: true,
      data: videos,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching videos',
      error: error.message
    });
  }
};

export const createVideo = async (req, res) => {
  try {
    const videoData = {
      ...req.body,
      author: req.user._id
    };

    const video = new Video(videoData);
    await video.save();
    await video.populate('author', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Video created successfully',
      data: video
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating video',
      error: error.message
    });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName email');

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.json({
      success: true,
      message: 'Video updated successfully',
      data: video
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating video',
      error: error.message
    });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Delete from Cloudinary
    if (video.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(video.cloudinaryPublicId, { resource_type: 'video' });
    }
    if (video.thumbnailPublicId) {
      await cloudinary.uploader.destroy(video.thumbnailPublicId);
    }

    await video.deleteOne();

    res.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting video',
      error: error.message
    });
  }
};

// BLOG CONTROLLERS
export const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category, search } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const blogs = await Blog.find(query)
      .populate('author', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blogData = {
      ...req.body,
      author: req.user._id
    };

    const blog = new Blog(blogData);
    await blog.save();
    await blog.populate('author', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName email');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating blog',
      error: error.message
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Delete from Cloudinary
    if (blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    await blog.deleteOne();

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
};

// POST CONTROLLERS
export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, type, search } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Post.find(query)
      .populate('author', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const postData = {
      ...req.body,
      author: req.user._id
    };

    const post = new Post(postData);
    await post.save();
    await post.populate('author', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating post',
      error: error.message
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName email');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating post',
      error: error.message
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting post',
      error: error.message
    });
  }
};
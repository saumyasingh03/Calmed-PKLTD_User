import express from 'express';
import {
  getAcademyStats,
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getPosts,
  createPost,
  updatePost,
  deletePost
} from '../controllers/academyController.js';
import { authenticate, canEdit } from '../middleware/auth.js';

const router = express.Router();

// Academy stats route
router.get('/stats', authenticate, getAcademyStats);

// Video routes
router.route('/videos')
  .get(authenticate, getVideos)
  .post(authenticate, canEdit, createVideo);

router.route('/videos/:id')
  .put(authenticate, canEdit, updateVideo)
  .delete(authenticate, canEdit, deleteVideo);

// Blog routes
router.route('/blogs')
  .get(authenticate, getBlogs)
  .post(authenticate, canEdit, createBlog);

router.route('/blogs/:id')
  .put(authenticate, canEdit, updateBlog)
  .delete(authenticate, canEdit, deleteBlog);

// Post routes
router.route('/posts')
  .get(authenticate, getPosts)
  .post(authenticate, canEdit, createPost);

router.route('/posts/:id')
  .put(authenticate, canEdit, updatePost)
  .delete(authenticate, canEdit, deletePost);

export default router;
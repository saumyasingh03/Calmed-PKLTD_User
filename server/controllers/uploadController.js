import { cloudinary } from '../config/cloudinary.js';
import fs from 'fs';

// Upload video to Cloudinary
export const uploadVideo = async (req, res) => {
  try {
    if (!req.files || !req.files.video) {
      return res.status(400).json({
        success: false,
        message: 'No video file provided'
      });
    }

    const videoFile = req.files.video[0];
    const thumbnailFile = req.files.thumbnail ? req.files.thumbnail[0] : null;

    // Upload video to Cloudinary
    const videoResult = await cloudinary.uploader.upload(videoFile.path, {
      resource_type: 'video',
      folder: 'academy/videos',
      quality: 'auto',
      format: 'mp4'
    });

    let thumbnailResult = null;
    if (thumbnailFile) {
      // Upload thumbnail to Cloudinary
      thumbnailResult = await cloudinary.uploader.upload(thumbnailFile.path, {
        resource_type: 'image',
        folder: 'academy/thumbnails',
        quality: 'auto',
        format: 'jpg'
      });
    } else {
      // Generate thumbnail from video
      thumbnailResult = await cloudinary.uploader.upload(videoResult.public_id, {
        resource_type: 'video',
        format: 'jpg',
        transformation: [
          { start_offset: '10%' },
          { width: 400, height: 300, crop: 'fill' }
        ]
      });
    }

    // Clean up local files
    fs.unlinkSync(videoFile.path);
    if (thumbnailFile) {
      fs.unlinkSync(thumbnailFile.path);
    }

    res.json({
      success: true,
      message: 'Video uploaded successfully',
      data: {
        videoUrl: videoResult.secure_url,
        videoPublicId: videoResult.public_id,
        thumbnailUrl: thumbnailResult.secure_url,
        thumbnailPublicId: thumbnailResult.public_id,
        duration: videoResult.duration
      }
    });
  } catch (error) {
    // Clean up files on error
    if (req.files) {
      Object.values(req.files).flat().forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error uploading video',
      error: error.message
    });
  }
};

// Upload image to Cloudinary
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'image',
      folder: 'academy/images',
      quality: 'auto',
      format: 'jpg'
    });

    // Clean up local file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        imageUrl: result.secure_url,
        publicId: result.public_id
      }
    });
  } catch (error) {
    // Clean up file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: error.message
    });
  }
};

// Delete file from Cloudinary
export const deleteFile = async (req, res) => {
  try {
    const { publicId, resourceType = 'image' } = req.body;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required'
      });
    }

    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting file',
      error: error.message
    });
  }
};

// Get upload signature for direct uploads
export const getUploadSignature = async (req, res) => {
  try {
    const { folder, resourceType = 'image' } = req.query;

    const timestamp = Math.round(new Date().getTime() / 1000);
    const params = {
      timestamp,
      folder: folder || 'academy/uploads',
      resource_type: resourceType
    };

    const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET);

    res.json({
      success: true,
      data: {
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        folder: params.folder
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating upload signature',
      error: error.message
    });
  }
};
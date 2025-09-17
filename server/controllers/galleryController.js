
import Gallery from '../models/Gallery.js';

export const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    
    console.log("Fetched Images:", images); 
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

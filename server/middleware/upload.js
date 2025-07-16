import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'video') {
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error("Only video files are allowed for video uploads"), false);
        }
    } else if (file.fieldname === 'image' || file.fieldname === 'thumbnail') {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only img files are allowed for img uploads'), false);
        }
    } else {
        cb(null, true);
    }
};

const upload = multer({ storage, fileFilter });

export const uploadVideo = upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]);

export const uploadImage = upload.single('image');
export const uploadMultiple = upload.array('files', 10);
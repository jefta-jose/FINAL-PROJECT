import { Router } from 'express';
const uploadImageRouter = Router();
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/photos/users'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        const uniqueFileName = `${Date.now()}_${file.originalname}`; // Generate a unique filename
        cb(null, uniqueFileName);
    }
});

// Initialize multer with the configured storage
const uploadToUser = multer({ storage });

// Define the route for uploading user profiles
uploadImageRouter.post('/upload-user-profile', uploadToUser.single('file'), (req, res) => {
    res.send({ imageUrl: `http://localhost:3000/api/photos/users/${req.file.filename}` });
});

export default uploadImageRouter;

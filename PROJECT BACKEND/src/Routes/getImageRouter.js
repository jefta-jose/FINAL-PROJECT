import { Router } from "express";
import path from "path";
import { fileURLToPath } from 'url';

const getImageRouter = Router();

getImageRouter.get('/get-picture/:filename', (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        // Extract the filename from the URL parameter
        const filename = req.params.filename;

        // Construct the path to the image file
        const imagePath = path.join(__dirname, '../photos/users', filename);

        // Send the image file to the client
        res.sendFile(imagePath);
    } catch (error) {
        console.error('Error getting picture:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default getImageRouter;
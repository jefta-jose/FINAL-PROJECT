import { Router } from 'express';
import multer from 'multer';
import { poolRequest, sql } from '../Utils/dbConnect.js';

const uploadImageRouter = Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/photos/users'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        // Use the original filename without generating a unique one
        cb(null, file.originalname);
    }
});

// Initialize multer with the configured storage
const uploadToUser = multer({ storage });

// Define the route for uploading user profiles
uploadImageRouter.post('/upload-user-profile', uploadToUser.single('file'), async (req, res) => {
    const photoDetails = {
        EmployeeID: req.body.EmployeeID,
        imageUrl: `http://localhost:3000/api/photos/users/${req.file.filename}`
    };

    try {
        const response = await updateimageUrlInDatabase(photoDetails.EmployeeID, photoDetails.imageUrl);
        res.status(201).json({ message: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Function to update imageUrl in Employees table
async function updateimageUrlInDatabase(EmployeeID, imageUrl) {
    try {
        // Log the EmployeeID and imageUrl before executing the query
        console.log('EmployeeID:', EmployeeID);
        console.log('imageUrl:', imageUrl);

        // Construct the SQL query to update imageUrl
        const queryString = `
            UPDATE Employees
            SET imageUrl = @imageUrl
            WHERE EmployeeID = @EmployeeID;
        `;

        // Create a new pool request
        const request = poolRequest();

        // Add parameters to the request
        request.input('imageUrl', sql.NVarChar, imageUrl);
        request.input('EmployeeID', sql.VarChar(100), EmployeeID);

        // Execute the query
        await request.query(queryString);
    } catch (error) {
        console.error('Error executing SQL query:', error);
        throw error;
    }
}


export default uploadImageRouter;

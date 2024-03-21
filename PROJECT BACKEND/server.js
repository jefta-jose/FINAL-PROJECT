import express from 'express';
import bodyParser from 'body-parser';
import Logger from './src/Utils/Logger.js';
import dotenv from 'dotenv';
import cors from 'cors';
import employeeRouter from './src/Routes/employeeRouter.js';
import timeRouter from './src/Routes/timeRouter.js';
import payrollRouter from './src/Routes/parollRoutes.js';
import advanceRouter from './src/Routes/adavanceRoutes.js';
import scheduleRouter from './src/Routes/scheduleRoutes.js';
import uploadImageRouter from './src/Routes/uploadRouter.js';

const app = express();
dotenv.config();

const port = process.env.API_PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/photos/users', express.static('src/photos/users'));


app.get('/health', (req, res) => {
    res.status(200).send('I am very healthy💪');
});

// routes
app.use('/api', employeeRouter);
app.use('/api', timeRouter);
app.use('/api', payrollRouter);
app.use('/api', advanceRouter);
app.use('/api', scheduleRouter);
app.use('/api', uploadImageRouter);


// Start the server
app.listen(port, () => {
    Logger.info(`Server running on http://localhost:${port}`);
});

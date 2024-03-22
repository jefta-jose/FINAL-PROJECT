import { Router } from 'express';
import { createEmail, getEmailById } from '../Controllers/emailController.js';

const emailRouter = Router();

emailRouter.post('/email', createEmail);
emailRouter.get('/email/:id', getEmailById);


export default emailRouter;
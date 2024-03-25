import { Router } from 'express';
import {  numberOfEmails, getEmails, createEmail, getEmailById } from '../Controllers/emailController.js';

const emailRouter = Router();

emailRouter.post('/email', createEmail);
emailRouter.get('/email/:id', getEmailById);
emailRouter.get('/email', getEmails);
emailRouter.get('/emails', numberOfEmails);

export default emailRouter;
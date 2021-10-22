import express from 'express';
const router = express.Router();

import { login, signup } from '../controllers/userController.js';
import { cloudinaryUpload } from '../middleware/uploadMiddleware.js';

router.post('/login', login);
router.post('/signup', cloudinaryUpload, signup);

export default router;

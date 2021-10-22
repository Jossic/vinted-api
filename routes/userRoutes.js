import express from 'express';
const router = express.Router();

import { login, signup } from '../controllers/userController.js';
import { cloudinaryUploadSingle } from '../middleware/uploadMiddleware.js';

router.post('/login', login);
router.post('/signup', cloudinaryUploadSingle, signup);

export default router;

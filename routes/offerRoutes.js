import express from 'express';
const router = express.Router();

import { publishProduct } from '../controllers/offerController.js';
import { protect } from '../middleware/authMiddleware.js';
import { cloudinaryUpload } from '../middleware/uploadMiddleware.js';

router.post('/publish', protect, cloudinaryUpload, publishProduct);

export default router;

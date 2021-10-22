import express from 'express';
const router = express.Router();

import { publishProduct, getOffers } from '../controllers/offerController.js';
import { protect } from '../middleware/authMiddleware.js';
import { cloudinaryUpload } from '../middleware/uploadMiddleware.js';

router.post('/publish', protect, cloudinaryUpload, publishProduct);
router.get('/offers', protect, getOffers);

export default router;

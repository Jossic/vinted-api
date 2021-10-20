import express from 'express';
const router = express.Router();

import { login, signup, logout } from '../controllers/userController.js';
// import { admin, protect } from '../middleware/authMiddleware.js';

router.post('/login', login);
router.post(
	'/signup',
	// protect,
	//  admin,
	signup
);

router.post('/logout', logout);

//Public

export default router;

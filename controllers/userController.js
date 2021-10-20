import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

import dotenv from 'dotenv';
dotenv.config();

// @desc    Auth user & get token
// @route   POST /user/login
// @access  Public
export const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			user,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Identifiants et/ou mot de passe incorrects');
	}
};

// @desc    Register a new user
// @route   POST /user/signup
// @access  Public
export const signup = async (req, res) => {
	// {
	//     "email": "brice@lereacteur.io",
	//     "username": "Brice",
	//     "phone": "0606060606",
	//     "password": "azerty"
	//   }

	const { username, email, password, phone, url } = req.body;
	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			res.status(400).json({
				error: 'Cet utilisateur existe déjà',
			});
		}
	} catch (error) {
		// throw new Error('Cet utilisateur existe déjà');
		console.log(`error =>`, error);
	}

	const user = await User.create({
		email,
		password,
		'account.username': username,
		'account.phone': phone,
	});
	user.account.avatar.secure_url = url;

	if (user) {
		res.status(201).json({
			user,
			token: generateToken(user._id),
			message: 'Utilisateur créé.',
		});
	} else {
		res.status(400);
		throw new Error('Données invalides');
	}
};

export const logout = (req, res) => {
	res.clearCookie('token');
	res.json({
		message: 'Vous êtes maintenant deconnecté.',
	});
};

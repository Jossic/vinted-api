import Offer from '../models/offerModel.js';

// @desc    Publish product
// @route   POST /offer/publish
// @access  Private
export const publishProduct = async (req, res) => {
	console.log(`req.files =>`, req.files);
	const { title, description, price, condition, city, brand, size, color } =
		req.body;
};

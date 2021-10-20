import Offer from '../models/offerModel.js';

// @desc    Publish product
// @route   POST /offer/publish
// @access  Private
export const publishProduct = async (req, res) => {
	const {
		title,
		description,
		price,
		condition,
		city,
		brand,
		size,
		color,
		url,
	} = req.body;

	const offer = await new Offer({
		product_name: title,
		product_description: description,
		product_price: price,
		product_details: [
			{ marque: brand },
			{ taille: size },
			{ etat: condition },
			{ couleur: color },
			{ emplacement: city },
		],
		owner: req.user,
		product_image: url,
	});

	await offer.save((error, offer) => {
		if (error) return res.status(400).json({ error });
		if (offer) {
			res.status(201).json({
				offer,
				message: 'Offre créee',
			});
		}
	});
};

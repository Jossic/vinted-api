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
	} = req.fields;

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

// @desc    Publish product
// @route   POST /offer/offers
// @access  Private
export const getOffers = async (req, res) => {
	console.log(`req.query =>`, req.query);
	try {
		const offers = await Offer.find({
			product_name: new RegExp(req.query.title, 'i'),
		}).select('product_name product_price');

		res.json(offers);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

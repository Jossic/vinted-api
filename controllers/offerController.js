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
	// console.log(`req.query =>`, req.query);
	let { title, priceMin, priceMax } = req.query;
	try {
		const filters = {};

		if (title) {
			filters.product_name = new RegExp(title, 'i');
		}

		if (priceMin) {
			filters.product_price = { $gte: priceMin };
		}

		if (priceMax) {
			if (filters.product_price) {
				filters.product_price.$lte = priceMax;
			} else {
				filters.product_price = {
					$lte: priceMax,
				};
			}
		}

		//console.log(filters);
		let sort = {};
		req.query.sort === 'price-desc'
			? (sort = { product_price: -1 })
			: (sort = { product_price: 1 });

		// Par défaut on envoie la page 1
		let page = 1;
		req.query.page && (page = Number(req.query.page));
		// Par défaut on fixe la limite à 3
		let limit = 3;
		req.query.limit && (limit = Number(req.query.limit));

		const offers = await Offer.find(filters)
			.sort(sort)
			.skip((page - 1) * limit)
			.limit(limit)
			.select('product_name product_price');

		const count = await Offer.countDocuments(filters);

		res.json({
			count: count,
			offers: offers,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

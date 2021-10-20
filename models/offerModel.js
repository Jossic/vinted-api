import mongoose from 'mongoose';

const offerSchema = mongoose.Schema({
	product_name: String,
	product_description: String,
	product_price: Number,
	product_details: Array,
	product_image: { type: mongoose.Schema.Types.Mixed, default: {} },
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Offer = mongoose.model('Offer', offerSchema);

export default Offer;

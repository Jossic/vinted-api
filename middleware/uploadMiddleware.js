import cloudinary from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryUpload = async (req, res, next) => {
	console.log(`req.files =>`, req.files);
	const fileKeys = Object.keys(req.files);
	let results = {};

	if (fileKeys.length === 0) {
		res.send('No file uploaded!');
		return;
	}
	fileKeys.forEach(async (fileKey) => {
		try {
			const file = req.files[fileKey];
			const result = await cloudinary.uploader.upload(file.path);
			results[fileKey] = {
				success: true,
				result: result,
			};

			if (Object.keys(results).length === fileKeys.length) {
				// tous les uploads sont terminés, on peut donc envoyer la réponse au client
				next();
			}
		} catch (error) {
			console.log(error);
		}
	});
};

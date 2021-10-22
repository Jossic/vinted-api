import cloudinary from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryUpload = async (req, res, next) => {
	console.log(`req.filesMid =>`, req.files.picture);
	const fileKeys = Object.keys(req.files.picture);
	console.log(`fileKeys.length =>`, fileKeys.length);
	let results = {};
	const arrayOfUrl = [];

	if (fileKeys.length === 0) {
		res.send('No file uploaded!');
		return;
	}
	fileKeys.forEach(async (fileKey) => {
		try {
			const file = req.files.picture[fileKey];
			const result = await cloudinary.uploader.upload(file.tempFilePath);
			// console.log(`result =>`, result);
			results[fileKey] = {
				success: true,
				result: result,
			};
			arrayOfUrl.push(result.url);

			if (Object.keys(results).length === fileKeys.length) {
				// tous les uploads sont terminés, on peut donc envoyer la réponse au client
				console.log(`arrayOfUrl =>`, arrayOfUrl);
				req.fields.url = arrayOfUrl;
				next();
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const cloudinaryUploadSingle = async (req, res, next) => {
	// console.log(`req.files.picture =>`, req.files.picture);
	console.log(`req.files =>`, req.files.picture);

	cloudinary.uploader.upload(req.files.picture, (result, error) => {
		if (error) {
			console.log(`error =>`, error);
		}
		console.log(`result =>`, result);
		req.fields.url = result.url;
		next();
	});
};

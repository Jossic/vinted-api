import express from 'express';
import morgan from 'morgan';
import colors from 'colors';
import dotenv from 'dotenv';
// import fileUpload from 'express-fileupload';
import formidableMiddleware from 'express-formidable';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import offerRoutes from './routes/offerRoutes.js';

dotenv.config();

connectDB();

mongoose.connection;

const app = express();
app.use(formidableMiddleware());

// app.use(fileUpload({ useTempFiles: true }));
// app.use(
// 	express.urlencoded({
// 		extended: true,
// 	})
// );
// app.use(express.json());

app.use('/user', userRoutes);
app.use('/offer', offerRoutes);

app.all('*', (req, res) => {
	res.json({ message: 'Page not found' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(
		`Server runnning in development on port ${PORT}...`.yellow.bold
	);
});

import express from 'express';
import morgan from 'morgan';
import colors from 'colors';
import dotenv from 'dotenv';
import multer from 'multer';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import offerRoutes from './routes/offerRoutes.js';

let upload = multer();

dotenv.config();

connectDB();

mongoose.connection;

const app = express();
app.use(fileUpload({ useTempFiles: true }));
app.use(
	express.urlencoded({
		extended: true,
	})
);
// for parsing multipart/form-data
app.use(upload.any());
app.use(express.static('public'));

app.use(express.json());

app.use('/user', userRoutes);
app.use('/offer', offerRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(
		`Server runnning in development on port ${PORT}...`.yellow.bold
	);
});

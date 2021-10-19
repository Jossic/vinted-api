import express from 'express';
import morgan from 'morgan';
import colors from 'colors';

const app = express();

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(
		`Server runnning in development on port ${PORT}...`.yellow.bold
	);
});

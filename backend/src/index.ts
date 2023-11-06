import * as RecipeAPI from './recipe-api';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/recipe/search', async (req, res) => {
	const searchTerm = req.query.searchTerm as string;
	const page = parseInt(req.query.page as string);

	const results = await RecipeAPI.searchRecipes(searchTerm, page);
	res.json(results);
	//res.json({ message: 'Hello from the backdoor...' });
});

app.listen(4000, () => {
	console.log('Server is running on port 4000');
});

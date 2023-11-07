import * as RecipeAPI from './recipe-api';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

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

app.get('/api/recipes/:recipeId/summary', async (req, res) => {
	const recipeId = req.params.recipeId;
	const results = await RecipeAPI.getRecipeSummary(recipeId);
	return res.json(results);
});

app.listen(5500, () => {
	console.log('Server is running on port 5500...');
});

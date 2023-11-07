import * as RecipeAPI from './recipe-api';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const app = express();
const prismaClient = new PrismaClient();

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

app.post('/api/recipes/favourite', async (req, res) => {
	const recipeId = req.body.recipeId;

	try {
		const favouriteRecipe = await prismaClient.favouriteRecipes.create({
			data: {
				recipeId: recipeId,
			},
		});
		return res.status(201).json(favouriteRecipe);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'oops, something went wrong' });
	}
});

app.get('/api/recipes/favourite', async (req, res) => {
	try {
		const recipes = await prismaClient.favouriteRecipes.findMany();
		const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());

		const favourites = await RecipeAPI.getFavouriteRecipesByIDs(recipeIds);

		return res.json(favourites);
	} catch (error) {
		console.log(error);
	}
});

app.listen(5500, () => {
	console.log('Server is running on port 5500...');
});

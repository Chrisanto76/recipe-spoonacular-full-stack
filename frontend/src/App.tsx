import './App.css';
import React, { useState, FormEvent } from 'react';
import * as api from './api';
import { Recipe } from './types';
import RecipeCard from './components/RecipeCard';

const App = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const handleSearchSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const recipes = await api.searchRecipes(searchTerm, 1);
			setRecipes(recipes.results);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<form onSubmit={(event) => handleSearchSubmit(event)}>
				<input
					type="text"
					required
					placeholder="Search for a recipe"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
				></input>
				<button type="submit">Submit</button>
			</form>

			{recipes.map((recipe) => (
				<RecipeCard recipe={recipe} />
			))}
		</div>
	);
};

export default App;

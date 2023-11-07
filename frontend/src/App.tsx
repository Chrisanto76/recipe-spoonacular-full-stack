import './App.css';
import React, { useState, FormEvent } from 'react';
import * as api from './api';
import { Recipe } from './types';

const App = () => {
	const [searchTerm, setSearchTerm] = useState('burgers');
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const handleSearchSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const recipes = await api.searchRecipes(searchTerm, 1);
			setRecipes(recipes);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<form onSubmit={(event) => handleSearchSubmit(event)}>
				<button type="submit">Submit</button>
			</form>

			{recipes.map((recipe) => (
				<div>
					Recipe Image Location: {recipe.image}
					Recipe Title: {recipe.title}
				</div>
			))}
		</div>
	);
};

export default App;

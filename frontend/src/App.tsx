import './App.css';
import React, { useState, FormEvent } from 'react';
import * as api from './api';

const App = () => {
	const [searchTerm, setSearchTerm] = useState('burgers');
	const [recipes, setRecipes] = useState([]);

	const handleSearchSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const recipes = await api.searchRecipes(searchTerm, 1);
			setRecipes(recipes.results);
		} catch (error) {
			console.log('error');
		}
	};

	return (
		<div>
			<form onSubmit={handleSearchSubmit}>
				<button type="submit">Submit</button>
			</form>
			{recipes.map((recipe) => (
				<div key={recipe.id}>
					Recipe Image Location: {recipe.image}
					<br />
					RecipeTitle; {recipe.title}
				</div>
			))}
		</div>
	);
};

export default App;

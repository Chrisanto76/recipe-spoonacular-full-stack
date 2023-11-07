import './App.css';
import React, { useState, useRef, FormEvent } from 'react';
import * as api from './api';
import { Recipe } from './types';
import RecipeCard from './components/RecipeCard';

const App = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const pageNumber = useRef(1);

	const handleSearchSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const recipes = await api.searchRecipes(searchTerm, 1);
			setRecipes(recipes.results);
		} catch (error) {
			console.log(error);
		}
	};

	const handleViewMoreClick = async () => {
		const nextPage = (pageNumber.current += 1);
		try {
			const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
			setRecipes([...recipes, ...nextRecipes.results]);
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
			<button className="view--more-button" onClick={handleViewMoreClick}>
				View More
			</button>
		</div>
	);
};

export default App;

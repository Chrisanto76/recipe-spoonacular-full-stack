import { useEffect, useState } from 'react';
import { RecipeSummary } from '../types';
import * as RecipeAPI from '../api';

interface Props {
	recipeId: string;
}

export const RecipeModal = ({ recipeId }: Props) => {
	const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();

	useEffect(() => {
		const fetchRecipeSummary = async () => {
			try {
				const summaryRecipe = await RecipeAPI.getRecipeSummary(recipeId);
				setRecipeSummary(summaryRecipe);
			} catch (error) {
				console.log(error);
			}
		};

		fetchRecipeSummary();
	}, [recipeId]);

	if (!recipeSummary) {
		return <></>;
	}

	return (
		<>
			<div className="overlay">
				<div className="modal">
					<div className="modal--content">
						<div className="modal--header">
							<h2>{recipeSummary?.id}</h2>
							<span className="close--btn">&times;</span>
						</div>
						<p dangerouslySetInnerHTML={{ __html: recipeSummary.summary }}></p>
					</div>
				</div>
			</div>
		</>
	);
};

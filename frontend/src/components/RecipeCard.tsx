import { Recipe } from '../types';
import { AiOutlineHeart } from 'react-icons/ai';

interface Props {
	recipe: Recipe;
	onClick: () => void;
	onFavouriteButtonClick: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onClick, onFavouriteButtonClick }: Props) => {
	return (
		<div className="recipe--card" onClick={onClick}>
			<img src={recipe.image} />
			<div className="recipe--card-title">
				<span
					onClick={(event) => {
						event.stopPropagation();
						onFavouriteButtonClick(recipe);
					}}
				>
					<AiOutlineHeart size={25} />
				</span>
				<h2>{recipe.title}</h2>
			</div>
		</div>
	);
};

export default RecipeCard;

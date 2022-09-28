import React from 'react';
import { PropTypes } from 'prop-types';

function MealRecipe({ recipe }) {
  const ingredients = Object.values(recipe).slice(
    Object.keys(recipe).indexOf('strIngredient1'),
    Object.keys(recipe).indexOf('strIngredient20'),
  );
  console.log(ingredients);
  return (
    <div>
      <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="meal" />
      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
    </div>
  );
}

MealRecipe.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,

  }).isRequired,
};

export default MealRecipe;

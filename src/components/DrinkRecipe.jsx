import React from 'react';
import { PropTypes } from 'prop-types';

function DrinkRecipe({ recipe }) {
  console.log('drink', recipe);
  const ingredients = Object.values(recipe[0] || [])
    .slice(
      Object.keys(recipe[0] || []).indexOf('strIngredient1'),
      Object.keys(recipe[0] || []).indexOf('strIngredient15') + 1,
    );
  const measures = Object.values(recipe[0] || [])
    .slice(
      Object.keys(recipe[0] || []).indexOf('strMeasure1'),
      Object.keys(recipe[0] || []).indexOf('strMeasure15') + 1,
    );
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe[0]?.strDrinkThumb }
        alt="drink"
        width={ 480 }
      />
      <h2 data-testid="recipe-title">{recipe[0]?.strDrink}</h2>
      <h3 data-testid="recipe-category">{recipe[0]?.strAlcoholic}</h3>
      <p data-testid="instructions">{recipe[0]?.strInstructions}</p>
      <ul>
        {ingredients.map((ingredient, index) => (ingredient?.length > 0 && (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient} - ${measures[index] || []}`}
          </li>
        )))}
      </ul>

    </div>
  );
}

DrinkRecipe.propTypes = {
  recipe: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,

  }).isRequired,
};

export default DrinkRecipe;

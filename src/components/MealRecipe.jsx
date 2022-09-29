import React from 'react';
import { PropTypes } from 'prop-types';

function MealRecipe({ recipe }) {
  const ingredients = Object.values(recipe[0] || [])
    .slice(
      Object.keys(recipe[0] || []).indexOf('strIngredient1'),
      Object.keys(recipe[0] || []).indexOf('strIngredient20') + 1,
    );
  const measures = Object.values(recipe[0] || [])
    .slice(
      Object.keys(recipe[0] || []).indexOf('strMeasure1'),
      Object.keys(recipe[0] || []).indexOf('strMeasure20') + 1,
    );
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe[0]?.strMealThumb }
        alt="meal"
        width={ 480 }
      />
      <h2 data-testid="recipe-title">{recipe[0]?.strMeal}</h2>
      <h3 data-testid="recipe-category">{recipe[0]?.strCategory}</h3>
      <p data-testid="instructions">{recipe[0]?.strInstructions}</p>
      <ul>
        {ingredients.map((ingredient, index) => (ingredient?.length > 0 && (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient} - ${measures[index]}`}
          </li>
        )))}
      </ul>
      <iframe
        data-testid="video"
        width="480"
        height="315"
        src={ recipe[0]?.strYoutube.replace('watch?v=', 'embed/') }
        title="YouTube video player"
        frameBorder="0"
        allow={ `accelerometer; autoplay; clipboard-write; 
              encrypted-media; gyroscope; picture-in-picture` }
        allowFullScreen
      />
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

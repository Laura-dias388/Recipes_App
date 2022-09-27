import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function Cards({ recipe, index }) {
  const location = useLocation();
  console.log('card', recipe);
  return (
    <div data-testid={ `${index}-recipe-card` }>
      {location.pathname === '/meals'
        ? (
          <div>
            <img
              src={ recipe.strMealThumb }
              alt="cards-meals"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
          </div>)
        : (
          <div>
            <img
              src={ recipe.strDrinkThumb }
              alt="cards-drinks"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ recipe.strDrink }</p>
          </div>
        )}
    </div>
  );
}

Cards.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cards;

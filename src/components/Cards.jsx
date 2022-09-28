import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../context/Context';

function Cards({ recipe, index, id }) {
  const { fetchMealsSearch,
    fetchDrinksSearch,

  } = useContext(RecipeContext);
  const location = useLocation();

  const handlerClick = () => {
    if (location.pathname === '/meals') {
      fetchMealsSearch({ checkSearch: 'id', inputValue: id });
    }

    if (location.pathname === '/drinks') {
      fetchDrinksSearch({ checkSearch: 'id', inputValue: id });
    }
  };

  return (
    <div data-testid={ `${index}-recipe-card` }>
      {location.pathname === '/meals' || location.pathname === `/meals/${id}`
        ? (
          <button type="button" onClick={ handlerClick }>
            <img
              src={ recipe.strMealThumb }
              alt="cards-meals"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
          </button>)
        : (
          <button type="button" onClick={ handlerClick }>
            <img
              src={ recipe.strDrinkThumb }
              alt="cards-drinks"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ recipe.strDrink }</p>
          </button>
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
  id: PropTypes.string.isRequired,
};

export default Cards;

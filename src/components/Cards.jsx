import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';

function Cards({ recipe, index, id }) {
  const location = useLocation();
  const history = useHistory();

  const handlerClick = () => {
    if (location.pathname === '/meals') {
      // fetchMealsSearch({ checkSearch: 'id', inputValue: id });
      history.push(`/meals/${id}`);
    }

    if (location.pathname === '/drinks') {
      // fetchDrinksSearch({ checkSearch: 'id', inputValue: id });
      history.push(`/drinks/${id}`);
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

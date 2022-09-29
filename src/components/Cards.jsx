import React from 'react';
import PropTypes from 'prop-types';

function Cards({ recipe, index }) {
  console.log(index);
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <div>
        <img
          src={ recipe.image }
          alt=""
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{ recipe.name }</p>
      </div>
    </div>
  );
}

Cards.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cards;

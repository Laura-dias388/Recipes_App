import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Card.module.css';

function Cards({ recipe, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className={ styles.cardContainer }
    >

      <img
        src={ recipe.image }
        alt=""
        data-testid={ `${index}-card-img` }
      />
      <div className={ styles.cardContent }>
        <span data-testid={ `${index}-card-name` }>{ recipe.name }</span>
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

import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      style={ {
        position: 'fixed',
        left: '0',
        bottom: '0',
      } }
    >
      <button
        type="button"
        onClick={ () => history.push('/meals') }
      >
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="search" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="search" />
      </button>
    </footer>
  );
}

export default Footer;

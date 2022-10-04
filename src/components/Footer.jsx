import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import styles from '../styles/Footer.module.css';

function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className={ styles.footerContainer }
    >
      <div className={ styles.footerWrapper }>

        <button
          type="button"
          onClick={ () => history.push('/meals') }
        >
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="search"
            className={ styles.footerIcon }
          />

        </button>
        <div className={ styles.footerSeparator } />
        <button
          type="button"
          onClick={ () => history.push('/drinks') }
        >
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="search" />
        </button>
      </div>

    </footer>
  );
}

export default Footer;

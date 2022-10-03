import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import styles from '../styles/Header.module.css';

function Header() {
  const location = useLocation();
  const history = useHistory();
  const [isSerachBarVisible, setIsSerachBarVisible] = useState(false);
  let title = '';
  let isBtnSearchVisible = true;

  if (location.pathname === '/meals') title = 'Meals';
  if (location.pathname === '/drinks') title = 'Drinks';
  if (location.pathname === '/profile') {
    title = 'Profile';
    isBtnSearchVisible = false;
  }
  if (location.pathname === '/done-recipes') {
    title = '"Done Recipes';
    isBtnSearchVisible = false;
  }
  if (location.pathname === '/favorite-recipes') {
    title = 'Favorite Recipes';
    isBtnSearchVisible = false;
  }

  return (
    <header className={ styles.headerContainer }>
      <div className={ styles.headerWrapper }>
        <h2 data-testid="page-title">{title}</h2>
        <div className={ styles.headerWrapperButton }>
          {isBtnSearchVisible
           && (
             <button
               type="button"
               onClick={ () => setIsSerachBarVisible(!isSerachBarVisible) }
               className={ styles.headerButtonSearch }
             >
               <img data-testid="search-top-btn" src={ searchIcon } alt="search" />
             </button>)}
          <button
            type="button"
            onClick={ () => history.push('/profile') }
            className={ styles.headerButtonProfile }
          >
            <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
          </button>
        </div>
      </div>
      <div>
        {isSerachBarVisible
        && (
          <SearchBar />)}
      </div>
    </header>
  );
}

export default Header;

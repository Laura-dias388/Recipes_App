import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const location = useLocation();
  const history = useHistory();
  const [isSerachBarVisible, setIsSerachBarVisible] = useState(false);
  let title = '';
  let isBtnSearchVisible = true;
  console.log(location);

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
    <div>
      <div>
        <h2 data-testid="page-title">{title}</h2>
        <div>
          {isBtnSearchVisible
           && (
             <button
               type="button"
               onClick={ () => setIsSerachBarVisible(!isSerachBarVisible) }
             >
               <img data-testid="search-top-btn" src={ searchIcon } alt="search" />
             </button>)}
          <button
            type="button"
            onClick={ () => history.push('/profile') }
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
    </div>
  );
}

export default Header;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteShareBar({ recipe }) {
  const [didCopyLink, setDidCopyLink] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);
  const location = useLocation();
  // const isPathMeal = location.pathname.includes('meals');
  const origin = location.pathname.split('/')[1];
  const actualRecipe = {
    id: recipe.id,
    type: origin.slice(0, origin.length - 1),
    nationality: recipe.nationality || '',
    category: recipe.category,
    name: recipe.name,
    image: recipe.image,
    alcoholicOrNot: recipe.alcoholicOrNot,
  };

  useEffect(() => {
    setIsFavorite((favorites || []).some((favorite) => favorite.id === recipe.id));
  }, [favorites]);

  const copyLinkToClipboard = () => {
    const splitedPath = location.pathname.split('/');
    copy(`http://localhost:3000/${splitedPath[1]}/${splitedPath[2]}`);
    setDidCopyLink(true);
  };

  const removeFromFavorites = () => {
    setFavorites(favorites.filter((favorite) => favorite.id !== recipe.id));
  };

  const addToFavorites = () => {
    setFavorites((prevFavorites) => ([...prevFavorites, actualRecipe]));
  };

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };

  return (
    <div>
      <input
        data-testid="favorite-btn"
        type="image"
        onClick={ handleFavorite }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite"
      />
      <input
        data-testid="share-btn"
        type="image"
        onClick={ copyLinkToClipboard }
        src={ shareIcon }
        alt="copy to clipboard"
      />
      { didCopyLink && <p>Link copied!</p> }
    </div>
  );
}

FavoriteShareBar.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    nationality: PropTypes.string,
  }).isRequired,
};

export default FavoriteShareBar;

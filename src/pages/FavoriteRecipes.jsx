import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import useLocalStorage from '../hooks/useLocalStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);
  const [noFilter, setNoFilter] = useState(true);
  const [filterBy, setFilterBy] = useState('');
  const [didCopyLink, setDidCopyLink] = useState(false);

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  };

  const handleClick = ({ target }) => {
    setNoFilter(false);
    if (target.name === 'all') {
      setNoFilter(true);
    } else {
      setFilterBy(target.name);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            name="all"
            onClick={ handleClick }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            name="meal"
            onClick={ handleClick }
          >
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            name="drink"
            onClick={ handleClick }
          >
            Drinks
          </button>
        </div>
        <div>
          {favorites.filter(({ type }) => noFilter || type === filterBy)
            .map((favorite, index) => (
              <div
                key={ favorite.id }
                style={ { display: 'flex' } }
              >
                <div>
                  <Link
                    to={ { pathname: `/${favorite.type}s/${favorite.id}` } }
                  >
                    <img
                      className="recipe-card-img"
                      data-testid={ `${index}-horizontal-image` }
                      alt="Recipe"
                      src={ favorite.image }
                      width="100"
                    />
                  </Link>
                </div>
                <div>
                  <div>
                    <Link
                      to={ { pathname: `/${favorite.type}s/${favorite.id}` } }
                    >
                      <h5 data-testid={ `${index}-horizontal-name` }>{favorite.name}</h5>
                    </Link>
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {favorite.type === 'meal'
                        ? `${favorite.nationality} - ${favorite.category}`
                        : favorite.alcoholicOrNot}
                    </p>
                  </div>
                  <div
                    style={ { display: 'flex' } }
                  >
                    <input
                      data-testid={ `${index}-horizontal-share-btn` }
                      type="image"
                      onClick={ () => {
                        copy(`http://localhost:3000/${favorite.type}s/${favorite.id}`);
                        setDidCopyLink(true);
                      } }
                      src={ shareIcon }
                      alt="copy to clipboard"
                    />
                    {didCopyLink && <p>Link copied!</p>}
                    <input
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      type="image"
                      onClick={ () => removeFromFavorites(favorite.id) }
                      src={ blackHeartIcon }
                      alt="Favorite"
                    />
                  </div>

                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FavoriteRecipes;

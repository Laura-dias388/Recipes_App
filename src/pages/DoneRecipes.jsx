import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import useLocalStorage from '../hooks/useLocalStorage';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneRecipes] = useLocalStorage('doneRecipes', []);
  const [didCopyLink, setDidCopyLink] = useState(false);
  const [noFilter, setNoFilter] = useState(true);
  const [filterBy, setFilterBy] = useState('');

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
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleClick }
        name="meal"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleClick }
        name="drink"
      >
        Drinks
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleClick }
        name="all"
      >
        All
      </button>
      <div>
        {
          doneRecipes.filter(({ type }) => noFilter || type === filterBy)
            .map((favorite, index) => (
              <div
                key={ favorite.id }
                style={ { display: 'flex-box' } }
              >
                {console.log('favorite', favorite)}
                <div>
                  <div>
                    <Link
                      to={ { pathname: `/${favorite.type}s/${favorite.id}` } }
                    >
                      <img
                        className="recipe-card-img"
                        src={ favorite.image }
                        alt="images"
                        data-testid={ `${index}-horizontal-image` }
                        width="200"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={ { pathname: `/${favorite.type}s/${favorite.id}` } }
                    >
                      <h3 data-testid={ `${index}-horizontal-name` }>
                        { favorite.name }
                      </h3>
                    </Link>
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {favorite.type === 'meal'
                        ? `${favorite.nationality} - ${favorite.category}`
                        : favorite.alcoholicOrNot}
                    </p>
                  </div>
                </div>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  { favorite.doneDate }
                </p>
                <div>
                  { favorite.tags?.map((item, i) => (
                    <p
                      key={ i }
                      data-testid={ `${index}-${item}-horizontal-tag` }
                    >
                      { item }
                    </p>
                  )) }
                </div>
                <input
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="image"
                  onClick={ () => {
                    console.log(favorite, 'favorite');
                    copy(`http://localhost:3000/${favorite.type}s/${favorite.id}`);
                    setDidCopyLink(true);
                  } }
                  src={ shareIcon }
                  alt="copy to clipboard"
                />
                { didCopyLink && <p>Link copied!</p> }
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default DoneRecipes;

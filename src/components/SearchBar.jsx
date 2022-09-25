import { useState } from 'react';

export default function SearchBar() {
  /*  const URL_BASE = `https://www.themealdb.com/api/json/v1/1/`;
  const URL_INGREDIENT = `filter.php?i=`;
  const URL_NAME = `search.php?s=`;
  const URL_FIRST_LETTER = `search.php?f=`;
 */
  const [searchType, setSearchType] = useState('name');
  const [searchInput, setSearchInput] = useState('');

  const handlerButton = () => {
    /*  if (searchType === 'ingredient') {
      const URL = `${URL_BASE}${URL_INGREDIENT}${searchInput}`;
    }
    if (searchType === 'name') {
      const URL = `${URL_BASE}${URL_NAME}${searchInput}`;
    }
    if (searchType === 'firstLetter') {
      const URL = `${URL_BASE}${URL_FIRST_LETTER}${searchInput}`;
    } */
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        name="search-input"
        placeholder="Type Your Search"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target) }
      />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="radio-options"
          value="ingredient"
          id="ingredient"
          checked={ searchType === 'ingredient' }
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        Ingredient
      </label>
      <label htmlFor="search">
        <input
          data-testid="name-search-radio"
          type="radio"
          name="radio-options"
          value="search"
          id="search"
          checked={ searchType === 'search' }
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="radio-options"
          value="first-letter"
          id="first-letter"
          checked={ searchType === 'first-letter' }
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        First Letter
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handlerButton }
      >
        Enviar
      </button>
    </div>
  );
}

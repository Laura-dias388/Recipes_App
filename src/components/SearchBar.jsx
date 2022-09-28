import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import RecipeContext from '../context/Context';

export default function SearchBar() {
  /*  const URL_BASE = `https://www.themealdb.com/api/json/v1/1/`;
  const URL_INGREDIENT = `filter.php?i=`;
  const URL_NAME = `search.php?s=`;
  const URL_FIRST_LETTER = `search.php?f=`;
 */
  const { fetchMealsSearch,
    fetchDrinksSearch,

  } = useContext(RecipeContext);
  const { register, handleSubmit, reset } = useForm();
  const { pathname } = useLocation();

  function handleFilterSearchSubmit(data) {
    if (data.checkSearch === 'first-letter' && data.inputValue.length > 1) {
      reset();
      global.alert('Your search must have only 1 (one) character');
      return null;
    }

    if (pathname === '/meals') {
      fetchMealsSearch(data);
      reset();
    }

    if (pathname === '/drinks') {
      fetchDrinksSearch(data);
      reset();
    }
  }

  return (
    <form onSubmit={ handleSubmit(handleFilterSearchSubmit) }>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Type Your Search"
        { ...register('inputValue') }
      />

      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="radio-options"
          value="ingredient"
          id="ingredient"
          { ...register('checkSearch') }
        />
        Ingredient
      </label>

      <label htmlFor="search">
        <input
          data-testid="name-search-radio"
          type="radio"
          name="radio-options"
          value="name"
          id="search"
          { ...register('checkSearch') }
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
          { ...register('checkSearch') }
        />
        First Letter
      </label>
      <button
        data-testid="exec-search-btn"
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
}

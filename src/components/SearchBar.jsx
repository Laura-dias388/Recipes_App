import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Label from '@radix-ui/react-label';
import RecipeContext from '../context/Context';
import styles from '../styles/SearchBar.module.css';

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
    <form
      onSubmit={ handleSubmit(handleFilterSearchSubmit) }
      className={ styles.searchBarContainer }
    >
      <div className={ styles.searchBarContainerRadio }>

        <input
          data-testid="search-input"
          type="text"
          placeholder="Type Your Search"
          { ...register('inputValue') }
        />

        <RadioGroup.Root className={ styles.searchBarContainerRadioItems }>
          <RadioGroup.Item
            id="ingredient"
            className={ styles.searchBarRadioGroupItem }
            data-testid="ingredient-search-radio"
            value="ingredient"
            { ...register('checkSearch') }

          >
            <Label.Root htmlFor="ingredient">Ingredients</Label.Root>
          </RadioGroup.Item>

          <RadioGroup.Item
            value="name"
            id="search"
            className={ styles.searchBarRadioGroupItem }
            data-testid="name-search-radio"
            { ...register('checkSearch') }

          >
            <Label.Root htmlFor="Name">Name</Label.Root>
          </RadioGroup.Item>

          <RadioGroup.Item
            value="first-letter"
            id="first-letter"
            className={ styles.searchBarRadioGroupItem }
            data-testid="first-letter-search-radio"
            { ...register('checkSearch') }

          >
            <Label.Root htmlFor="first-letter">First Letter</Label.Root>
          </RadioGroup.Item>
        </RadioGroup.Root>

      </div>
      <button
        data-testid="exec-search-btn"
        type="submit"
        className={ styles.searchBarContainerButton }
      >
        Filter
      </button>

    </form>
  );
}

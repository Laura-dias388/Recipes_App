import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './Context';
import {
  fetchRecipe,
  fetchMealsIngredient, fetchMealsName,
  fetchMealsFirstLetter, fetchDrinksIngredients,
  fetchDrinksName, fetchDrinksFirstLetter,
} from '../services/FetchAPI';

function Provider({ children }) {
  const URL_BASE_MEAL = 'https://www.themealdb.com/api/json/v1/1/';
  // const URL_BASE_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';
  // const URL_INGREDIENT = 'filter.php?i=';
  // const URL_NAME = 'search.php?s=';
  // const URL_FIRST_LETTER = 'search.php?f=';

  const [searchMealsResponse, setSearchMealsResponse] = useState([]);
  console.log(searchMealsResponse);
  const [searchDrinksResponse, setSearchDrinksResponse] = useState({});
  console.log(searchDrinksResponse);

  const [urlToFetch, setUrlToFetch] = useState({
    urlBase: URL_BASE_MEAL,
    urlTypeFilter: '',
    urlInput: '',
  });
  const [url, setUrl] = useState('');

  const [data, setData] = useState({});

  // useEffect(() => {
  //   setUrl(`${urlBase}${urlTypeFilter}${urlInput}`);
  // }, [urlToFetch]);

  // useEffect(() => {
  //   setData(fetchRecipe(urlToFetch));
  // }, [url]);

  async function fetchMealsSearch(query) {
    const { checkSearch, inputValue } = query;

    if (checkSearch === 'ingredient') {
      const response = await fetchMealsIngredient(inputValue);

      setSearchMealsResponse(response);
    }

    if (checkSearch === 'name') {
      const response = await fetchMealsName(inputValue);

      setSearchMealsResponse(response);
    }
    if (checkSearch === 'first-letter') {
      const response = await fetchMealsFirstLetter(inputValue);

      setSearchMealsResponse(response);
    }
  }

  async function fetchDrinksSearch(query) {
    const { inputValue, checkSearch } = query;

    if (checkSearch === 'ingredient') {
      const response = await fetchDrinksIngredients(inputValue);
      setSearchDrinksResponse(response);
    }
    if (checkSearch === 'name') {
      const response = await fetchDrinksName(inputValue);
      setSearchDrinksResponse(response);
    }
    if (checkSearch === 'first-letter') {
      const response = await fetchDrinksFirstLetter(inputValue);
      console.log(inputValue);
      setSearchDrinksResponse(response);
    }
  }

  const recipesValues = useMemo(() => ({
    data,
    url,
    setUrlToFetch,
    fetchMealsSearch,
    fetchDrinksSearch,
  }));

  return (
    <RecipeContext.Provider value={ recipesValues }>
      {children}
    </RecipeContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

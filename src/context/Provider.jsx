import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './Context';
import {
  // fetchRecipe,
  fetchMealsIngredient, fetchMealsName,
  fetchMealsFirstLetter, fetchDrinksIngredients,
  fetchDrinksName, fetchDrinksFirstLetter,
} from '../services/FetchAPI';

function Provider({ children }) {
  const [searchMealsResponse, setSearchMealsResponse] = useState([]);
  console.log(searchMealsResponse);
  const [searchDrinksResponse, setSearchDrinksResponse] = useState([]);
  console.log(searchDrinksResponse);

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
    fetchMealsSearch,
    fetchDrinksSearch,
    searchMealsResponse,
    setSearchMealsResponse,
    searchDrinksResponse,
    setSearchDrinksResponse,
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

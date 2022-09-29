import React, { useState, useMemo, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from './Context';
import {
  fetchMealsIngredient, fetchMealsName,
  fetchMealsFirstLetter, fetchDrinksIngredients,
  fetchDrinksName, fetchDrinksFirstLetter, fetchMeals, fetchDrinks,
  fetchCategoryMealsRequest, fetchCategoryDrinksRequest,
} from '../services/FetchAPI';

function Provider({ children }) {
  const [searchMealsResponse, setSearchMealsResponse] = useState([]);
  const [searchDrinksResponse, setSearchDrinksResponse] = useState([]);
  const history = useHistory();
  const { pathname } = useLocation();

  function createRecipeItems(query) {
    if (query !== null) {
      const itemRecipe = query.map((items) => {
        if (pathname === '/meals' || pathname === '/meals/:id') {
          const createRecipe = {
            id: items.idMeal,
            name: items.strMeal,
            image: items.strMealThumb,
          };
          return createRecipe;
        }
        const createRecipe = {
          id: items.idDrink,
          name: items.strDrink,
          image: items.strDrinkThumb,
        };
        return createRecipe;
      });
      return itemRecipe;
    }
    return query;
  }

  async function fetchMealsSearch(query) {
    const { checkSearch, inputValue } = query;
    let response = [];

    switch (checkSearch) {
    case 'ingredient':
      response = await fetchMealsIngredient(inputValue);
      break;

    case 'name':
      response = await fetchMealsName(inputValue);
      break;

    default:
      response = await fetchMealsFirstLetter(inputValue);// first letter;
      break;
    }

    if (response === null) {
      setSearchMealsResponse([]);
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return null;
    }

    const filteredMeals = createRecipeItems(response);

    if (response.length === 1) {
      const filterId = response.map((state) => state.idMeal).toString();
      setSearchMealsResponse(filteredMeals);
      history.push(`/meals/${filterId}`);
    } else {
      setSearchMealsResponse(filteredMeals);
    }
  }

  async function fetchDrinksSearch(query) {
    const { inputValue, checkSearch } = query;
    let response = [];

    switch (checkSearch) {
    case 'ingredient':
      response = await fetchDrinksIngredients(inputValue);
      break;

    case 'name':
      response = await fetchDrinksName(inputValue);
      break;

    default:
      response = await fetchDrinksFirstLetter(inputValue); // first letter;
      break;
    }

    const filteredDrinks = createRecipeItems(response);

    if (response === null) {
      setSearchDrinksResponse([]);
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return null;
    }

    if (response.length === 1) {
      const filterId = response.map((state) => state.idDrink).toString();
      setSearchDrinksResponse(filteredDrinks);
      history.push(`/drinks/${filterId}`);
    } else {
      setSearchDrinksResponse(filteredDrinks);
    }
  }

  async function fetchInitial() {
    const fetchMealsData = await fetchMeals();
    const filteredMeals = createRecipeItems(fetchMealsData);
    setSearchMealsResponse(filteredMeals);

    const fetchDrinksData = await fetchDrinks();
    const filteredDrinks = createRecipeItems(fetchDrinksData);
    setSearchDrinksResponse(filteredDrinks);
  }

  async function fetchCategoryMealsSearch(query) {
    if (query === 'All') {
      return fetchInitial();
    }

    if (query === '') {
      return fetchInitial();
    }

    const response = await fetchCategoryMealsRequest(query);
    const filteredMeals = createRecipeItems(response);
    setSearchMealsResponse(filteredMeals);
  }

  async function fetchCategoryDrinksSearch(query) {
    if (query === 'All') {
      return fetchInitial();
    }

    if (query === '') {
      return fetchInitial();
    }

    const response = await fetchCategoryDrinksRequest(query);
    const filteredDrinks = createRecipeItems(response);
    setSearchDrinksResponse(filteredDrinks);
  }

  useEffect(() => {
    fetchInitial();
  }, []);

  const recipesValues = {
    fetchMealsSearch,
    fetchDrinksSearch,
    searchMealsResponse,
    setSearchMealsResponse,
    searchDrinksResponse,
    setSearchDrinksResponse,
fetchCategoryMealsSearch,
    fetchCategoryDrinksSearch,
    createRecipeItems,
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

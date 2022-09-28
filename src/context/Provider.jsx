import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from './Context';
import {
  fetchMealsIngredient, fetchMealsName,
  fetchMealsFirstLetter, fetchDrinksIngredients,
  fetchDrinksName, fetchDrinksFirstLetter, fetchMeals, fetchDrinks,
} from '../services/FetchAPI';

function Provider({ children }) {
  const [searchMealsResponse, setSearchMealsResponse] = useState([]);
  const [searchDrinksResponse, setSearchDrinksResponse] = useState([]);
  const history = useHistory();

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

    if (response.length === 1) {
      const filterId = response.map((state) => state.idMeal).toString();
      setSearchMealsResponse(response);
      history.push(`/meals/${filterId}`);
    } else {
      setSearchMealsResponse(response);
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

    if (response === null) {
      setSearchDrinksResponse([]);
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return null;
    }

    if (response.length === 1) {
      const filterId = response.map((state) => state.idDrink).toString();
      setSearchDrinksResponse(response);
      history.push(`/drinks/${filterId}`);
    } else {
      setSearchDrinksResponse(response);
    }
  }

  async function fetchInitial() {
    const fetchMealsData = await fetchMeals();
    setSearchMealsResponse(fetchMealsData);
    const fetchDrinksData = await fetchDrinks();
    setSearchDrinksResponse(fetchDrinksData);
  }

  useEffect(() => {
    fetchInitial();
  }, []);

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

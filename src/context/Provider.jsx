import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from './Context';
import {
  fetchMealsIngredient, fetchMealsName,
  fetchMealsFirstLetter, fetchDrinksIngredients,
  fetchDrinksName, fetchDrinksFirstLetter, fetchMeals, fetchDrinks,
  fetchDrinkId, fetchMealId,
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

    case 'first-letter':
      response = await fetchMealsFirstLetter(inputValue);
      break;

    case 'id':
      response = await fetchMealId(inputValue);
      break;

    default:
      response = [];
    }

    if (response === null) {
      setSearchMealsResponse([]);
      console.log('null');
      return alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (response.length === 1) {
      const filterId = response.map((state) => state.idMeal).toString();
      setSearchMealsResponse(response);
      console.log('1', searchMealsResponse, response);
      history.push(`/meals/${filterId}`);
      console.log('2', searchMealsResponse);
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

    case 'first-letter':
      response = await fetchDrinksFirstLetter(inputValue);
      break;

    case 'id':
      response = await fetchDrinkId(inputValue);
      break;

    default:
      response = [];
    }

    if (response === null) {
      setSearchDrinksResponse([]);
      return alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (response.length === 1) {
      const filterId = response.map((state) => state.idDrink).toString();
      setSearchDrinksResponse(response);
      console.log('1', searchDrinksResponse);
      history.push(`/drinks/${filterId}`);
      console.log('2', searchDrinksResponse);
    } else {
      setSearchDrinksResponse(response);
    }
  }

  async function fetchInitial() {
    // const fetchMealsData = await fetchMeals();
    // setSearchMealsResponse(fetchMealsData);
    // const fetchDrinksData = await fetchDrinks();
    // setSearchDrinksResponse(fetchDrinksData);
    console.log('inicial');
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

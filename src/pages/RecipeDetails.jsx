import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../context/Context';
// import { fetchDrinkId, fetchMealId } from '../services/FetchAPI';
import MealRecipe from '../components/MealRecipe';
import DrinkRecipe from '../components/DrinkRecipe';

function RecipeDetails() {
  const INDEX_ID = -1;
  const INDEX_ORIGIN = -2;
  const [recipe, setRecipe] = useState([]);

  const location = useLocation();
  const {
    setSearchMealsResponse,
    setSearchDrinksResponse } = useContext(RecipeContext);
  const recipeOriginId = location.pathname.split('/');
  const origin = recipeOriginId.at(INDEX_ORIGIN);
  const id = recipeOriginId.at(INDEX_ID);

  useEffect(() => {
    const fetchRecipe = async () => {
      let response = [];
      // const response = await fetchMealsSearch({ checkSearch: 'id', inputValue: id });
      console.log(origin, id);
      if (origin === 'meals') {
        response = await fetchMealId(id);
        setSearchMealsResponse(response);
      }
      if (origin === 'drinks') {
        response = await fetchDrinkId(id);
        setSearchDrinksResponse(response);
      }
      console.log('response', response);
      setRecipe(response);
      console.log('recipe', recipe);
    };
    fetchRecipe();
  }, []);

  return (
    <div>
      {origin === 'meals'
        ? (<MealRecipe recipe={ recipe } />)
        : (<DrinkRecipe recipe={ recipe } />)}
    </div>
  );
}

export default RecipeDetails;

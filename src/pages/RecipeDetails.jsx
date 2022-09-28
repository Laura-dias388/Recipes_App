import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import RecipeDetails from '../components/RecipeDetails';
import RecipeContext from '../context/Context';
import { fetchMealId } from '../services/FetchAPI';
import MealRecipe from '../components/MealRecipe';
import DrinkRecipe from '../components/DrinkRecipe';

function RecipeDetails() {
  const INDEX_ID = -1;
  const INDEX_ORIGIN = -2;
  const { fetchMealsSearch,
    fetchDrinksSearch,

  } = useContext(RecipeContext);
  const location = useLocation();
  const { searchMealsResponse, setSearchMealsResponse } = useContext(RecipeContext);
  const recipeOriginId = location.pathname.split('/');
  const origin = recipeOriginId.at(INDEX_ORIGIN);
  const id = recipeOriginId.at(INDEX_ID);
  let recipe = [];

  useEffect(() => {
    console.log(recipeOriginId, origin, id);
    const fetchRecipe = async () => {
      const response = await fetchMealsSearch({ checkSearch: 'id', inputValue: id });
      // const response = await fetchMealId(id);
      console.log('response', response);
      setSearchMealsResponse(response);
      recipe = response;
      console.log('state', searchMealsResponse);
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

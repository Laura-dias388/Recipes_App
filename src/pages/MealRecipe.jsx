import React, { useContext } from 'react';
import RecipeContext from '../context/Context';

function MealRecipe() {
  const { searchMealsResponse } = useContext(RecipeContext);
  console.log('MealRecipe', searchMealsResponse);
  return (
    <div><RecipeDetails /></div>
  );
}

export default MealRecipe;

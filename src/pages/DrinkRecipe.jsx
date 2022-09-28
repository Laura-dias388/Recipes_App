import React, { useContext } from 'react';
import RecipeContext from '../context/Context';
import RecipeDetails from '../components/RecipeDetails';

export default function DrinkRecipe() {
  const { searchDrinksResponse } = useContext(RecipeContext);
  console.log('DrinkRecipe', searchDrinksResponse);
  return (
    <div><RecipeDetails /></div>
  );
}

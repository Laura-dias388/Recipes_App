import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Cards from '../components/Cards';
// import RecipeContext from '../context/Context';
import fetchRecipe from '../services/FetchAPI';

const MAX_CARDS = 12;

function Meals() {
  // const { recipeCard, setRecipeCard } = useContext(RecipeContext);
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    const newFetch = async () => {
      const fetchRecipeOfAPI = await fetchRecipe('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRecipeList(fetchRecipeOfAPI.meals.slice(0, MAX_CARDS));
    };
    newFetch();
  }, []);
  // const recipeList = newFetch();

  return (
    <div>
      <Header />
      <Recipes />
      {recipeList.length > 0 && recipeList
        .map((recipe, index) => (
          <Cards key={ recipe.idMeal } index={ index } recipe={ recipe } />))}
      <Footer />
    </div>
  );
}

export default Meals;

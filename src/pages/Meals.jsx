import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Cards from '../components/Cards';
import RecipeContext from '../context/Context';

const MAX_CARDS = 12;

function Meals() {
  const { searchMealsResponse } = useContext(RecipeContext);
  const recipeList = searchMealsResponse.slice(0, MAX_CARDS);

  return (
    <div>
      <Header />
      <Recipes />
      {recipeList.length > 0 && (recipeList
        .map((recipe, index) => (
          <Cards
            key={ recipe.idMeal }
            index={ index }
            recipe={ recipe }
            id={ recipe.idMeal }
          />)))}
      <Footer />
    </div>
  );
}

export default Meals;

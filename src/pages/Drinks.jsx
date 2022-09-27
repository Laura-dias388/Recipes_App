import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Cards from '../components/Cards';
import RecipeContext from '../context/Context';

const MAX_CARDS = 12;

function Drinks() {
  const { searchDrinksResponse } = useContext(RecipeContext);
  console.log('teste cardD', searchDrinksResponse);
  const recipeListDrink = searchDrinksResponse.slice(0, MAX_CARDS) || [];

  return (
    <div>
      <Header />
      <Recipes />
      {recipeListDrink.length > 0 && recipeListDrink
        .map((recipe, index) => (
          <Cards key={ recipe.idDrink } index={ index } recipe={ recipe } />))}
      <Footer />
    </div>
  );
}

export default Drinks;

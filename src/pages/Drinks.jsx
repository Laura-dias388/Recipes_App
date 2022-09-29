import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Cards from '../components/Cards';
import RecipeContext from '../context/Context';

const MAX_CARDS = 12;

function Drinks() {
  const { searchDrinksResponse } = useContext(RecipeContext);

  const recipeListDrink = searchDrinksResponse.length > 0
    && searchDrinksResponse.slice(0, MAX_CARDS);

  return (
    <div>
      <Header />
      <Recipes />
      {recipeListDrink.length > 0 && recipeListDrink
        .map((recipe, index) => (
          <Link
            key={ recipe.id }
            to={ { pathname: `/drinks/${recipe.id}` } }
          >
            <Cards
              key={ recipe.id }
              index={ index }
              recipe={ recipe }
            />
          </Link>
        ))}
      <Footer />
    </div>
  );
}

export default Drinks;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Cards from '../components/Cards';
import RecipeContext from '../context/Context';

const MAX_CARDS = 12;

function Meals() {
  const { searchMealsResponse } = useContext(RecipeContext);

  const recipeList = searchMealsResponse.length > 0
  && searchMealsResponse.slice(0, MAX_CARDS);

  return (
    <div>
      <Header />
      <Recipes />
      {recipeList.length > 0 && (recipeList
        .map((recipe, index) => (

          <Link
            key={ recipe.id }
            to={ { pathname: `/meals/${recipe.id}`, state: { recipe, index } } }
          >
            <Cards
              key={ recipe.id }
              index={ index }
              recipe={ recipe }
            />

          </Link>
        )))}
      <Footer />
    </div>
  );
}

export default Meals;

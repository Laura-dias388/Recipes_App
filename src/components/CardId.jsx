import React, { useEffect, useState } from 'react';
import { fetchSearchMealsId, fetchSearchDrinksId } from '../services/FetchAPI';

function CardId(props) {
  const propItems = props;
  const { path } = propItems.match;
  const { id } = propItems.match.params;
  const [recipesId, setRecipesId] = useState([]);

  function createRecipeItemsId(query) {
    if (query !== null) {
      const itemRecipe = query.map((items) => {
        if (path === '/meals/:id') {
          const createRecipe = {
            id: items.idMeal,
            name: items.strMeal,
            image: items.strMealThumb,
          };
          return createRecipe;
        }
        const createRecipe = {
          id: items.idDrink,
          name: items.strDrink,
          image: items.strDrinkThumb,
        };
        return createRecipe;
      });
      return itemRecipe;
    }
    return query;
  }

  async function SetRecipes() {
    if (path === '/meals/:id') {
      const response = await fetchSearchMealsId(id);
      const recipes = createRecipeItemsId(response);
      setRecipesId(recipes);
    } else {
      const response = await fetchSearchDrinksId(id);
      const recipes = createRecipeItemsId(response);
      setRecipesId(recipes);
    }
  }
  console.log(recipesId);

  useEffect(() => {
    SetRecipes();
  }, []);

  return (
    <div>
      { recipesId.map((recipeId, index) => (
        <div key={ index }>
          <img
            src={ recipeId.image }
            alt=""
          />
          <p>{recipeId.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CardId;

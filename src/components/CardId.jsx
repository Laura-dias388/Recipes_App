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
            ingredients: Object.entries(items)
              .filter((key) => key[0].includes('strIngredient'))
              .map((value) => `${value[0]}: ${value[1]}`),
          };
          return createRecipe;
        }
        const createRecipe = {
          id: items.idDrink,
          name: items.strDrink,
          image: items.strDrinkThumb,
          ingredients: Object.entries(items)
            .filter((key) => key[0].includes('strIngredient'))
            .map((value) => `${value[0]}: ${value[1]}`),
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
      console.log(response);

      const recipes = createRecipeItemsId(response);
      console.log(recipes);
      setRecipesId(recipes);
    }
  }

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

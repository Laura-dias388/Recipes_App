import React, { useEffect, useState } from 'react';
import { fetchSearchMealsId, fetchSearchDrinksId } from '../services/FetchAPI';

function CardId(props) {
  const propItems = props;
  const { path } = propItems.match;
  const { id } = propItems.match.params;
  const [recipesId, setRecipesId] = useState([]);
  const isPathMeal = path === '/meals/:id';
  const NUM_IGREDIENTS_MEAL = 20;
  const NUM_IGREDIENTS_DRINK = 15;

  function setElements(items, element, qtd) {
    return Object.values(items || []).slice(
      Object.keys(items || []).indexOf(`${element}1`),
      Object.keys(items || []).indexOf(`${element}${qtd}`) + 1,
    );
  }

  function createRecipeItemsId(query) {
    if (query !== null) {
      const itemRecipe = query.map((items) => {
        if (isPathMeal) {
          const createRecipe = {
            id: items.idMeal,
            name: items.strMeal,
            image: items.strMealThumb,
            category: items.strCategory,
            instructions: items.strInstructions,
            youtube: items.strYoutube,
            ingredients: setElements(items, 'strIngredient', NUM_IGREDIENTS_MEAL),
            measures: setElements(items, 'strMeasure', NUM_IGREDIENTS_MEAL),
          };
          return createRecipe;
        }
        const createRecipe = {
          id: items.idDrink,
          name: items.strDrink,
          image: items.strDrinkThumb,
          category: items.strAlcoholic,
          instructions: items.strInstructions,
          ingredients: setElements(items, 'strIngredient', NUM_IGREDIENTS_DRINK),
          measures: setElements(items, 'strMeasure', NUM_IGREDIENTS_DRINK),
        };
        console.log(createRecipe);
        return createRecipe;
      });
      return itemRecipe;
    }
    console.log(query);
    return query;
  }

  async function SetRecipes() {
    if (isPathMeal) {
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
            data-testid="recipe-photo"
            src={ recipeId.image }
            alt=""
          />
          <p data-testid="recipe-title">{recipeId.name}</p>
          <p data-testid="recipe-category">{recipeId.category}</p>
          <ul>
            {recipeId.ingredients.map((ingredient, i) => (ingredient?.length > 0 && (
              <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {`${ingredient} - ${recipeId.measures[i]}`}
              </li>
            )))}
          </ul>
          <p data-testid="instructions">{recipeId.instructions}</p>
          {isPathMeal && (
            <iframe
              data-testid="video"
              width="480"
              height="315"
              src={ recipeId?.youtube.replace('watch?v=', 'embed/') }
              title="YouTube video player"
              frameBorder="0"
              allow={ `accelerometer; autoplay; clipboard-write; 
                  encrypted-media; gyroscope; picture-in-picture` }
              allowFullScreen
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default CardId;

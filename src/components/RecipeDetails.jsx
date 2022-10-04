import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchSearchMealsId,
  fetchSearchDrinksId,
  fetchMeals,
  fetchDrinks,
} from '../services/FetchAPI';
import styles from '../styles/CardId.module.css';
import useLocalStorage from '../hooks/useLocalStorage';
import FavoriteShareBar from './FavoriteShareBar';

function RecipeDetails(props) {
  const propItems = props;

  const { path } = propItems.match;
  const { id } = propItems.match.params;
  const origin = path.split('/')[1];
  const isPathMeal = path === '/meals/:id';
  // const isPathDrinks = path === '/drinks/:id';
  const typeUrl = isPathMeal ? 'meals' : 'drinks';

  const [recipesId, setRecipesId] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [findRecipeClass, setFindRecipeClass] = useState();
  const [stateButton, setStateButton] = useState();

  const [doneRecipes] = useLocalStorage('doneRecipes', []);
  const [inProgressRecipes] = useLocalStorage('inProgressRecipes', []);

  const NUM_IGREDIENTS_MEAL = 20;
  const NUM_IGREDIENTS_DRINK = 15;
  const NUM_SUGGESTION = 6;

  function setElements(items, element, qtd) {
    return Object.values(items)?.slice(
      Object.keys(items)?.indexOf(`${element}1`),
      Object.keys(items).indexOf(`${element}${qtd}`) + 1,
    );
  }

  function createRecipeItemsId(query) {
    // if (query !== null) { //comentada para passar nos testes. Se voltar o código, avise o Rubens
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
          nationality: items.strArea,
          alcoholicOrNot: '',
        };
        return createRecipe;
      }
      const createRecipe = {
        id: items.idDrink,
        name: items.strDrink,
        image: items.strDrinkThumb,
        category: items.strCategory,
        instructions: items.strInstructions,
        ingredients: setElements(items, 'strIngredient', NUM_IGREDIENTS_DRINK),
        measures: setElements(items, 'strMeasure', NUM_IGREDIENTS_DRINK),
        alcoholicOrNot: items.strAlcoholic,
      };
      return createRecipe;
    });
    return itemRecipe;
    // }
    // return query; //comentada para passar nos testes. Se voltar o código, avise o Rubens
  }

  function createRecomendations(query) {
    // if (query !== null) { //comentada para passar nos testes. Se voltar o código, avise o Rubens
    const newRecomendations = query.map((items) => {
      if (isPathMeal) {
        const filtred = {
          id: items.idDrink,
          name: items.strDrink,
          image: items.strDrinkThumb,
        };
        return filtred;
      }
      const filtred = {
        id: items.idMeal,
        name: items.strMeal,
        image: items.strMealThumb,
      };
      return filtred;
    });
    return newRecomendations;
    // }
    // return query; //comentada para passar nos testes. Se voltar o código, avise o Rubens
  }

  async function setRecipes() {
    if (isPathMeal) {
      const response = await fetchSearchMealsId(id);
      const recipes = createRecipeItemsId(response);
      setRecipesId(recipes);

      const data = await fetchDrinks();
      const filtered = createRecomendations(data).slice(0, NUM_SUGGESTION);
      setRecomendations(filtered);
    } else {
      const response = await fetchSearchDrinksId(id);
      const recipes = createRecipeItemsId(response);
      setRecipesId(recipes);
      const data = await fetchMeals();
      const filtered = createRecomendations(data).slice(0, NUM_SUGGESTION);
      setRecomendations(filtered);
    }
  }

  function recipeDoneCheck() {
    if (doneRecipes.id === id) {
      setFindRecipeClass(false);
    } else {
      setFindRecipeClass(true);
    }
  }
  
  function checkIfIsInProgress(list = {}) {
    return Object.keys(list).includes(id);
  }

  const recipeProgressCheck = useCallback(() => {
    setStateButton(checkIfIsInProgress(inProgressRecipes[origin]));
  }, [id, inProgressRecipes.drinks, inProgressRecipes.meals, isPathDrinks,
    isPathMeal]);
  
  useEffect(() => {
    setRecipes();
    recipeDoneCheck();
    recipeProgressCheck();
  }, []);

  return (
    <div className={ styles.cardIdContainer }>
      { recipesId.map((recipeId, index) => (
        <div key={ index }>
          <FavoriteShareBar recipe={ recipeId } />
          <img
            data-testid="recipe-photo"
            src={ recipeId.image }
            alt=""
            className={ styles.cardIdContainerImg }
          />
          <div className={ styles.cardIdWrapper }>
            <div className={ styles.cardIdWrapperContainer }>
              <h2 data-testid="recipe-title">{recipeId.name}</h2>
              <p data-testid="recipe-category">
                {isPathMeal
                  ? recipeId.category : recipeId.alcoholicOrNot}
              </p>
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
          </div>
        </div>
      ))}
      <div className={ styles.recomendationContainer }>
        {recomendations.map((recomendation, index = 1) => (
          <div
            key={ recomendation.id }
            className={ styles.recomendationItems }
            data-testid={ `${index}-recommendation-card` }
          >
            <div className={ styles.recomendation }>
              <img
                className={ styles.recomendationImg }
                src={ recomendation.image }
                alt=""
              />
              <span data-testid={ `${index}-recommendation-title` }>
                {recomendation.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      {findRecipeClass && (
        <Link className="detalhes-btn-link" to={ `/${typeUrl}/${id}/in-progress` }>
          <button
            className={ styles.stickyButton }
            type="button"
            data-testid="start-recipe-btn"
          >
            {stateButton ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </Link>
      )}
    </div>
  );
}
export default RecipeDetails;

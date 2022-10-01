import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FavoriteShareBar from '../components/FavoriteShareBar';
import useLocalStorage from '../hooks/useLocalStorage';
import { fetchSearchMealsId,
  fetchSearchDrinksId,
} from '../services/FetchAPI';

// import styles from '../styles/CardId.module.css';
const styles = 'styles';

function RecipeInProgress(props) {
  const propItems = props;
  const { path } = propItems.match;
  const { id } = propItems.match.params;
  const isPathMeal = path === '/meals/:id/in-progress';
  const origin = path.split('/')[1];

  const initialState = {
    [origin]: {
      [id]: [],
    },
  };

  const [ingredients,
    setIngredients] = useLocalStorage('inProgressRecipes', initialState);
  const [recipesId, setRecipesId] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const history = useHistory();

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
    }
    return query;
  }

  async function setRecipes() {
    let response;
    if (isPathMeal) {
      response = await fetchSearchMealsId(id);
    } else {
      response = await fetchSearchDrinksId(id);
    }
    const recipes = createRecipeItemsId(response);
    setRecipesId(recipes);
  }

  const setValueToCheckList = () => {
    console.log(ingredients);
    if (ingredients[origin] && Object.keys(ingredients[origin]).includes(id)) {
      setCheckList(ingredients[origin][id]);
    }
  };

  useEffect(() => {
    setRecipes();
    // setCheckList(checkIfExist(ingredients[origin][id]));
    setValueToCheckList();
    console.log('i', ingredients);
  }, []);

  useEffect(() => {
    setIngredients((prevState) => ({
      ...prevState,
      [origin]: { ...prevState[origin], [id]: checkList },
    }));
  }, [checkList]);

  const handleCheckChange = ({ target }) => {
    const { innerText } = target.parentElement;
    if (target.checked) {
      setCheckList((prevList) => [...prevList, innerText]);
    } else {
      setCheckList(checkList.filter((checkValue) => checkValue !== innerText));
    }
  };

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
              <p data-testid="recipe-category">{recipeId.category}</p>
              <ul>
                {recipeId.ingredients.map((ingredient, i) => (ingredient?.length > 0 && (
                  <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                    <label
                      htmlFor={ `checkbox${i}` }
                      data-testid={ `${i}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        name={ `checkbox${i}` }
                        id={ `checkbox${i}` }
                        checked={ checkList?.some((s) => s.includes(ingredient)) }
                        onChange={ (e) => handleCheckChange(e) }
                      />
                      {` ${ingredient} - ${recipeId.measures[i] || ''}`}
                    </label>
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
      <div className={ styles.stickyButton }>
        <button
          data-testid="finish-recipe-btn"
          type="submit"
          disabled={ checkList?.length !== recipesId[0]?.ingredients
            .filter((ingredient) => ingredient?.length > 0).length }
          onClick={ () => { history.push('/done-recipes'); } }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeInProgress;

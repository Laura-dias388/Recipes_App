export const fetchMealsIngredient = async (query) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
    const response = await data.json();
    return response.meals;
  } catch (error) {
    return error;
  }
};

export const fetchMealsName = async (query) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    return response.meals;
  } catch (error) {
    return error;
  }
};

export const fetchMealsFirstLetter = async (query) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`);
    const response = await data.json();
    return response.meals;
  } catch (error) {
    return error;
  }
};

export const fetchDrinksIngredients = async (query) => {
  try {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`);
    const response = await data.json();
    return response.drinks;
  } catch (error) {
    return error;
  }
};

export const fetchDrinksName = async (query) => {
  try {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    return response.drinks;
  } catch (error) {
    return error;
  }
};

export const fetchDrinksFirstLetter = async (query) => {
  try {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`);
    const response = await data.json();
    return response.drinks;
  } catch (error) {
    return error;
  }
};

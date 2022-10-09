export const fetchMealsIngredient = async (query) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
  const response = await data.json();
  return response.meals;
};

export const fetchMealsName = async (query) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response = await data.json();
  return response.meals;
};

export const fetchMealsFirstLetter = async (query) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`);
  const response = await data.json();
  return response.meals;
};

export const fetchDrinksIngredients = async (query) => {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`);
  const response = await data.json();
  return response.drinks;
};

export const fetchDrinksName = async (query) => {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
  const response = await data.json();
  return response.drinks;
};

export const fetchDrinksFirstLetter = async (query) => {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`);
  const response = await data.json();
  return response.drinks;
};

export const fetchMeals = async () => {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = await data.json();
  return response.meals;
};

export const fetchDrinks = async () => {
  const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const response = await data.json();
  return response.drinks;
};

export const fetchCategoryMealsRequest = async (query) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`);
  const response = await data.json();
  return response.meals;
};

export const fetchCategoryDrinksRequest = async (query) => {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${query}`);
  const response = await data.json();
  return response.drinks;
};

export const fetchSearchMealsId = async (query) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${query}`);
  const response = await data.json();
  return response.meals;
};

export const fetchSearchDrinksId = async (query) => {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${query}`);
  const response = await data.json();
  return response.drinks;
};

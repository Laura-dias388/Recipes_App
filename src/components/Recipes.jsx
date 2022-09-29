import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import RecipeContext from '../context/Context';

export default function Recipes() {
  const { pathname } = useLocation();
  const categoryMeals = ['All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
  const categoryDrinks = [
    'All',
    'Ordinary Drink',
    'Cocktail',
    'Shake',
    'Other/Unknown',
    'Cocoa'];
  const categoryList = pathname === '/meals'
    ? categoryMeals : categoryDrinks;

  const { fetchCategoryMealsSearch,
    fetchCategoryDrinksSearch } = useContext(RecipeContext);

  function handleCategorySearch(data) {
    if (pathname === '/meals') {
      fetchCategoryMealsSearch(data);
    } else {
      fetchCategoryDrinksSearch(data);
    }
  }

  return (
    <ToggleGroup.Root
      type="single"
      onValueChange={ (value) => handleCategorySearch(value) }
    >
      {categoryList.map((category) => (
        <ToggleGroup.Item
          data-testid={ `${category}-category-filter` }
          key={ category }
          value={ category }
        >
          {category}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}

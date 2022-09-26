import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Recipes() {
  const location = useLocation();
  const categoryMeals = ['All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
  const categoryDrinks = [
    'All',
    'Ordinary Drink',
    'Cocktail',
    'Shake',
    'Other/Unknown',
    'Cocoa'];
  const categoryList = location.pathname === '/meals'
    ? categoryMeals : categoryDrinks;

  return (
    <div>
      {categoryList.map((category) => (
        <button
          data-testid={ `${category}-category-filter` }
          type="button"
          key={ category }
        >
          { category }
        </button>
      ))}
    </div>
  );
}

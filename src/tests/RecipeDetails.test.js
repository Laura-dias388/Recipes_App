import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';

const DONE_RECIPE = {
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '01/10/2022',
  tags: 'Pasta,Curry',
};
const IN_PROGRESS_RECIPE = {
  drinks: {
    178319: [' Hpnotiq - 2 oz', ' Pineapple Juice - 1 oz', ' Banana Liqueur - 1 oz'],
  },
  meals: {
    52771: ['ALGO'],
  },
};

describe('Testa a página do componente RecipeDetails', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch); // Obrigado Mentoria :)
  });

  test('Render page with drink recipe 178319 and test elements', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(IN_PROGRESS_RECIPE));
    renderWithRouter(<App />, '/drinks/178319');
    expect(await screen.findByTestId('recipe-title')).toHaveTextContent('Aquamarine');
  });

  test('Render page with meal recipe 52771 and test elements', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(DONE_RECIPE));
    localStorage.setItem('inProgressRecipes', JSON.stringify(IN_PROGRESS_RECIPE));
    renderWithRouter(<App />, '/meals/52771');

    expect(await screen.findByTestId('recipe-title')).toHaveTextContent('Spicy Arrabiata Penne');
  });
});

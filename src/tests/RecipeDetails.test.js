import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';

const DONE_RECIPE = {
  id: '52772',
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
    52772: ['ALGO'],
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

    expect(screen.getByTestId('start-recipe-btn')).toHaveTextContent('Continue Recipe');
  });

  test('Render page with meal recipe 52771 and test elements', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(DONE_RECIPE));
    localStorage.setItem('inProgressRecipes', JSON.stringify(IN_PROGRESS_RECIPE));
    renderWithRouter(<App />, '/meals/52771');

    expect(await screen.findByTestId('recipe-category')).toHaveTextContent('Vegetarian');
    expect(await screen.findByTestId('start-recipe-btn')).toHaveTextContent('Start Recipe');
  });

  test('Render page with meal recipe 52977 and test elements', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify({ id: '52977' }));
    // localStorage.setItem('inProgressRecipes', JSON.stringify(IN_PROGRESS_RECIPE));
    renderWithRouter(<App />, '/meals/52977');

    expect(await screen.findByTestId('recipe-title')).toHaveTextContent('Spicy Arrabiata Penne');
    // expect(await screen.findByTestId('start-recipe-btn')).toHaveTextContent('Start Recipe');
  });

  test('share and favorite buttons', async () => {
    window.document.execCommand = jest.fn().mockImplementation(() => 'copied'); // dica de Gabriel Gonçalves - 23A
    renderWithRouter(<App />, '/meals/52771');

    // to add favorite
    userEvent.click(await screen.findByTestId('favorite-btn'));
    // second click to test remove favorite
    userEvent.click(await screen.findByTestId('favorite-btn'));

    userEvent.click(screen.getByTestId('share-btn'));
  });
});

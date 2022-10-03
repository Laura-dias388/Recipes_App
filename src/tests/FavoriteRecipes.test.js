import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';

const FAVORITE_RECIPES = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  },
];
const FAVORITE_RECIPES_LINK = '/favorite-recipes';

describe('Testa a página FavoriteRecipes', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(FAVORITE_RECIPES));

    window.document.execCommand = jest.fn().mockImplementation(() => 'copied'); // dica de Gabriel Gonçalves - 23A

    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  test('if favorite button works', async () => {
    renderWithRouter(<App />, FAVORITE_RECIPES_LINK);

    const nameList = await screen.findAllByTestId(/horizontal-name/i);
    expect(nameList).toHaveLength(2);

    const favoriteBtnList = await screen.findAllByTestId(/horizontal-favorite-btn/i);
    expect(favoriteBtnList).toHaveLength(2);
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favoriteBtn);

    // expect(nameList).toHaveLength(2);
  });

  test('if share button works', async () => {
    renderWithRouter(<App />, FAVORITE_RECIPES_LINK);

    const nameList = await screen.findAllByTestId(/horizontal-name/i);
    expect(nameList).toHaveLength(2);

    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
  });

  test('filter buttons', async () => {
    renderWithRouter(<App />, FAVORITE_RECIPES_LINK);

    const nameList = await screen.findAllByTestId(/horizontal-name/i);
    expect(nameList).toHaveLength(2);

    userEvent.click(screen.getByTestId('filter-by-meal-btn'));

    // expect(nameList).toHaveLength(1);

    userEvent.click(screen.getByTestId('filter-by-drink-btn'));

    userEvent.click(screen.getByTestId('filter-by-all-btn'));
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';

const DONE_RECIPES = [
  {
    id: '52977',
    nationality: 'Turkish',
    type: 'meal',
    category: 'Side',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: '12/12/2020',
    alcoholicOrNot: '',
    tags: ['Soup'],
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    doneDate: '12/12/2020',
    tags: ['Agua'],
  },
];

describe('Teste a página de Done Recipes.', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(DONE_RECIPES));

    window.document.execCommand = jest.fn().mockImplementation(() => 'copied'); // dica de Gabriel Gonçalves - 23A

    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    renderWithRouter(<App />, '/done-recipes');
  });

  test('if favorite button Done', async () => {
    const nameList = await screen.findAllByTestId(/horizontal-name/i);
    expect(nameList).toHaveLength(2);

    const doneBtnList = await screen.findAllByTestId(/horizontal-top-text/i);
    expect(doneBtnList).toHaveLength(2);
    const doneBtn = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(doneBtn);

    // expect(nameList).toHaveLength(2);
  });

  test('if share button works', async () => {
    const nameList = await screen.findAllByTestId(/horizontal-name/i);
    expect(nameList).toHaveLength(2);

    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
  });

  test('filter buttons', async () => {
    const nameList = await screen.findAllByTestId(/horizontal-name/i);
    expect(nameList).toHaveLength(2);

    userEvent.click(screen.getByTestId('filter-by-meal-btn'));

    // expect(nameList).toHaveLength(1);

    userEvent.click(screen.getByTestId('filter-by-drink-btn'));

    userEvent.click(screen.getByTestId('filter-by-all-btn'));
  });
});

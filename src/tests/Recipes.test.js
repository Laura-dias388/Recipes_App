import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste o componente Recipes.', () => {
  test('Teste se existe o botão All.', () => {
    renderWithRouter(<App />, '/meals');

    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('Beef-category-filter'));
  });

  test('filter in drinks page.', () => {
    renderWithRouter(<App />, '/drinks');

    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('Shake-category-filter'));
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste o componente Recipes.', () => {
  test('Teste se existe o botão All.', () => {
    renderWithRouter(<App />, '/meals');

    const categoryButtons = screen.getAllByTestId(/category-filter/i);
    expect(categoryButtons).toHaveLength(6);

    categoryButtons.forEach((button) => {
      userEvent.click(button);
    });
    userEvent.click(screen.getByTestId('All-category-filter'));
  });

  test('filter in drinks page.', () => {
    renderWithRouter(<App />, '/drinks');

    const categoryButtons = screen.getAllByTestId(/category-filter/i);
    expect(categoryButtons).toHaveLength(6);

    categoryButtons.forEach((button) => {
      userEvent.click(button);
    });
    userEvent.click(screen.getByTestId('All-category-filter'));
  });
});

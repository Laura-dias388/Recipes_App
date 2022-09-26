import { screen } from '@testing-library/react';
import React from 'react';
import Meals from '../pages/Meals';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste o componente Recipes.', () => {
  test('Teste se existe o botão All.', () => {
    renderWithRouter(<Meals />);

    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
  });
});

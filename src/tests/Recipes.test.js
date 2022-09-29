import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste o componente Recipes.', () => {
  test('Teste se existe o botão All.', () => {
    renderWithRouter(<App />, '/meals');

    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
  });
});

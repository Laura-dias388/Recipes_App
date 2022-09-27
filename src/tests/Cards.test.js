import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Cards from '../components/Cards';

describe('Testes para a tela de Cards.', () => {
  test('Se', () => {
    renderWithRouter(<Cards />, '/meals');

    expect(screen.queryByTestId('0-recipe-card')).toBeInTheDocument();
  });

  test('Se', () => {
    renderWithRouter(<Cards />, '/drinks');

    expect(screen.queryByTestId('0-recipe-card')).toBeInTheDocument();
  });
});

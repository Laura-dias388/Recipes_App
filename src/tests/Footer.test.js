import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';

describe('Testes para a tela de Login', () => {
  test('Se o Footer possui os botôes corretos', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    renderWithRouter(<Meals />, '/meals');

    const mealsBtn = screen.queryByTestId('meals-bottom-btn');
    expect(mealsBtn).toBeInTheDocument();
    userEvent.click(mealsBtn);

    const drinksBtn = screen.queryByTestId('drinks-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
    userEvent.click(drinksBtn);
  });
});

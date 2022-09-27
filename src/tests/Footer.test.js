import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Testes para o componente Footer', () => {
  test('Se no Footer a clicar em Drinks vai para a página', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    renderWithRouter(<Footer />, '/meals');

    const drinksBtn = screen.queryByTestId('drinks-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
    userEvent.click(drinksBtn);
  });

  test('Se no Footer ao clicar em Meals vai para a página', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    renderWithRouter(<Footer />, '/drinks');

    const mealsBtn = screen.queryByTestId('meals-bottom-btn');
    expect(mealsBtn).toBeInTheDocument();
    userEvent.click(mealsBtn);
  });
});

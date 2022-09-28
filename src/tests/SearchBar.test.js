import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testes para o componente SerachBar', () => {
  beforeEach(() => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    // jest.spyOn(global, 'fetch');

    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(meals),
    // }));
    // global.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(meals),
    // });
    // global.fetch = jest
    //   .fn(() => fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId('email-input'), 'teste@email.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));

    userEvent.click(screen.getByTestId('search-top-btn'));
  });

  test('Testando no SearchBar os filtros em /meals', () => {
    const input = screen.queryByTestId('search-input');
    const radio = screen.queryByTestId('ingredient-search-radio');
    const btn = screen.queryByTestId('exec-search-btn');
    expect(input).toBeInTheDocument();

    userEvent.type(input, 'bacon');
    userEvent.click(radio);
    userEvent.click(btn);

    userEvent.type(input, 'Corba');
    userEvent.click(screen.queryByTestId('name-search-radio'));
    userEvent.click(btn);

    userEvent.click(screen.queryByTestId('first-letter-search-radio'));
    userEvent.click(btn);
  });

  test('Testando no SearchBar o filtro por ingredientes', () => {
    userEvent.click(screen.queryByTestId('drinks-bottom-btn'));

    userEvent.click(screen.getByTestId('search-top-btn'));

    const input = screen.queryByTestId('search-input');
    const btn = screen.queryByTestId('exec-search-btn');
    expect(input).toBeInTheDocument();

    userEvent.type(input, 'water');
    userEvent.click(screen.queryByTestId('ingredient-search-radio'));
    userEvent.click(btn);

    userEvent.type(input, 'GG');
    userEvent.click(screen.queryByTestId('name-search-radio'));
    userEvent.click(btn);

    userEvent.click(screen.queryByTestId('first-letter-search-radio'));
    userEvent.click(btn);
  });
});

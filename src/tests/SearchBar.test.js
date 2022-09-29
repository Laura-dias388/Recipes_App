import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

import meals from '../../cypress/mocks/meals';
import result from '../../cypress/mocks/beefMeals';
import drinks from '../../cypress/mocks/drinks';
import resultDrinks from '../../cypress/mocks/cocktailDrinks';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const CARD_NAME = '0-card-name';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const RECIPE_CARD = '0-recipe-card';

describe('Testes para o componente SerachBar', () => {
  /* beforeEach(() => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    jest.spyOn(global, 'fetch');

    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(meals),
    // }));
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(result)
        .mockResolvedValueOnce(meals),
    });
    // global.fetch = jest
    //   .fn(() => fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId('email-input'), 'teste@email.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));

    userEvent.click(screen.getByTestId('search-top-btn'));
  });
 */
  test('Testando no SearchBar os filtros ingredientes em /meals', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(result)
        .mockResolvedValueOnce(meals),
    });
    renderWithRouter(<App />, '/meals');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());// teste do componentes cards;
    expect(screen.queryByTestId('0-recipe-card')).toBeInTheDocument();

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    const input = screen.queryByTestId(SEARCH_INPUT);
    const radio = screen.queryByTestId(INGREDIENT_SEARCH_RADIO);
    const btn = screen.queryByTestId(EXEC_SEARCH_BTN);
    expect(input).toBeInTheDocument();

    userEvent.type(input, 'bacon');
    userEvent.click(radio);
    userEvent.click(btn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getByTestId(CARD_NAME)).toHaveTextContent('Beef and Mustard Pie');

    /* userEvent.type(input, 'Corba');
    userEvent.click(screen.queryByTestId('name-search-radio'));
    userEvent.click(btn);

    userEvent.click(screen.queryByTestId('first-letter-search-radio'));
    userEvent.click(btn); */
  });

  test('Testando no SearchBar o filtro name na página drinks.', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(resultDrinks)
        .mockResolvedValueOnce(drinks),
    });
    renderWithRouter(<App />, '/drinks');

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));

    const input = screen.queryByTestId(SEARCH_INPUT);
    const btn = screen.queryByTestId(EXEC_SEARCH_BTN);

    expect(input).toBeInTheDocument();

    const radio = 'name-search-radio';

    userEvent.type(input, 'water');
    userEvent.click(screen.queryByTestId(radio));
    userEvent.click(btn);
    userEvent.type(input, 'GG');
    userEvent.click(screen.queryByTestId(radio));

    expect(screen.queryByTestId(radio)).toBeChecked();

    userEvent.click(btn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getByTestId(CARD_NAME)).toHaveTextContent('\'57 Chevy with a White License Plate');
  });

  test('Testando no SearchBar busca pela primeira letra.', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(resultDrinks)
        .mockResolvedValueOnce(drinks),
    });

    jest.spyOn(global, 'alert');
    global.alert.mockResolvedValue('alerta');

    renderWithRouter(<App />, '/drinks');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.queryByTestId(RECIPE_CARD)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));

    const input = screen.queryByTestId(SEARCH_INPUT);
    const btn = screen.queryByTestId(EXEC_SEARCH_BTN);

    expect(input).toBeInTheDocument();

    const radio = 'first-letter-search-radio';

    userEvent.type(input, 'w');
    userEvent.click(screen.queryByTestId(radio));
    userEvent.click(btn);

    expect(screen.queryByTestId(radio)).toBeChecked();

    userEvent.click(btn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getByTestId(CARD_NAME)).toHaveTextContent('\'57 Chevy with a White License Plate');

    userEvent.type(input, 'wa');
    userEvent.click(screen.queryByTestId(radio));
    userEvent.click(btn);

    expect(screen.queryByTestId(radio)).toBeChecked();
    userEvent.click(btn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });
});

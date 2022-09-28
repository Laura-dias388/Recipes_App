import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testes para a tela de Login', () => {
  const PAGE_TITLE = 'page-title';
  const SEARCH_TOP_BTN = 'search-top-btn';

  test('Se o Header apresenta o título corretamente em Meals', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    renderWithRouter(<App />, '/meals');

    expect(screen.queryByTestId(PAGE_TITLE)).toHaveTextContent('Meals');
  });

  test('Se o Header apresenta o título corretamente em Drinks', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    renderWithRouter(<App />, '/drinks');

    expect(screen.queryByTestId(PAGE_TITLE)).toHaveTextContent('Drinks');
  });

  test('Se o Header apresenta o título corretamente em Profile', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    renderWithRouter(<App />, '/profile');

    expect(screen.queryByTestId(PAGE_TITLE)).toHaveTextContent('Profile');
    expect(screen.queryByTestId(SEARCH_TOP_BTN)).not.toBeInTheDocument();
  });

  test('Se o Header apresenta o título corretamente em Done Recipes', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    renderWithRouter(<App />, '/done-recipes');

    expect(screen.queryByTestId(PAGE_TITLE)).toHaveTextContent('Done Recipes');
    expect(screen.queryByTestId(SEARCH_TOP_BTN)).not.toBeInTheDocument();
  });

  test('Se o Header apresenta o título corretamente em Favorite Recipes', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    renderWithRouter(<App />, '/favorite-recipes');

    expect(screen.queryByTestId(PAGE_TITLE)).toHaveTextContent('Favorite Recipes');
    expect(screen.queryByTestId(SEARCH_TOP_BTN)).not.toBeInTheDocument();
  });

  test('Se direciona para Profile ao clicar no botão', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    const { history } = renderWithRouter(<App />, '/meals');

    userEvent.click(screen.queryByTestId('profile-top-btn'));
    expect(history.location.pathname).toEqual('/profile');
  });

  test('Se ao clicar no botão a barra de pesquisa aparece', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    renderWithRouter(<App />, '/meals');

    userEvent.click(screen.queryByTestId(SEARCH_TOP_BTN));
    const searchButton = screen.queryByTestId('search-input');
    expect(searchButton).toBeInTheDocument();

    userEvent.click(screen.queryByTestId(SEARCH_TOP_BTN));
    expect(searchButton).not.toBeInTheDocument();
  });
});

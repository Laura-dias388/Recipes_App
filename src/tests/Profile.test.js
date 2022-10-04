import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';

const PROFILE_LINK = '/profile';

describe('Testa a página Profile', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  test('redirect to done-recipes', () => {
    renderWithRouter(<App />, PROFILE_LINK);

    userEvent.click(screen.getByTestId('profile-done-btn'));
  });

  test('redirect to favorite-recipes', () => {
    renderWithRouter(<App />, PROFILE_LINK);

    userEvent.click(screen.getByTestId('profile-favorite-btn'));
  });

  test('redirect to favorite-recipes', () => {
    const expectedUser = { email: 'teste@meu.com' };
    localStorage.setItem('user', JSON.stringify({ email: 'teste@meu.com' }));
    const currentUserBefore = JSON.parse(localStorage.getItem('user'));

    renderWithRouter(<App />, PROFILE_LINK);

    expect(currentUserBefore).toEqual(expectedUser);

    userEvent.click(screen.getByTestId('profile-logout-btn'));
    const currentUserAfter = JSON.parse(localStorage.getItem('user'));

    expect(currentUserAfter).not.toEqual(expectedUser);
  });
});

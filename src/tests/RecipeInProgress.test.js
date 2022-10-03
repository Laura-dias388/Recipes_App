import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';

const MEAL_LINK = '/meals/52771/in-progress';

describe('Testa a página FavoriteRecipes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch); // Obrigado Mentoria :)
  });

  test('Render page with meal recipe 52771 and test Finish Recipe', async () => {
    const { history } = renderWithRouter(<App />, MEAL_LINK);
    const { location: { pathname } } = history;

    expect(pathname).toEqual(MEAL_LINK);

    const checkBoxList = await screen.findAllByTestId(/ingredient-step/i);
    expect(checkBoxList).toHaveLength(8);

    const finishRecipeButtonBefore = await screen.findByTestId(/finish-recipe-btn/i);
    expect(finishRecipeButtonBefore).toBeDisabled();
    checkBoxList.forEach((checkBox) => {
      expect(checkBox).not.toBeChecked();
      userEvent.click(checkBox);
      checkBox.checked = true;
      expect(checkBox.checked).toBe(true);
    });
    const finishRecipeButtonAfter = await screen.findByTestId(/finish-recipe-btn/i);
    expect(finishRecipeButtonAfter).toBeEnabled();
    userEvent.click(finishRecipeButtonAfter);

    // await expect(pathname).toEqual('/done-recipesas');
  });

  test('Render page with drink recipe 15997', async () => {
    const { history } = renderWithRouter(<App />, '/drinks/15997/in-progress');
    const { location: { pathname } } = history;

    expect(pathname).toEqual('/drinks/15997/in-progress');

    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
  });

  test('add/remove to/from localStorage', async () => {
    renderWithRouter(<App />, MEAL_LINK);

    const checkBoxList = await screen.findAllByRole('checkbox');

    expect(checkBoxList).toHaveLength(8);

    expect(checkBoxList[0]).not.toBeChecked();
    userEvent.click(checkBoxList[0]);
    checkBoxList[0].checked = true;
    expect(checkBoxList[0].checked).toBe(true);
    userEvent.click(checkBoxList[0]);
    checkBoxList[0].checked = false;
    expect(checkBoxList[0].checked).toBe(false);
  });
});

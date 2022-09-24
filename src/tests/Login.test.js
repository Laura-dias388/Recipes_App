import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes para a tela de Login', () => {
  test('Possui os input de entrada', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    renderWithRouter(<App />);

    expect(screen.queryByTestId('email-input')).toBeInTheDocument();
    expect(screen.queryByTestId('password-input')).toBeInTheDocument();
  });

  test('valida corretamente as entradas', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    renderWithRouter(<App />);

    const email = screen.queryByTestId('email-input');
    const password = screen.queryByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'valid@email.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);
  });
});

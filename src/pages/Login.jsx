import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEnterDisabled, setIsEnterDisabled] = useState(true);
  const [user, setUser] = useLocalStorage('user', {});
  const history = useHistory();

  const validateEmail = (emailToValidate) => /\S+@\S+\.\S+/.test(emailToValidate);
  useLocalStorage('mealsToken', 1);
  useLocalStorage('drinksToken', 1);

  useEffect(() => {
    const MIN_PASSWORD_LENGTH = 6;

    const isTrue = [
      password.length > MIN_PASSWORD_LENGTH,
      validateEmail(email),
    ].every(Boolean);

    setIsEnterDisabled(!isTrue);
    setUser({ email });
  }, [email, password]);

  const handlerButton = () => {
    // setUser({ email });
    // setMealsToken(1);
    // setDrinksToken(1);
    // localStorage.setItem('user', JSON.stringify({ email }));
    // localStorage.setItem('mealsToken', 1);
    // localStorage.setItem('drinksToken', 1);
    console.log(user);

    history.push('/meals');
  };

  return (
    <div>
      <div>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          placeholder="Digite seu email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </div>
      <div>
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </div>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ isEnterDisabled }
        onClick={ handlerButton }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;

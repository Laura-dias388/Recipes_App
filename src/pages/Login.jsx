import { ArrowRight } from 'phosphor-react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import useLocalStorage from '../hooks/useLocalStorage';
import style from '../styles/Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  console.log(email);
  const [password, setPassword] = useState('');
  const [isEnterDisabled, setIsEnterDisabled] = useState(true);
  // const [user, setUser] = useLocalStorage('user', {});
  // console.log(user);
  const history = useHistory();

  const validateEmail = (emailToValidate) => /\S+@\S+\.\S+/.test(emailToValidate);
  // useLocalStorage('mealsToken', 1);
  // useLocalStorage('drinksToken', 1);

  useEffect(() => {
    const MIN_PASSWORD_LENGTH = 6;

    const isTrue = [
      password.length > MIN_PASSWORD_LENGTH,
      validateEmail(email),
    ].every(Boolean);

    setIsEnterDisabled(!isTrue);
    // setUser({ email });
  }, [email, password]);

  const handlerButton = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
    history.push('/meals');
  };

  return (
    <div className={ style.loginContainer }>
      <h2>Hello,</h2>
      <span>Welcome back!</span>
      <form>
        <label htmlFor="email">
          Email

          <input
            data-testid="email-input"
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ isEnterDisabled }
          onClick={ handlerButton }
        >
          Sign In
          {' '}
          <ArrowRight size={ 16 } />
        </button>
      </form>
    </div>
  );
}

export default Login;

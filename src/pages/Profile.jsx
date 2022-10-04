import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useLocalStorage from '../hooks/useLocalStorage';

function Profile() {
  const [user] = useLocalStorage('user', {});
  const history = useHistory();

  return (
    <div>
      <Header />
      <div>
        <p data-testid="profile-email">{user.email}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => { history.push('/done-recipes'); } }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => { history.push('/favorite-recipes'); } }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
export default Profile;

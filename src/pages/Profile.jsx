import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useLocalStorage from '../hooks/useLocalStorage';

function Profile() {
  // const [email, setEmail] = useState([]);

  const [user] = useLocalStorage('user', {});

  return (
    <div>
      <Header />
      <div>
        <p data-testid="profile-email">{user.email}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
export default Profile;

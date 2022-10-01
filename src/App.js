import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Provider from './context/Provider';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import './global.css';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals/" component={ Meals } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route
          path="/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          path="/meals/:id/in-progress"
          component={ RecipeInProgress }
        />

        {/* <Route exact path="/meals/:id/in-progres" component={ MealInProgress } />
      <Route exact path="/drinks/:id/in-progres" component={ DrinkInProgress } /> */}
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;

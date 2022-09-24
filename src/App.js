import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* <Route exact path="/profile" component={ Profile } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } /> */}
    </Switch>
  );
}

export default App;

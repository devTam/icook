import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Recipe from './components/recipe/Recipe';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='/recipe/:id' component={Recipe} />
        <Route path='/' component={App} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


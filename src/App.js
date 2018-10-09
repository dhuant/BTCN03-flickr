import React, { Component } from 'react';
import './App.css';
import Menu from '../src/Component/Menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
class App extends Component {
  render() {
    let elmRoute = routes.map((route,index) => {
      return <Route
      key = {index}
      path = {route.path}
      exact = {route.exact}
      component = {route.main}
      />
    });
    return (
      <Router>
        <div>
          <Menu />
          <Switch>
            {elmRoute}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
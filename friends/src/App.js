import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import './App.css';

function App() {
  return (
    <div>
      <Route exact path='/' render={props => <Redirect to='/login' />} />
      <Route path='/login' render={props => <Login {...props} />} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
    </div>
  );
}

export default App;

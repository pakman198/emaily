import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from "react-redux";

import * as actions from '../actions';

import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchUser());
  }, [dispatch])


  return (
    <div className="container">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/surveys/new" component={SurveyNew} />
          <Route path="/surveys" component={Dashboard} />
          <Route path="/" exact component={Landing} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

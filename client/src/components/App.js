import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from "react-redux";

import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';

const SurveyNew = () => <h2>SurveyNew</h2>;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchUser());
  }, [dispatch])


  return (
    <div className="container">
      <BrowserRouter>
        <>
          <Header />
          <Switch>
            <Route path="/surveys/new" component={SurveyNew} />
            <Route path="/surveys" component={Dashboard} />
            <Route path="/" exact component={Landing} />
          </Switch>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;

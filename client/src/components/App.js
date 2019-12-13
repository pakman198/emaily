import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

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
            <Route path="/" exact component={ !auth ? Landing : Dashboard } />
          </Switch>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;

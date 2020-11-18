import React from 'react';
import {HashRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from './GlobalNavigation';
import Home from 'components/pages/Home';
import About from 'components/pages/About';
import Profile from 'components/pages/Profile';
import AddRoad from "components/pages/AddRoad";
import Register from "components/pages/SignUp";
import SignIn from "components/pages/SignIn";
import {
  RecoilRoot
} from 'recoil';

const AppRouter = ({ isLoggedIn }) => {
    return (<RecoilRoot>
          <Router>
            <Navigation isLoggedIn={isLoggedIn}/>
            <Switch>
              <Route exact path="/">
                <Home isLoggedIn={isLoggedIn}/>
              </Route>
              <Route path="/about-luminouss">
                <About />
              </Route>
              <Route path="/my-profile">
                <Profile />
              </Route>
              <Route path="/sign-in">
                <SignIn />
              </Route>
              <Route path="/sign-up">
                <Register />
              </Route>
              <Route path="/add-road-info">
                <AddRoad />
              </Route>
            </Switch>
          </Router>
        </RecoilRoot>
      )
  };
  export default AppRouter;
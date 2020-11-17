import React from 'react';
import {HashRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from './GlobalNavigation';
import Home from 'components/Main/Home';
import About from 'components/About/About';
import Profile from 'components/Profile/Profile';
import AddRoad from "components/AddRoad/AddRoad";
import Register from "components/Auth/SignUp";
import SignIn from "components/Auth/SignIn";
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
import React from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import Navigation from './GlobalNavigation';
import Home from '../components/Main/Home';
import About from '../components/About';
import Profile from '../components/Profile';
import AddRoad from "../components/AddRoad";
import Auth from "../components/Auth";

const AppRouter = ({ isLoggedIn }) => {
    return (<>
          <Router>
            <Navigation isLoggedIn={isLoggedIn}/>
            <Route exact path="/">
              <Home isLoggedIn={isLoggedIn}/>
            </Route>
            <Route exact path="/about-luminouss">
              <About />
            </Route>
            <Route exact path="/my-profile">
              <Auth />
            </Route>
            <Route exact path="/add-road-info">
              <AddRoad />
            </Route>
          </Router>
        </>
      )
  };
  export default AppRouter;
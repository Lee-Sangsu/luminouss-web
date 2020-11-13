import React from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import Navigation from './GlobalNavigation';
import Home from '../components/Main/Home';
import About from '../components/About';
import Profile from '../components/Profile';
import AddRoad from "../components/AddRoad"

const AppRouter = () => {
    return (<>
          <Router>
            <Navigation />
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about-luminouss">
              <About />
            </Route>
            <Route exact path="/my-profile">
              <Profile />
            </Route>
            <Route exact path="/add-road-info">
              <AddRoad />
            </Route>
          </Router>
        </>
      )
  };
  export default AppRouter;
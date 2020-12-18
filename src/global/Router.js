import React from 'react';
import {BrowserRouter,  Route, Switch } from "react-router-dom";
import Navigation from './GlobalNavigation';
import Home from 'components/pages/Home';
import About from 'components/pages/About';
import Profile from 'components/pages/Profile';
import AddRoad from "components/pages/AddRoad";
import Register from "components/pages/SignUp";
import SignIn from "components/pages/SignIn";
import AboutTeam from 'components/organisms/AboutTeam';
import AboutSolution from 'components/organisms/AboutSolution';
import WatchRoads from 'components/pages/WatchRoads';
import WatchRoad from 'components/pages/WatchRoad';
import EditRoad from 'components/pages/EditRoad';

import {
  RecoilRoot
} from 'recoil';

const AppRouter = ({ isLoggedIn }) => {
    return (<RecoilRoot>
          <BrowserRouter >
            <Navigation isLoggedIn={isLoggedIn}/>
            <Switch>
              <Route exact path="/">
                <Home isLoggedIn={isLoggedIn}/>
              </Route>
              <Route path="/about-luminouss">
                <About />
              </Route>
              <Route path='/about-luminouss-team'>
                <AboutTeam />
              </Route>
              <Route path='/about-luminouss-solution'>
                <AboutSolution />
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
              <Route exact path="/watch-roads">
                <WatchRoads />
              </Route>
              <Route path="/road/:item?">
                <WatchRoad />
              </Route>
              <Route path="/road-edit/:item?">
                <EditRoad />
              </Route>
            </Switch>
          </BrowserRouter>
        </RecoilRoot>
      )
  };
  export default AppRouter;
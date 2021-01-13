import React from 'react';
import {HashRouter,  Route, Switch } from "react-router-dom";
// import Navigation from './GlobalNavigation';
// import Home from 'components/pages/Home';
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
import NoMatchedRouteComponent from 'global/NoMatchedRouteComponent';
import DownloadGuideBook from 'components/pages/DownloadGuideBook';
import {
  RecoilRoot
} from 'recoil';
import NewHome from 'components/pages/NewHome';
import Form from 'components/pages/Form';

const AppRouter = () => {
    return (<RecoilRoot>
          <HashRouter >
            {/* <Navigation isLoggedIn={isLoggedIn}/> */}
            <Switch>
              <Route exact path="/">
                <NewHome />
              </Route>
              <Route exact path="/about-luminouss">
                <About />
              </Route>
              <Route exact path='/about-luminouss-team'>
                <AboutTeam />
              </Route>
              <Route exact path='/about-luminouss-solution'>
                <AboutSolution />
              </Route>
              <Route exact path="/my-profile">
                <Profile />
              </Route>
              <Route exact path="/sign-in">
                <SignIn />
              </Route>
              <Route exact path="/sign-up">
                <Register />
              </Route>
              <Route exact path="/add-road-info">
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
              <Route path="/download-our-guide">
                <DownloadGuideBook />
              </Route>
              <Route path="/forms">
                <Form />
              </Route>
              
              {/* 404 */}
              <Route component={NoMatchedRouteComponent}/> 
            </Switch>
          </HashRouter>
        </RecoilRoot>
      )
  };
  export default AppRouter;
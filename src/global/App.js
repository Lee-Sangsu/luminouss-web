import React, { useEffect } from 'react';
import AppRouter from './Router';
import firebase from './fbase';
import {useRecoilState} from 'recoil';
import InitializeState from 'recoilStates/InitializeState';
import IsLoggedInState from 'recoilStates/IsLoggedInState';

function App() {
  const [init, setInit] = useRecoilState(InitializeState);
  const [isLoggedIn, setLoggedIn] = useRecoilState(IsLoggedInState);

  useEffect((() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    });
  }), [setLoggedIn, setInit]);

  return (<>
      {init ? (<>
      <AppRouter isLoggedIn={isLoggedIn} /> 
      </>
      ) : <img src={require('images/titles/luminous.png').default} id='luminouss-img' alt='루미너스' />}
      </>

  );
};

export default App;

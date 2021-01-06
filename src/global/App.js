import React, { useEffect } from 'react';
import AppRouter from './Router';
import firebase from './fbase';
import {useRecoilState} from 'recoil';
import InitializeState from 'recoilStates/InitializeState';


function App() {
  const [init, setInit] = useRecoilState(InitializeState);


  useEffect((() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // setLoggedIn(true);
        setInit(true);
        console.log('isLoggedIn');
      } else {
        // setLoggedIn(false);
        setInit(true);
      }
    });
  }), [setInit]);

  return (<>
      {init ? (<>
      <AppRouter /> 
      </>
      ) : <span>Luminouss</span>}
      </>

  );
};

export default App;

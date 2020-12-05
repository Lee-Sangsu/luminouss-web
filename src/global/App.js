import React, { useEffect } from 'react';
import AppRouter from './Router';
import 'components/styles/Footer.css'
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
      <footer>
       <div id="footer">
          <div className="footer-wrap">
              <img className="footer-logo" src={require("images/심볼로고.png").default} alt="로고"></img>
              <div className="footer-body">
                  <div className="info-wrap">
                      <div className="info-key">
                          <h4>주소</h4>
                          <h4>대표</h4>
                          <h4>전화</h4>
                          <h4>이메일</h4>
                      </div>
                      <div className="info-value">
                          <h4>서울시 종로구 이화동 대학로 116</h4>
                          <h4>이소현</h4>
                          <h4>010-5874-5988</h4>
                          <h4>sohyeon10051@gmail.com</h4>
                      </div>
                  </div>
                  <div className="rights">
                      <h4>CopyrightⒸ Luminouss. All Rights Reserved.</h4>
                  </div>
              </div>
          </div>
        </div>
      </footer>
      </>
      ) : <img src={require('images/titles/luminous.png').default} id='luminouss-img' alt='루미너스' />}
      </>

  );
};

export default App;

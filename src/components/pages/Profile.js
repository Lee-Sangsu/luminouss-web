import React from 'react';
import firebase from 'global/fbase';
import {useHistory} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import InitializeState from 'recoilStates/InitializeState';
import GlobalNav from 'global/GlobalNav';
import Subject from 'components/molecules/Subject';
import Footer from 'components/molecules/ForHome/Footer';


const Profile =  () => {
  const [arr, setArr] = React.useState([]);
  const history = useHistory();

  const setInit = useSetRecoilState(InitializeState);


  const user = firebase.auth().currentUser;
  const onLogOutClick = () => {
    if (window.localStorage.getItem('user') === 'EmailUser') {
      firebase.auth().signOut();
      history.push("/");

      setInit(true);
      window.localStorage.removeItem('user');
    } else {
      console.log(window.Kakao.Auth.getAccessToken());
      window.Kakao.Auth.logout(function() {
        console.log(window.Kakao.Auth.getAccessToken());
      });      
      setInit(true);
      window.localStorage.removeItem('user');

      history.push("/");
    }
  };

  const getRoadInfoCurrentUser = React.useCallback(async () => {
    try {
      const road = await firebase.firestore().collection('WalkRoad').where('user_uid', '==', `${user.uid}`).get()

      road.forEach(doc => {
        console.log(doc.data())
        const arrObj = {
          ...doc.data(),
          id: doc.id,
        };
        setArr((prev) => [arrObj, ...prev]);
      })
      
    } catch (e) {
      console.log(e);
    }
  }, [user]) ;

  const getRoadInfoKakaoCurrentUser = React.useCallback(async () => {
    try {
      const road = await firebase.firestore().collection('WalkRoad').where('user_uid', '==', Number(JSON.parse(window.localStorage.getItem('user')).id)).get()

      road.forEach(doc => {
        const arrObj = {
          ...doc.data(),
          id: doc.id,
        };
        setArr((prev) => [arrObj, ...prev]);
      })
    
    } catch (e) {
      console.log(e);
    }
  }, []) ;

  React.useEffect(() => {
    if (window.localStorage.getItem('user') === 'EmailUser') {
      getRoadInfoCurrentUser();
    } else {
      getRoadInfoKakaoCurrentUser();
    }
  }, [getRoadInfoCurrentUser, getRoadInfoKakaoCurrentUser])

  return (
    <div style={{width:'100%', height:'100%', top:0, left:0}}>
      <GlobalNav isFirstPage={false} isNotHome={true} />

      {window.localStorage.getItem('user') === 'EmailUser' ? 
      <Subject id="profile-h2" circleColor="rgba(41, 117, 61, 1)" circleId="sign-up-circle" text={`${user.email}님의 프로필`} />
      :
      <Subject id="profile-h2" circleColor="rgba(41, 117, 61, 1)" circleId="sign-up-circle" text={`${JSON.parse(window.localStorage.getItem('user')).nickname}님의 프로필`} />
      }

      {window.innerWidth > 500 ? <div id="profile-hr-container">
        <div id="profile-hr" ></div>
      </div> : <></>}


      {window.innerWidth > 500 ? <Subject id="profile-h2" circleColor="rgba(41, 117, 61, 1)" circleId="sign-up-circle" text={`등록 건수`} /> : <h2 id="profile-h2" style={{paddingLeft:'18%', width:'76%'}}>등록 건수</h2>}

      {arr ? 
      <h1 id="profile-h1">{arr.length}</h1>
      :
      <h1 id="profile-h1">0</h1>
      }

      <div id="profile-hr-container" >
        <div id='profile-hr'></div>
      </div>

      {window.innerWidth > 500 ? <Subject id="profile-h2" circleColor="rgba(41, 117, 61, 1)" circleId="sign-up-circle" text={`리워드`} /> : <h2 id="profile-h2" style={{paddingLeft:'18%', width:'76%'}}>리워드</h2>}

      {arr ? 
      <h1 id="profile-h1">{arr.length * 200}p</h1>
      :
      <h1 id="profile-h1">0p</h1>
      }


      <div id="profile-hr-container" >
        <button id='logout' onClick={onLogOutClick}>Log Out</button>

      </div>
      <Footer />
    </div>
  );
};


export default Profile;
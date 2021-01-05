import React from 'react';
import firebase from 'global/fbase';
import {useHistory} from 'react-router-dom';
import Kakao from 'kakaojs';
import {useSetRecoilState} from 'recoil';
import InitializeState from 'recoilStates/InitializeState';
import IsLoggedInState from 'recoilStates/IsLoggedInState';
import GlobalNav from 'global/GlobalNav';


//updateProfile({displayName 추가 만들기})


const Profile =  () => {
  // const [arr, setArr] = useState([]);
  const history = useHistory();

  const setInit = useSetRecoilState(InitializeState);
  const setLoggedIn = useSetRecoilState(IsLoggedInState);

  const user = firebase.auth().currentUser;
  const onLogOutClick = () => {
    if (user) {
      firebase.auth().signOut();
      history.push("/");
      setLoggedIn(false);
    } else {
      console.log(Kakao.Auth.getAccessToken());
      Kakao.Auth.logout(function() {
        console.log(Kakao.Auth.getAccessToken());
      });      
      setInit(true);
      setLoggedIn(false);
      history.push("/");
    }
  };

  //currentUser updateProfile({displayName : input(state로)}) 이름 없을 때에는 null {userName ? <프로필> : <empty>}


  
  /*
  import {useCallback, useEffect, useState}
  const getRoadInfoCurrentUser = useCallback(async () => {
    try {
      const road = await firebase.firestore().collection('WalkRoad').where('user', '==', `${user.uid}`).get()

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
  }, [user.uid]) ;

  useEffect(() => {
    if (user) {
      getRoadInfoCurrentUser();
    }
  }, [getRoadInfoCurrentUser, user])*/

  return (
    <div style={{width:'100%', height:'100%', top:0}}>
      <GlobalNav isFirstPage={false} isNotHome={true} />
      <h2 style={{width:'100%', height:`${window.innerHeight-90}px`, display:'flex', justifyContent:'center', alignItems:'center', marginBlockStart:0}}>Profile</h2> 
      {/* {arr ? arr.map((data) => <div key={data.id} style={{
          marginTop:"20px",
          marginBottom:"30px"
      }}>
          <h4>{data.roadName}</h4>
      </div> ):<h5>산책로 정보 불러오는 중..</h5>} */}
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
};


export default Profile;
import React from 'react';
import firebase from 'global/fbase';
import {useHistory} from 'react-router-dom';
import Kakao from 'kakaojs';
import {useRecoilState} from 'recoil';
import InitializeState from 'recoilStates/InitializeState';
import GlobalNav from 'global/GlobalNav';
import Subject from 'components/molecules/Subject';


//updateProfile({displayName 추가 만들기})


const Profile =  () => {
  const [arr, setArr] = React.useState([]);
  const history = useHistory();
  // React.useEffect(() => {
  //   window.localStorage.getItem('user');
  // }, [])

  const [init, setInit] = useRecoilState(InitializeState);


  const user = firebase.auth().currentUser;
  const onLogOutClick = () => {
    if (window.localStorage.getItem('user') === 'EmailUser') {
      firebase.auth().signOut();
      history.push("/");

      setInit(true);
      window.localStorage.removeItem('user');
    } else {
      console.log(Kakao.Auth.getAccessToken());
      Kakao.Auth.logout(function() {
        console.log(Kakao.Auth.getAccessToken());
      });      
      setInit(true);
      window.localStorage.removeItem('user');

      history.push("/");
    }
  };

  //currentUser updateProfile({displayName : input(state로)}) 이름 없을 때에는 null {userName ? <프로필> : <empty>}


  

  const getRoadInfoCurrentUser = React.useCallback(async () => {
    try {
      const road = await firebase.firestore().collection('WalkRoad').where('user_uid', '==', `${user.uid}`).get()

      road.forEach(doc => {
        // console.log(doc.data())
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
      const road = await firebase.firestore().collection('WalkRoad').where('user_uid', '==', `${JSON.parse(window.localStorage.getItem('user')).id}`).get()

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
    <div style={{width:'100%', height:'100%', top:0}}>
      <GlobalNav isFirstPage={false} isNotHome={true} />
      {/* <h2 style={{width:'100%', height:`${window.innerHeight-90}px`, display:'flex', justifyContent:'center', alignItems:'center', marginBlockStart:0}}>Profile</h2>  */}
      {/* {arr ? arr.map((data) => <div key={data.id} style={{
          marginTop:"20px",
          marginBottom:"30px"
      }}>
      <h4>{data.roadName}</h4>
    </div> ):<h5>산책로 정보 불러오는 중..</h5>} */}
      {window.localStorage.getItem('user') === 'EmailUser' ? 
      <Subject id="profile-h2" circleColor="rgba(41, 117, 61, 1)" circleId="sign-up-circle" text={`${user.email}님의 프로필`} />
      :
      <Subject id="profile-h2" circleColor="rgba(41, 117, 61, 1)" circleId="sign-up-circle" text={`${JSON.parse(window.localStorage.getItem('user')).nickname}님의 프로필`} />
      }

      <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} >
        <div style={{width:'120px', height:'8px', marginTop:'20px', backgroundColor:'#232323' }} ></div>

      </div>


      <Subject id="profile-h2" circleColor="rgba(41, 117, 61, 1)" circleId="sign-up-circle" text={`등록 건수`} />

      {arr ? 
      <h1 id="profile-h1">{arr.length}</h1>
      :
      <h1 id="profile-h1">0</h1>
      }

      <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} >
        <div style={{width:'120px', height:'8px', marginTop:'20px', backgroundColor:'#232323' }} ></div>

      </div>


      <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} >
        <button id='logout' onClick={onLogOutClick}>Log Out</button>

      </div>
    </div>
  );
};


export default Profile;
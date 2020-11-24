import React, {useCallback, useEffect, useState}  from 'react';
import firebase from 'global/fbase';
import {useHistory} from 'react-router-dom';

//updateProfile({displayName 추가 만들기})


const Profile =  () => {
  const [arr, setArr] = useState([]);
  const history = useHistory();
  const user = firebase.auth().currentUser;
  const onLogOutClick = () => {
      firebase.auth().signOut();
      history.push("/");
  };
  //currentUser updateProfile({displayName : input(state로)}) 
  // 이름 없을 때에는 null {userName ? <프로필> : <empty>}없으면 
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
    getRoadInfoCurrentUser();
  }, [getRoadInfoCurrentUser])

  return (
    <>
      <h2>프로필</h2> 
      {arr ? arr.map((data) => <div key={data.id} style={{
          marginTop:"20px",
          marginBottom:"30px"
      }}>
          <h4>{data.roadName}</h4>
      </div> ):<h5>산책로 정보 불러오는 중..</h5>}
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};


export default Profile;
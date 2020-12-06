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

  //currentUser updateProfile({displayName : input(state로)}) 이름 없을 때에는 null {userName ? <프로필> : <empty>}
  /* Kakao로 로그인 하면 dependency로 선언한 user가 null이 떠버리니까 카카오로 로그인 했을 때 
  1. firestore에 카카오 유저 컬렉션 추가
  2. uid 필드 생성해서 유저 정보 저장
  3. 아래 getRoadInfoCurrentUser() 함수는 ,,,음.. 그래도 디펜던시 해결이 안되네ㅠㅠ  아니면 아예 이메일 로그인을 지울까 ㅋㅋㅋ 이건 팀원들이랑 얘기 해봐야겄다
  */

  
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
  }, [getRoadInfoCurrentUser, user])

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
import React  from 'react';
import firebase from 'global/fbase';
import {useHistory} from 'react-router-dom';
//updateProfile({displayName 추가 만들기})


const Profile =  () => {
    const history = useHistory();
    const onLogOutClick = () => {
        console.log(firebase.auth().currentUser);
        firebase.auth().signOut();
        history.push("/");
    };
    //currentUser updateProfile({displayName : input(state로)}) 
    // 이름 없을 때에는 null {userName ? <프로필> : <empty>}없으면 
    return (
      <>
        <h2>의 프로필</h2> 
        <button onClick={onLogOutClick}>Log Out</button>
      </>
    );
  };


  export default Profile;
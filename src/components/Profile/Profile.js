import React  from 'react';
import firebase from 'global/fbase';
import {useHistory} from 'react-router-dom';

const Profile =  () => {
    const history = useHistory();
    const onLogOutClick = () => {
        console.log(firebase.auth().currentUser);
        firebase.auth().signOut();
        history.push("/");
    };
    //currentUser name 넘겨서 받기
    return (
      <>
        <h2>의 프로필</h2>
        <button onClick={onLogOutClick}>Log Out</button>
      </>
    );
  };


  export default Profile;
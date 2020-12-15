import React from "react";
import AddRoadForm from 'components/organisms/AddRoadForm';
import useConfirm from 'hooks/useConfirm';
// import { useRecoilValue } from 'recoil';
import SetEntireStates from 'functions/SetEntireStates';
import firebase from 'global/fbase';
import {useHistory} from 'react-router-dom';
import * as uuid from 'uuid';

const AddRoad = () => {
  const history = useHistory();
  const a = SetEntireStates();
  const submitConfirm = async () => {
    // recoil value 다 가져와서 firestore에 한번에 저장, -> try catch
    try {
      if (a.road_name 
      && a.road_env 
      && a.entire_length 
      && a.address_name 
      && a.latitude 
      && a.longitude 
      && a.around_subway 
      && a.voice_induction 
      && a.side_walk_block 
      && a.braille_notice
      && a.safety_fence
      && a.pavement
      && a.stair_feature
      && a.warning
      && a.toilet
      && a.bench_and_rest
      && a.walking_people
      && a.feature
      && a.around_env_list) {
        await firebase.firestore().collection("WalkRoad").doc(uuid.v4()).set(a)
        window.alert("Document successfully written!");              
        history.push('/');
      } else { 
        window.alert("입력 정보가 충분하지 않습니다.");
      }
    }
    catch (documentError) {
      window.alert(documentError);
    }
  };
  const abort = () => console.log('abort'); 
  const confirmSubmit = useConfirm("You sure?", submitConfirm, abort);


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      justifyContent:'center',
      alignItems: 'center'
    }}>
      <AddRoadForm />
      <button onClick={confirmSubmit} style={{
        width:'200px',
        height:'40px',
        borderWidth:'3px',
        marginTop:'15px',
        fontSize: '15px',
        fontWeight: '500'
      }}> 정보 등록하기 </button>
    </div>
  );
};

export default AddRoad;
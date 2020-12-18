import React from "react";
import WarningInput from 'components/molecules/ForAddRoad/10WarnFeature/WarningInput';
import FeaturesInput from 'components/molecules/ForAddRoad/10WarnFeature/FeaturesInput';
import useConfirm from 'hooks/useConfirm';
import SetEntireStates from 'functions/SetEntireStates';
import firebase from 'global/fbase';
import {useHistory} from 'react-router-dom';
import * as uuid from 'uuid';

const JwarnFeat = () => {
  const history = useHistory();
  const a = SetEntireStates();
  const submitConfirm = async () => {
    // recoil value 다 가져와서 firestore에 한번에 저장, -> try catch

    try {
      if (a.road_name 
      && a.road_env 
      && a.entire_length 
      && a.address_name 
      && a.around_subway 
      && a.voice_induction  
      && a.braille_notice
      && a.safety_fence
      && a.pavement
      && a.stair_feature
      && a.warning
      && a.toilet
      && a.bench_and_rest
      && a.walking_people
      && a.feature) {
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
          display:'flex',
          height:'100%',
          flexDirection:'column',
          width:'100%',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <h4>걸을 때 주의사항</h4>
          <WarningInput placeholder="걸을 때 주의사항을 적어주세요" />
          
          <h4>산책로 특징</h4>
          <FeaturesInput placeholder="산책로의 특징을 적어주세요" />
          <button onClick={confirmSubmit} style={{
            width:'200px',
            height:'40px',
            borderWidth:'3px',
            marginTop:'15px',
            fontSize: '15px',
            fontWeight: '500'
          }}> 정보 등록하기 </button>
        </div>
    )
};

export default JwarnFeat;
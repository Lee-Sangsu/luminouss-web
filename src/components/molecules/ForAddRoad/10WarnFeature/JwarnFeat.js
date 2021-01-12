import React from "react";
import WarningInput from 'components/molecules/ForAddRoad/10WarnFeature/WarningInput';
import FeaturesInput from 'components/molecules/ForAddRoad/10WarnFeature/FeaturesInput';
import useConfirm from 'hooks/useConfirm';
import SetEntireStates from 'functions/SetEntireStates';
import firebase from 'global/fbase';
import {useHistory} from 'react-router-dom';
import * as uuid from 'uuid';
import swal from 'sweetalert';

const JwarnFeat = () => {
  const history = useHistory();
  const a = SetEntireStates();
  const jsonA = JSON.parse(JSON.stringify(a));
  
  const submitConfirm = async () => {
    // recoil value 다 가져와서 firestore에 한번에 저장, -> try catch

    
    try {
      if (jsonA.road_name  
        && jsonA.road_env  
        && jsonA.entire_length  
        && jsonA.address_name  
        && jsonA.around_subway  
        && jsonA.voice_induction   
        && jsonA.braille_notice 
        && jsonA.safety_fence 
        && jsonA.pavement 
        && jsonA.stair_feature ) {
        await firebase.firestore().collection("WalkRoad").doc(uuid.v4()).set(a)
        swal("성공적으로 등록되었습니다!");              
        history.push('/');
      } else { 
        swal("입력 정보가 충분하지 않습니다.");
      }
    }
    catch (documentError) {
      swal(documentError);
    }
  };
  const abort = () => console.log('abort'); 
  const confirmSubmit = useConfirm("등록 하시겠습니까?", submitConfirm, abort);
    return (
        <div id="warning-container">
          <h3 style={{marginBottom:'30px'}} id="subtitle">특징 및 주의사항을 기재해주세요.</h3>
          
          <h4 id="subsubtitle">산책로 특징</h4>
          <FeaturesInput />

          <h4 id="subsubtitle">걸을 때 주의사항</h4>
          <WarningInput  />
          <button onClick={confirmSubmit} id="to-next-page"> 정보 등록하기 </button>
        </div>
    )
};

export default JwarnFeat;
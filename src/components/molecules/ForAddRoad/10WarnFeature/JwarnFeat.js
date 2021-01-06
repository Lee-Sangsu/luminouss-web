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
        swal("Document successfully written!");              
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
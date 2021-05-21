import React from 'react';
import WriterNameState from 'recoilStates/Addroad/WriterNameState';
import {useRecoilState} from 'recoil';
import useConfirm from 'hooks/useConfirm';
import SetEntireStates from 'functions/SetEntireStates';
import firebase from 'global/fbase';
import {useHistory} from 'react-router-dom';
import * as uuid from 'uuid';
import swal from 'sweetalert';

export const AskName = () => {
    const history = useHistory();
  
    const a = SetEntireStates();
    const submitConfirm = async () => {
        const jsonA = JSON.parse(JSON.stringify(a));
        try {
        if (jsonA.road_name  
            && jsonA.road_env  
            && jsonA.entire_length  
            && jsonA.address_name) {
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
    const [writerName, setWriterName] = useRecoilState(WriterNameState);
    
    const onChange = (event) => {
        const {
            target: {
                name, value
            }
        } = event;
        if (name === "name") {
          setWriterName(value);
        }
    }; 

    return (
        <div id="writer-name-container">
            <h3 id="subtitle">기프티콘 제공을 위해서 입력하시는 분의 성함을 입력해주세요.</h3>
            <input id="writer-input" name="name" onChange={onChange} value={writerName} placeholder="내 답변" />

            <button onClick={confirmSubmit} id="to-next-page"> 정보 등록하기 </button>
        </div>
    )
};
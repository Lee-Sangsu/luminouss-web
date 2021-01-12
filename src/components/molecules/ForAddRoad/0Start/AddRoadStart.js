import React from 'react';
import Subject from 'components/molecules/Subject';
import firebase from 'global/fbase';

const AddRoadStart = ({handlePageChange}) => {
    const goToDownload = async () => {
        try {
            const storage = firebase.storage();
            const storageRef = storage.refFromURL('gs://luminouss-web.appspot.com/산책로 답사 가이드북.pdf');
            const url = await storageRef.getDownloadURL();
            
            const a = document.createElement('a');
            a.href= url;
            a.setAttribute('download', true); 
            a.click();
        } catch(e){console.log(e);}
    };
    return(
        <div id='entire-div'>
            <Subject id="sign-in-h2" circleColor="rgba(255, 193, 7, 1)" text="산책로 정보 추가하기" />
            <h3 id='second-start-msg'>시각장애인의 더 나은 산책 경험을 위해, 정보를 직접 입력해보세요!</h3>
            <button id="to-next-page" onClick={() => handlePageChange(1)}>시작하기</button>
            <h3 id="third-start-msg" onClick={goToDownload}>작성 가이드가 궁금하시다면 클릭해주세요</h3>
        </div>
    )
};

export default AddRoadStart;
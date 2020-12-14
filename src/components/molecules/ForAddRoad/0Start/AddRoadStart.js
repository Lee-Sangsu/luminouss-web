import React from 'react';
import 'components/styles/Addroad/AddRoadStart.css';

const AddRoadStart = ({handlePageChange}) => {
    return(
        <div id='entire-div'>
            <h1>산책로 정보 추가하기</h1>
            <h4>설명 한 문장</h4>
            <button onClick={() => handlePageChange(1)}>시작하기</button>
            <h6>혹시 아직 안 읽으셨거나 처음 등록하신다면?</h6>
            <h3>가이드 보기</h3>
        </div>
    )
};

export default AddRoadStart;
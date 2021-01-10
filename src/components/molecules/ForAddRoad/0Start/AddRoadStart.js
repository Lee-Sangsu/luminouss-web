import React from 'react';
import Subject from 'components/molecules/Subject';

const AddRoadStart = ({handlePageChange}) => {
    return(
        <div id='entire-div'>
            <Subject id="sign-in-h2" circleColor="rgba(255, 193, 7, 1)" text="산책로 정보 추가하기" />
            <h3 id='second-start-msg'>시각장애인의 더 나은 산책 경험을 위해, 정보를 직접 입력해보세요!</h3>
            <button id="to-next-page" onClick={() => handlePageChange(1)}>시작하기</button>
            <h3 id="third-start-msg">작성 가이드가 궁금하시다면 클릭해주세요</h3>
        </div>
    )
};

export default AddRoadStart;
import React from "react";
import {
  useRecoilValue,
} from 'recoil';
import EnvState from 'recoilStates/Addroad/EnvState';
import FenceQuestions from './FenceQuestions';

const Csupport = ({handlePageChange}) => {
    const env = useRecoilValue(EnvState);
    return (
        <>
        {env ? <div id="env-exist-container">
          <FenceQuestions />
          <div id="next-page-container">
            <button id="to-next-page" onClick={() => handlePageChange(4)}>확인</button>
          </div>
        </div>
        : 
        <div id="env-not-exist-container" >
        <h1>환경을 먼저 선택해주세요</h1>
        {/* <button  onClick={() => handlePageChange(2)}>환경 선택하기</button> */}
        </div>}
         
        </>
    )
};

export default Csupport;
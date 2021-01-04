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
        {env ? <div style={{
          display:'flex',
          // marginLeft:'30%',
          width:'100%',
          height:'100%',
          justifyContent:'center',
          // alignItems:'center',
          flexDirection:'column'
        }}>
          <FenceQuestions />
          <div style = {{
            width: '100%', justifyContent:'center', display: 'flex'
          }}>
            <button id="to-next-page" onClick={() => handlePageChange(4)}>확인</button>
          </div>
        </div>
        : 
        <div style={{
          display:'flex',
          width:'100%',
          height:'100%',
          justifyContent:'center',
          alignItems:'center',
          flexDirection:'column'
        }}>
        <h1>환경을 먼저 선택해주세요</h1>
        {/* <button  onClick={() => handlePageChange(2)}>환경 선택하기</button> */}
        </div>}
         
        </>
    )
};

export default Csupport;
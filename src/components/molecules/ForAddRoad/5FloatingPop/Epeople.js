import React from "react";
import PeopleInput from 'components/molecules/ForAddRoad/5FloatingPop/PeopleInput';

const Epeople = () => {
    return (
        <div style={{
          display:'flex',
          height:'100%',
          flexDirection:'column',
          width:'100%',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <h4>다녀오신 시간대에 유동 인구는 얼마나 있었나요?</h4>
          <PeopleInput placeholder="유동인구 많은 정도 적어주세요" />
        </div>
    )
};
export default Epeople;
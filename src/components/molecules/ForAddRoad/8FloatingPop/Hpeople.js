import React from "react";
import PeopleInput from 'components/molecules/ForAddRoad/8FloatingPop/PeopleInput';
import Dropdown from 'react-dropdown';

const Hpeople = () => {
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
          <h5>가장 많았던 사람들 유형:</h5>
          <h5>봤던 사람의 수:</h5>
        </div>
    )
};
export default Hpeople;
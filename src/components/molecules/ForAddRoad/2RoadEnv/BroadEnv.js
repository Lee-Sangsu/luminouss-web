import SelectEnv from 'components/molecules/ForAddRoad/2RoadEnv/SelectEnv';
import SelectPavement from 'components/molecules/ForAddRoad/2RoadEnv/SelectPavement';
import EntireLength from 'components/molecules/ForAddRoad/2RoadEnv/EntireLength';
import React from 'react';

const BroadEnv = () => {
    // 산책로 전체 길이 부분 추가해야 함.
    return (
        <div style={{
          display:'flex',
          height:'100%',
          flexDirection:'column',
          width:'100%',
          justifyContent:'flex-start',
          alignItems:'center'
        }}>
          <h2>산책로의 환경은 어땠나요?</h2>
          <EntireLength />
          <div style={{
            display:'flex',
            flexDirection:'row'
          }}>
            <SelectEnv />
            <SelectPavement />
          </div>
        </div>
    )
};

export default BroadEnv;
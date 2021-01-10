import SelectEnv from 'components/molecules/ForAddRoad/2RoadEnv/SelectEnv';
import EntireLength from 'components/molecules/ForAddRoad/2RoadEnv/EntireLength';
import React from 'react';

const BroadEnv = ({handlePageChange}) => {
    // 산책로 전체 길이 부분 추가해야 함.
    return (
        <div id="broad-env">
          <h3 id="subtitle">산책로의 환경은 어땠나요?</h3>

          <SelectEnv />
          <EntireLength />
          <button id="to-next-page" onClick={() => handlePageChange(3)}>확인</button>
        </div>
    )
};

export default BroadEnv;
import React from 'react';
import StairsState from 'recoilStates/Addroad/StairsState';
import { useRecoilState } from 'recoil';
import SelectPavement from 'components/molecules/ForAddRoad/2RoadEnv/SelectPavement';


const Fstairs = ({handlePageChange}) => {
    const [stairs, setStairs] = useRecoilState(StairsState);

    const onChange = (event) => {
        event.preventDefault();
        setStairs(event.target.value);
    }
    return (
        <div id='stair-continer'>
            <h3 id="subtitle">걷기 편한 정도에 관한 질문입니다.</h3>
            <SelectPavement />
            <h3 id="subtitle">계단의 특성에 대하여 답해주세요</h3>
            <textarea id="stair-input" type="text" onChange={onChange} value={stairs} placeholder="높이, 폭, 재질, 경사 등에 대한 특성을 기재해주세요." required /> 
            <button id="to-next-page" onClick={() => handlePageChange(8)}>확인</button>
        </div>
    )
};

export default Fstairs;
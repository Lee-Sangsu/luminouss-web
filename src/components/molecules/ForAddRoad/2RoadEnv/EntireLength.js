import React from 'react';
import RoadLengthState from 'recoilStates/Addroad/RoadLengthState';
import { useRecoilState } from 'recoil';


const EntireLength = () => {
    const [length, setLength] = useRecoilState(RoadLengthState);

    const onChange = (event) => {
        event.preventDefault();
        setLength(event.target.value);
    }
    return (
        <>
            <h3 id="subsubtitle">산책로의 전체 길이</h3>
            <input id="number-input" type="number" name="road-length" onChange={onChange} value={length} placeholder="산책로의 전체 길이를 입력해주세요" required /> km
        </>
    )
};

export default EntireLength;
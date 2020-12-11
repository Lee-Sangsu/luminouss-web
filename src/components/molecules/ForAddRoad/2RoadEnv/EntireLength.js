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
            <h3>산책로 전체 길이</h3>
            <input type="number" name="road-length" onChange={onChange} value={length} required /> km
        </>
    )
};

export default EntireLength;